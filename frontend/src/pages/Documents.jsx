import { useState, useRef, useEffect } from 'react';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Service Agreement - TechCorp',
      description: 'IT services agreement with TechCorp Inc. covering software development and maintenance.',
      type: 'Contract',
      status: 'Active',
      tags: ['IT', 'Services', 'High Value'],
      lastUpdated: 'Updated 2 days ago',
      version: 'v3.2',
      fileType: 'PDF',
      size: '2.4 MB',
      ocrProcessed: true
    },
    {
      id: 2,
      name: 'Privacy Policy v2.1',
      description: 'Updated privacy policy reflecting latest data protection regulations and compliance requirements.',
      type: 'Policy',
      status: 'Under Review',
      tags: ['Compliance', 'GDPR', 'Privacy'],
      lastUpdated: 'Updated 1 week ago',
      version: 'v2.1',
      fileType: 'DOCX',
      size: '1.1 MB',
      ocrProcessed: false
    },
    {
      id: 3,
      name: 'Vendor Contract - SupplyChain Inc',
      description: 'Supply agreement for raw materials and components with quarterly delivery schedule.',
      type: 'Contract',
      status: 'Active',
      tags: ['Supply Chain', 'Procurement'],
      lastUpdated: 'Updated 2 weeks ago',
      version: 'v1.0',
      fileType: 'PDF',
      size: '3.7 MB',
      ocrProcessed: true
    },
    {
      id: 4,
      name: 'Office Lease Agreement',
      description: 'Commercial property lease for headquarters office space with renewal options.',
      type: 'Agreement',
      status: 'Expiring Soon',
      tags: ['Real Estate', 'Facilities'],
      lastUpdated: 'Updated 1 month ago',
      version: 'v4.3',
      fileType: 'PDF',
      size: '5.2 MB',
      ocrProcessed: true
    },
    {
      id: 5,
      name: 'Employee Handbook 2025',
      description: 'Company policies, procedures, and guidelines for all employees.',
      type: 'Policy',
      status: 'Draft',
      tags: ['HR', 'Internal'],
      lastUpdated: 'Updated 3 days ago',
      version: 'v0.9',
      fileType: 'DOCX',
      size: '4.8 MB',
      ocrProcessed: false
    },
    {
      id: 6,
      name: 'Patent Application - Smart Contract System',
      description: 'Patent filing for proprietary smart contract validation and execution system.',
      type: 'Legal Brief',
      status: 'Active',
      tags: ['IP', 'Patents', 'Blockchain'],
      lastUpdated: 'Updated 2 months ago',
      version: 'v1.5',
      fileType: 'PDF',
      size: '8.1 MB',
      ocrProcessed: true
    },
  ]);
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [batchProcessing, setBatchProcessing] = useState(false);
  const [ocrResults, setOcrResults] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [categorizationResults, setCategorizationResults] = useState({});
  const fileInputRef = useRef(null);
  
  const documentTypes = ['All', 'Contract', 'Agreement', 'Policy', 'Legal Brief', 'NDA', 'Amendment'];
  const statusOptions = ['All', 'Active', 'Draft', 'Expired', 'Under Review', 'Expiring Soon', 'Archived'];
  const fileTypes = ['PDF', 'DOC', 'DOCX', 'TXT'];

  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'All' || doc.type === filterType;
    const matchesStatus = filterStatus === 'All' || doc.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Handle file selection
  const handleFileSelect = (files) => {
    const validFiles = Array.from(files).filter(file => {
      const extension = file.name.split('.').pop().toUpperCase();
      return fileTypes.includes(extension);
    });
    
    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      setShowUploadModal(true);
    } else {
      alert('Please select valid files (PDF, DOC, DOCX, TXT)');
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  // Process OCR using Gemini API
  const processOCR = async (file) => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error('API key not found');
      
      // For demonstration - in a real app, you would send the file to your backend
      // which would then call the Gemini API with the file content
      const prompt = `Extract text from this document titled "${file.name}". 
      Provide a summary of its contents, identify key clauses, and suggest appropriate tags. 
      Format the response as JSON with: summary, keyClauses[], suggestedTags[], and documentType.`;
      
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });
      
      const data = await res.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        console.error('Error parsing OCR response:', e);
      }
      
      return {
        summary: 'Text extracted successfully',
        keyClauses: ['General content'],
        suggestedTags: ['Document'],
        documentType: 'Unknown'
      };
    } catch (error) {
      console.error('OCR processing error:', error);
      return {
        summary: 'Error processing document',
        keyClauses: [],
        suggestedTags: [],
        documentType: 'Unknown'
      };
    }
  };

  // Upload and process files
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const progress = ((i + 1) / selectedFiles.length) * 100;
      setUploadProgress(progress);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Process OCR
      const ocrData = await processOCR(file);
      
      // Add new document
      const newDoc = {
        id: documents.length + i + 1,
        name: file.name,
        description: ocrData.summary || 'No description available',
        type: ocrData.documentType || 'Document',
        status: 'Under Review',
        tags: ocrData.suggestedTags || ['New'],
        lastUpdated: 'Just now',
        version: 'v1.0',
        fileType: file.name.split('.').pop().toUpperCase(),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        ocrProcessed: true
      };
      
      setDocuments(prev => [newDoc, ...prev]);
      setOcrResults(prev => ({ ...prev, [file.name]: ocrData }));
    }
    
    setIsUploading(false);
    setUploadProgress(100);
    setSelectedFiles([]);
    setShowUploadModal(false);
    
    // Reset progress after a delay
    setTimeout(() => setUploadProgress(0), 2000);
  };

  // Process batch analysis
  const processBatchAnalysis = async () => {
    setBatchProcessing(true);
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const prompt = `Analyze these documents for common patterns, risks, and opportunities: ${documents.map(d => d.name).join(', ')}. 
      Provide insights on recurring clauses, potential risks, and recommendations.`;
      
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });
      
      const data = await res.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No analysis available';
      alert(`Batch Analysis Results:\n\n${responseText}`);
    } catch (error) {
      console.error('Batch analysis error:', error);
      alert('Error processing batch analysis');
    }
    
    setBatchProcessing(false);
  };

  // Categorize documents
  const categorizeDocuments = async () => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const prompt = `Categorize and tag these documents: ${documents.map(d => d.name).join(', ')}. 
      Suggest appropriate categories and tags for each. Respond with JSON format.`;
      
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });
      
      const data = await res.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          setCategorizationResults(JSON.parse(jsonMatch[0]));
          alert('Documents categorized successfully! Check the results in the console.');
          console.log('Categorization results:', JSON.parse(jsonMatch[0]));
        }
      } catch (e) {
        console.error('Error parsing categorization results:', e);
      }
    } catch (error) {
      console.error('Categorization error:', error);
    }
  };

  // Document Card Component
  const DocumentCard = ({ document }) => {
    const [showVersions, setShowVersions] = useState(false);
    
    const getStatusColor = (status) => {
      switch (status) {
        case 'Active': return 'bg-green-500/20 text-green-400';
        case 'Draft': return 'bg-yellow-500/20 text-yellow-400';
        case 'Under Review': return 'bg-blue-500/20 text-blue-400';
        case 'Expiring Soon': return 'bg-orange-500/20 text-orange-400';
        case 'Expired': return 'bg-red-500/20 text-red-400';
        case 'Archived': return 'bg-gray-500/20 text-gray-400';
        default: return 'bg-gray-500/20 text-gray-400';
      }
    };
    
    const getFileIcon = (fileType) => {
      switch (fileType) {
        case 'PDF': return '📄';
        case 'DOC': case 'DOCX': return '📝';
        case 'TXT': return '📃';
        default: return '📁';
      }
    };

    return (
      <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-2xl p-5 ring-1 ring-white/5 shadow-lg hover:ring-[#f3cf1a]/20 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start space-x-3">
            <div className="text-2xl mt-1">{getFileIcon(document.fileType)}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-lg mb-1">{document.name}</h3>
              <p className="text-[#a0a0a0] text-sm mb-2">{document.description}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
            {document.status}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-[#232323] text-[#f3cf1a] px-2 py-1 rounded-lg text-xs">
            {document.type}
          </span>
          <span className="bg-[#232323] text-[#a0a0a0] px-2 py-1 rounded-lg text-xs">
            {document.fileType} • {document.size}
          </span>
          {document.ocrProcessed && (
            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs">
              OCR Processed
            </span>
          )}
          <span className="bg-[#232323] text-[#a0a0a0] px-2 py-1 rounded-lg text-xs">
            {document.version}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {document.tags.map((tag, index) => (
            <span key={index} className="bg-[#f3cf1a]/10 text-[#f3cf1a] px-2 py-1 rounded-md text-xs">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-[#a0a0a0] text-sm">{document.lastUpdated}</span>
          <div className="flex space-x-2">
            <button 
              className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors"
              onClick={() => setShowVersions(!showVersions)}
              title="Version History"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors" title="Download">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors" title="Share">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
        
        {showVersions && (
          <div className="mt-4 p-3 bg-[#232323] rounded-lg ring-1 ring-white/5">
            <h4 className="font-medium text-white mb-2">Version History</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0a0]">v3.2 - Current</span>
                <span className="text-[#a0a0a0]">2 days ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0a0]">v3.1</span>
                <span className="text-[#a0a0a0]">1 week ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0a0]">v3.0</span>
                <span className="text-[#a0a0a0]">2 weeks ago</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f3cf1a]/10 rounded-full blur-xl"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white relative">
                Document Management
                <span className="block w-16 h-1 bg-[#f3cf1a] mt-2 rounded-full"></span>
              </h1>
              <p className="text-[#e0e0e0] mt-3 text-base">Upload, organize, and manage all your legal documents.</p>
            </div>
            <div className="flex gap-3">
              <button 
                className="px-4 py-3 bg-[#232323] hover:bg-[#343535] text-white font-medium rounded-xl transition-all duration-300 ring-1 ring-white/5 flex items-center"
                onClick={processBatchAnalysis}
                disabled={batchProcessing}
              >
                {batchProcessing ? 'Processing...' : 'Batch Analysis'}
              </button>
              <button 
                className="px-4 py-3 bg-[#232323] hover:bg-[#343535] text-white font-medium rounded-xl transition-all duration-300 ring-1 ring-white/5 flex items-center"
                onClick={categorizeDocuments}
              >
                Auto-Categorize
              </button>
            </div>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-2xl p-5 sm:p-6 ring-1 ring-white/5 shadow-lg mb-6 sm:mb-8">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-[#a0a0a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                type="text" 
                className="bg-[#232323] ring-1 ring-white/5 text-white text-sm rounded-xl focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent block w-full pl-10 p-3 placeholder-[#a0a0a0] transition-all duration-300" 
                placeholder="Search documents, tags, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <select 
                className="bg-[#232323] ring-1 ring-white/5 text-white text-sm rounded-xl focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent p-3 flex-1 sm:flex-none transition-all duration-300"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {documentTypes.map((type) => (
                  <option key={type} value={type} className="bg-[#232323] text-white">{type}</option>
                ))}
              </select>
              
              <select 
                className="bg-[#232323] ring-1 ring-white/5 text-white text-sm rounded-xl focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent p-3 flex-1 sm:flex-none transition-all duration-300"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status} className="bg-[#232323] text-white">{status}</option>
                ))}
              </select>
              
              <button 
                className="px-4 py-3 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 flex items-center justify-center whitespace-nowrap"
                onClick={() => fileInputRef.current?.click()}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span className="text-sm sm:text-base">Upload Document</span>
              </button>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </div>
          </div>
        </div>

        {/* Drag and Drop Area */}
        <div 
          className={`bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-2xl p-8 border-2 border-dashed mb-8 transition-all duration-300 ${
            isDragging ? 'border-[#f3cf1a] bg-[#f3cf1a]/10' : 'ring-white/10 hover:ring-[#f3cf1a]/30'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-[#232323] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#a0a0a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Drag & Drop Files Here</h3>
            <p className="text-[#a0a0a0] mb-4">Supported formats: PDF, DOC, DOCX, TXT</p>
            <button 
              className="px-4 py-2 bg-[#232323] hover:bg-[#343535] text-white font-medium rounded-lg transition-all duration-300 ring-1 ring-white/5"
              onClick={() => fileInputRef.current?.click()}
            >
              Select Files
            </button>
          </div>
        </div>
        
        {/* Documents Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))
          ) : (
            <div className="xl:col-span-2 bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-2xl p-8 ring-1 ring-white/5 shadow-lg flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-[#232323] rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-[#a0a0a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">No documents found</h3>
              <p className="text-[#a0a0a0] max-w-md mb-6 px-4">We couldn't find any documents matching your search criteria. Try adjusting your filters or upload a new document.</p>
              <button 
                className="px-4 py-3 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 flex items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Upload Document
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-2xl p-6 ring-1 ring-white/5 shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Upload Documents</h3>
            
            <div className="mb-4">
              <h4 className="font-medium text-white mb-2">Selected Files:</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-[#232323] rounded-lg">
                    <span className="text-sm text-white truncate flex-1 mr-2">{file.name}</span>
                    <span className="text-xs text-[#a0a0a0]">{(file.size / (1024 * 1024)).toFixed(1)}MB</span>
                  </div>
                ))}
              </div>
            </div>
            
            {isUploading && (
              <div className="mb-4">
                <div className="w-full bg-[#232323] rounded-full h-2.5">
                  <div 
                    className="bg-[#f3cf1a] h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-[#a0a0a0] mt-2">Processing... {Math.round(uploadProgress)}%</p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 bg-[#232323] hover:bg-[#343535] text-white font-medium rounded-lg transition-all duration-300 ring-1 ring-white/5"
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFiles([]);
                }}
                disabled={isUploading}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium rounded-lg transition-all duration-300"
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? 'Processing...' : 'Upload & Process'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
