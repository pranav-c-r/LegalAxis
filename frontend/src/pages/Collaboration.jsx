import React, { useState, useEffect } from 'react';
import { ActivityFeed, ApprovalWorkflow, CommentThread, SharingControls } from '../components/collaboration';

const Collaboration = () => {
  const [geminiResponse, setGeminiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentAnalysis, setDocumentAnalysis] = useState('');
  
  // Sample data for demonstration
  const sampleDocument = {
    id: 'doc-123',
    name: 'Legal Contract - ABC Corp',
    type: 'contract',
    status: 'in_review',
    content: 'This is a sample contract document content that would be analyzed by Gemini AI for suggestions and improvements.'
  };

  const sampleComments = [
    {
      id: 'comment-1',
      author: { name: 'Jane Smith', initials: 'JS', avatar: '/api/placeholder/32/32' },
      text: 'I think we should revise section 3.2 to clarify the payment terms.',
      timestamp: '2 hours ago',
      replies: [
        {
          id: 'reply-1',
          author: { name: 'Robert Johnson', initials: 'RJ', avatar: '/api/placeholder/32/32' },
          text: 'Agreed. I will draft alternative language for that section.',
          timestamp: '1 hour ago'
        }
      ]
    },
    {
      id: 'comment-2',
      author: { name: 'Michael Brown', initials: 'MB', avatar: '/api/placeholder/32/32' },
      text: 'The liability clause in section 5 needs to be more specific about force majeure events.',
      timestamp: '3 hours ago',
      replies: []
    }
  ];

  const sampleWorkflowSteps = [
    {
      id: 'step-1',
      title: 'Initial Draft Review',
      status: 'completed',
      approvers: [
        { id: 'user-1', name: 'Jane Smith', initials: 'JS', avatar: '/api/placeholder/32/32', status: 'approved' },
        { id: 'user-2', name: 'Robert Johnson', initials: 'RJ', avatar: '/api/placeholder/32/32', status: 'approved' }
      ]
    },
    {
      id: 'step-2',
      title: 'Legal Department Review',
      status: 'in_progress',
      approvers: [
        { id: 'user-3', name: 'Sarah Williams', initials: 'SW', avatar: '/api/placeholder/32/32', status: 'pending' },
        { id: 'user-4', name: 'David Miller', initials: 'DM', avatar: '/api/placeholder/32/32', status: 'approved' }
      ]
    },
    {
      id: 'step-3',
      title: 'Final Approval',
      status: 'pending',
      approvers: [
        { id: 'user-5', name: 'Jennifer Davis', initials: 'JD', avatar: '/api/placeholder/32/32', status: 'pending' }
      ]
    }
  ];

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

      const prompt = `Analyze this legal document and provide suggestions for improvement: ${sampleDocument.content}. 
      Focus on clarity, potential risks, and standard legal practices.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
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
    // Analyze document on component mount
    analyzeDocumentWithGemini();
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Document Header Card */}
            <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-6 gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-white break-words">
                  {sampleDocument.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#f3cf1a]/20 text-[#f3cf1a] border border-[#f3cf1a]/30 whitespace-nowrap">
                    {sampleDocument.type}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 whitespace-nowrap">
                    {sampleDocument.status}
                  </span>
                </div>
              </div>
              
              {/* AI Analysis Section */}
              <div className="mb-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#343535]">
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
                <CommentThread comments={sampleComments} documentId={sampleDocument.id} />
                
                {/* New Comment Input */}
                <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#343535]">
                  <h4 className="text-md font-medium text-white mb-3">Add a comment</h4>
                  <textarea 
                    className="w-full bg-[#252525] text-white p-3 rounded-md border border-[#444] focus:border-[#f3cf1a] focus:ring-1 focus:ring-[#f3cf1a] resize-none"
                    rows="3"
                    placeholder="Type your comment here..."
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
                    <button className="bg-[#f3cf1a] text-black px-4 py-2 rounded-md font-medium hover:bg-[#e6bf18] transition-colors">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Activity Feed */}
            <ActivityFeed activities={sampleActivities} />
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            {/* Sharing Controls */}
            <SharingControls 
              documentId={sampleDocument.id} 
              currentPermissions={samplePermissions} 
            />
            
            {/* Approval Workflow */}
            <ApprovalWorkflow 
              documentId={sampleDocument.id} 
              workflowSteps={sampleWorkflowSteps} 
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