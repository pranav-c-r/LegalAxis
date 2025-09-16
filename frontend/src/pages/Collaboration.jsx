import React, { useState, useEffect } from 'react';
import { ActivityFeed, ApprovalWorkflow, CommentThread, SharingControls } from '../components/collaboration';
import { db } from '../firebase/firebase';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useUserAuth } from '../context/UserAuthContext';
// File parsing libs for document ingestion
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import mammoth from 'mammoth/mammoth.browser';

const Collaboration = () => {
  const { user } = useUserAuth();
  const [geminiResponse, setGeminiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentAnalysis, setDocumentAnalysis] = useState('');
  const [documentMeta, setDocumentMeta] = useState({ name: 'Untitled Document', type: 'contract', status: 'in_review' });
  const [comments, setComments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [workflowSteps, setWorkflowSteps] = useState([]);
  const [inlineComment, setInlineComment] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [fileError, setFileError] = useState('');
  const [uploading, setUploading] = useState(false);
  
  // Assume a current document id (in real app, route param or selection)
  const documentId = 'doc-123';

  // Configure pdf.js worker (CDN fallback)
  try {
    // @ts-ignore
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.min.js';
  } catch {}

  // Firestore listeners
  useEffect(() => {
    // Document meta
    const docRef = doc(db, 'documents', documentId);
    const unsubMeta = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setDocumentMeta({ name: data.name, type: data.type, status: data.status });
      } else {
        // initialize minimal doc
        setDoc(docRef, { name: 'Untitled Document', type: 'contract', status: 'in_review', createdAt: serverTimestamp() }, { merge: true });
      }
    });

    // Comments (with simple shape; replies as subcollection)
    const commentsRef = collection(db, 'documents', documentId, 'comments');
    const unsubComments = onSnapshot(query(commentsRef, orderBy('createdAt', 'desc')), async (snap) => {
      const list = [];
      for (const d of snap.docs) {
        const c = d.data();
        // Fetch replies subcollection
        const repliesRef = collection(db, 'documents', documentId, 'comments', d.id, 'replies');
        // For simplicity, no pagination
        const repliesSnap = await new Promise((resolve) => {
          const unsub = onSnapshot(query(repliesRef, orderBy('createdAt', 'asc')), (rs) => {
            unsub();
            resolve(rs);
          });
        });
        const replies = repliesSnap.docs.map(r => ({ id: r.id, ...r.data() }));
        list.push({ id: d.id, ...c, replies });
      }
      setComments(list.map(c => ({
        id: c.id,
        author: {
          name: c.authorName || 'Unknown',
          initials: (c.authorName || 'U').split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase(),
          avatar: ''
        },
        text: c.text,
        timestamp: c.createdAt?.toDate?.().toLocaleString?.() || '',
        replies: c.replies.map(r => ({
          id: r.id,
          author: { name: r.authorName || 'Unknown', initials: (r.authorName || 'U').split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase(), avatar: '' },
          text: r.text,
          timestamp: r.createdAt?.toDate?.().toLocaleString?.() || ''
        }))
      })));
    });

    // Activity
    const activityRef = collection(db, 'documents', documentId, 'activity');
    const unsubActivity = onSnapshot(query(activityRef, orderBy('createdAt', 'desc')), (snap) => {
      setActivities(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // Permissions
    const permsRef = collection(db, 'documents', documentId, 'permissions');
    const unsubPerms = onSnapshot(permsRef, (snap) => {
      setPermissions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // Workflow
    const wfRef = collection(db, 'documents', documentId, 'workflow');
    const unsubWf = onSnapshot(query(wfRef, orderBy('order', 'asc')), (snap) => {
      setWorkflowSteps(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubMeta();
      unsubComments();
      unsubActivity();
      unsubPerms();
      unsubWf();
    };
  }, []);

  // Create operations
  const postComment = async (text) => {
    if (!text?.trim()) return;
    const commentsRef = collection(db, 'documents', documentId, 'comments');
    await addDoc(commentsRef, {
      text,
      authorUid: user?.uid || null,
      authorName: user?.displayName || user?.email || 'Anonymous',
      createdAt: serverTimestamp(),
    });
    await addDoc(collection(db, 'documents', documentId, 'activity'), {
      type: 'comment',
      user: user?.displayName || user?.email || 'Anonymous',
      action: 'added a comment',
      details: text,
      createdAt: serverTimestamp(),
      documentName: documentMeta.name,
    });
  };

  const postReply = async (commentId, text) => {
    if (!text?.trim()) return;
    const repliesRef = collection(db, 'documents', documentId, 'comments', commentId, 'replies');
    await addDoc(repliesRef, {
      text,
      authorUid: user?.uid || null,
      authorName: user?.displayName || user?.email || 'Anonymous',
      createdAt: serverTimestamp(),
    });
  };

  const addPermission = async (email, permission) => {
    if (!email) return;
    await addDoc(collection(db, 'documents', documentId, 'permissions'), {
      email,
      name: email,
      initials: email.slice(0,2).toUpperCase(),
      permission,
    });
    await addDoc(collection(db, 'documents', documentId, 'activity'), {
      type: 'share',
      user: user?.displayName || user?.email || 'Anonymous',
      action: `shared the document with ${email}`,
      createdAt: serverTimestamp(),
      documentName: documentMeta.name,
    });
  };

  const changePermission = async (permissionId, newPermission) => {
    const permDoc = doc(db, 'documents', documentId, 'permissions', permissionId);
    await updateDoc(permDoc, { permission: newPermission });
  };

  const removePermission = async (permissionId) => {
    const permDoc = doc(db, 'documents', documentId, 'permissions', permissionId);
    await deleteDoc(permDoc);
  };

  // File handling and AI integration
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    setExtractedText('');
    setFileError('');
    if (!file) return;

    const name = file.name.toLowerCase();
    try {
      setUploading(true);
      if (name.endsWith('.txt') || name.endsWith('.md')) {
        const text = await file.text();
        setExtractedText(text);
      } else if (name.endsWith('.pdf')) {
        const buf = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: buf });
        const pdf = await loadingTask.promise;
        let fullText = '';
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();
          const strings = content.items.map((it) => it.str).filter(Boolean);
          fullText += strings.join(' ') + '\n';
        }
        setExtractedText(fullText.trim());
      } else if (name.endsWith('.docx')) {
        const buf = await file.arrayBuffer();
        const { value } = await mammoth.extractRawText({ arrayBuffer: buf });
        setExtractedText(value || '');
      } else {
        setFileError('Unsupported file type. Please upload .txt, .md, .pdf, or .docx');
      }

      // Update document meta name and log upload activity
      if (file) {
        const docRef = doc(db, 'documents', documentId);
        await setDoc(
          docRef,
          { name: file.name, updatedAt: serverTimestamp() },
          { merge: true }
        );
        await addDoc(collection(db, 'documents', documentId, 'activity'), {
          type: 'upload',
          user: user?.displayName || user?.email || 'Anonymous',
          action: 'uploaded a new version',
          createdAt: serverTimestamp(),
          documentName: file.name,
        });
      }
    } catch (err) {
      console.error('File parsing error:', err);
      setFileError('Failed to read the document. Please try a different file or format.');
    } finally {
      setUploading(false);
    }
  };

  const sampleActivities = [
    {
      id: 'activity-1',
      type: 'edit',
      user: 'Jane Smith',
      action: 'edited the document',
      timestamp: '2 hours ago',
      documentName: 'Legal Contract - ABC Corp'
    },
    {
      id: 'activity-2',
      type: 'comment',
      user: 'Michael Brown',
      action: 'added a comment',
      details: 'The liability clause in section 5 needs to be more specific about force majeure events.',
      timestamp: '3 hours ago',
      documentName: 'Legal Contract - ABC Corp'
    },
    {
      id: 'activity-3',
      type: 'approval',
      user: 'David Miller',
      action: 'approved the document',
      timestamp: '4 hours ago',
      documentName: 'Legal Contract - ABC Corp'
    },
    {
      id: 'activity-4',
      type: 'share',
      user: 'Robert Johnson',
      action: 'shared the document with Sarah Williams',
      timestamp: '1 day ago',
      documentName: 'Legal Contract - ABC Corp'
    },
    {
      id: 'activity-5',
      type: 'upload',
      user: 'Jane Smith',
      action: 'uploaded a new version',
      timestamp: '2 days ago',
      documentName: 'Legal Contract - ABC Corp'
    }
  ];

  const samplePermissions = [
    {
      id: 'perm-1',
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      initials: 'SW',
      avatar: '/api/placeholder/32/32',
      permission: 'edit'
    },
    {
      id: 'perm-2',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      initials: 'MB',
      avatar: '/api/placeholder/32/32',
      permission: 'comment'
    },
    {
      id: 'perm-3',
      name: 'David Miller',
      email: 'david.miller@example.com',
      initials: 'DM',
      avatar: '/api/placeholder/32/32',
      permission: 'view'
    }
  ];

  // Function to analyze document with Gemini API
  const analyzeDocumentWithGemini = async () => {
    setIsLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key not found');
      }

  const body = extractedText?.trim() || documentMeta.name;
  const prompt = `Analyze this legal document and provide suggestions for improvement. 
  Document: ${body}
  Focus on clarity, potential risks, enforceability, and standard legal practices. Provide bullet points.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: prompt }]
          }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        setGeminiResponse(data.candidates[0].content.parts[0].text);
        setDocumentAnalysis(data.candidates[0].content.parts[0].text);
      } else {
        setGeminiResponse('No analysis available at this time.');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setGeminiResponse('Error analyzing document. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle DocuSign integration
  const initiateDocuSignWorkflow = () => {
    // This would typically redirect to DocuSign or open a modal
    alert('In a real implementation, this would redirect to DocuSign for e-signature workflows.');
  };

  useEffect(() => {
    // Optionally analyze on mount
    // analyzeDocumentWithGemini();
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f3cf1a]/10 rounded-full blur-xl"></div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white relative">
                Document Collaboration
                <span className="block w-16 h-1 bg-[#f3cf1a] mt-2 rounded-full"></span>
              </h1>
              <p className="text-[#e0e0e0] mt-3 text-base">Collaborate on legal documents with your team in real-time.</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] border border-[#343535] rounded-lg text-sm cursor-pointer hover:bg-[#2a2a2a]">
                <svg className="w-4 h-4 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <span>{uploading ? 'Reading...' : 'Upload document'}</span>
                <input type="file" accept=".txt,.md,.pdf,.docx" className="hidden" onChange={handleFileChange} />
              </label>
              <button 
              onClick={initiateDocuSignWorkflow}
              className="bg-[#f3cf1a] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#e6bf18] transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
              </svg>
              Send for Signature
            </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Document Header Card */}
            <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-6 gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-white break-words">
                  {documentMeta.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#f3cf1a]/20 text-[#f3cf1a] border border-[#f3cf1a]/30 whitespace-nowrap">
                    {documentMeta.type}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 whitespace-nowrap">
                    {documentMeta.status}
                  </span>
                </div>
              </div>
              
              {/* AI Analysis Section */}
              <div className="mb-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#343535]">
                {selectedFile && (
                  <div className="mb-3 text-xs text-[#a0a0a0]">
                    Selected: <span className="text-white font-medium">{selectedFile.name}</span>
                    {fileError && <span className="ml-2 text-red-400">{fileError}</span>}
                  </div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    AI Analysis
                  </h3>
                  <button 
                    onClick={analyzeDocumentWithGemini}
                    disabled={isLoading}
                    className="text-xs bg-[#343535] hover:bg-[#444] px-2 py-1 rounded-md transition-colors flex items-center gap-1"
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        Re-analyze
                      </>
                    )}
                  </button>
                </div>
                <div className="text-sm text-[#e0e0e0] bg-[#252525] p-3 rounded-md max-h-40 overflow-y-auto">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <svg className="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing document with Gemini AI...
                    </div>
                  ) : (
                    documentAnalysis || geminiResponse || 'Click "Re-analyze" to get AI suggestions for this document.'
                  )}
                </div>
              </div>
              
              <div className="border-t border-[#343535] pt-5 sm:pt-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-5 sm:mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                  </svg>
                  Comments & Annotations
                </h3>
                <CommentThread 
                  comments={comments} 
                  documentId={documentId}
                  onPostComment={postComment}
                  onPostReply={postReply}
                />
                
                {/* New Comment Input */}
                <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#343535]">
                  <h4 className="text-md font-medium text-white mb-3">Add a comment</h4>
                  <textarea 
                    className="w-full bg-[#252525] text-white p-3 rounded-md border border-[#444] focus:border-[#f3cf1a] focus:ring-1 focus:ring-[#f3cf1a] resize-none"
                    rows="3"
                    placeholder={user ? "Type your comment here..." : "Sign in to comment"}
                    value={inlineComment}
                    onChange={(e) => setInlineComment(e.target.value)}
                    disabled={!user}
                  ></textarea>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-2">
                      <button className="p-2 rounded-md bg-[#343535] hover:bg-[#444] transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                        </svg>
                      </button>
                      <button className="p-2 rounded-md bg-[#343535] hover:bg-[#444] transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                        </svg>
                      </button>
                    </div>
                    <button 
                      className="bg-[#f3cf1a] text-black px-4 py-2 rounded-md font-medium hover:bg-[#e6bf18] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!user || !inlineComment.trim()}
                      onClick={async () => { await postComment(inlineComment); setInlineComment(''); }}
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Activity Feed */}
            <ActivityFeed activities={activities} />
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            {/* Sharing Controls */}
            <SharingControls 
              documentId={documentId} 
              currentPermissions={permissions}
              onAddPermission={addPermission}
              onChangePermission={changePermission}
              onRemovePermission={removePermission}
            />
            
            {/* Approval Workflow */}
            <ApprovalWorkflow 
              documentId={documentId} 
              workflowSteps={workflowSteps}
            />
            
            {/* Team Workspace Section */}
            <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                Team Workspace
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f3cf1a]/20 flex items-center justify-center text-[#f3cf1a] font-medium">
                      JS
                    </div>
                    <div>
                      <p className="font-medium text-white">Jane Smith</p>
                      <p className="text-xs text-[#a0a0a0]">Legal Department</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-md">Online</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 font-medium">
                      RJ
                    </div>
                    <div>
                      <p className="font-medium text-white">Robert Johnson</p>
                      <p className="text-xs text-[#a0a0a0]">Compliance</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-md">Online</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-medium">
                      MB
                    </div>
                    <div>
                      <p className="font-medium text-white">Michael Brown</p>
                      <p className="text-xs text-[#a0a0a0]">Legal Department</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs bg-gray-500/20 text-gray-300 rounded-md">Away</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-[#343535] hover:bg-[#444] text-white py-2 rounded-md transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Team Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;