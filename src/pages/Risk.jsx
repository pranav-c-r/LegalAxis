import React, { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth/mammoth.browser';
import Tesseract from 'tesseract.js';

const Risk = () => {
  const [activeTab, setActiveTab] = useState('heatmap');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [executiveSummary, setExecutiveSummary] = useState('');
  const [industryBenchmarks, setIndustryBenchmarks] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [fileError, setFileError] = useState('');
  const [ocrStatus, setOcrStatus] = useState('');


  const handleFileChange = async (e) => {
    setFileError('');
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    setExtractedText('');
    if (!file) return;

    const maxSizeMB = 15; // client-side soft limit
    if (file.size > maxSizeMB * 1024 * 1024) {
      setFileError(`File too large. Max ${maxSizeMB} MB.`);
      return;
    }

    const ext = (file.name.split('.').pop() || '').toLowerCase();
    try {
      if (ext === 'txt' || ext === 'md') {
        const text = await file.text();
        setExtractedText(text);
      } else if (ext === 'pdf') {
        // Read PDF with pdfjs-dist
        const arrayBuffer = await file.arrayBuffer();
        // Configure worker for Vite development
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
        }
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        let fullText = '';
        for (let p = 1; p <= pdf.numPages; p++) {
          const page = await pdf.getPage(p);
          const content = await page.getTextContent();
          const strings = content.items.map((it) => ('str' in it ? it.str : ''));
          fullText += strings.join(' ') + '\n\n';
        }
        setExtractedText(fullText.trim());
      } else if (ext === 'docx') {
        // Read DOCX with mammoth
        const arrayBuffer = await file.arrayBuffer();
        const { value } = await mammoth.extractRawText({ arrayBuffer });
        setExtractedText(value.trim());
      } else if (['png','jpg','jpeg','gif','bmp','tiff','webp'].includes(ext)) {
        // OCR with Tesseract.js
        setOcrStatus('Initializing OCR…');
        const img = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        const res = await Tesseract.recognize(img, 'eng', {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setOcrStatus(`OCR: ${(m.progress * 100).toFixed(0)}%`);
            } else {
              setOcrStatus(m.status);
            }
          }
        });
        setExtractedText(res.data.text.trim());
        setOcrStatus('');
      } else {
        setFileError('Unsupported file type. Please upload .txt, .md, .pdf, .docx, or an image.');
      }
    } catch (err) {
      setFileError('Failed to read file.');
      setOcrStatus('');
    }
  };

  const analyzeContractWithGemini = async () => {
    if (!extractedText.trim()) {
      setFileError('Please upload a document to analyze.');
      return;
    }
    setIsAnalyzing(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key not found');
      }

  const contractBody = extractedText.trim();

      const prompt = `
        Analyze this legal contract for risks and fairness. Provide a detailed assessment including:
        1. Risk heatmap with clause-by-clause risk assessment (High, Medium, Low)
        2. Fairness scoring on a scale of 0-100%
        3. Identification of any predatory or unfair clauses
        4. Comparison against industry standards for similar contracts
        5. Risk severity classification (Critical, High, Medium, Low)
        6. Executive summary for stakeholders
        
  Contract content: ${contractBody}
        
        Format the response as a JSON object with the following structure:
        {
          "overallRisk": "Medium",
          "fairnessScore": 65,
          "riskBreakdown": [
            {"section": "Termination Clause", "riskLevel": "High", "issues": ["One-sided termination rights", "Short notice period"]},
            {"section": "Limitation of Liability", "riskLevel": "Medium", "issues": ["Cap on liability may be too low"]},
            {"section": "Payment Terms", "riskLevel": "Low", "issues": []},
            {"section": "IP Rights", "riskLevel": "Medium", "issues": ["Vendor retains too much IP"]},
            {"section": "Confidentiality", "riskLevel": "Low", "issues": []}
          ],
          "predatoryClauses": [
            {"section": "Termination Clause", "description": "Allows vendor to terminate without cause with only 15 days notice", "suggestion": "Require mutual termination rights with 30 days notice"},
            {"section": "Limitation of Liability", "description": "Customer indemnifies vendor broadly while vendor's obligations are limited", "suggestion": "Balance indemnification obligations for both parties"}
          ],
          "industryBenchmarks": {
            "terminationNotice": "Industry standard: 30 days",
            "liabilityCap": "Industry standard: 12 months fees or greater",
            "paymentTerms": "Industry standard: Net 30",
            "confidentiality": "Industry standard: 3-5 years"
          },
          "executiveSummary": "This contract has moderate risk with several areas needing negotiation. The termination clause and limitation of liability present the highest risks that should be addressed before signing."
        }
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            response_mime_type: 'application/json'
          }
        })
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        throw new Error(`Gemini HTTP ${response.status}: ${response.statusText} ${errText}`);
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Empty response from model');
      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        // Fallback: try to extract JSON blob if model wrapped text
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('Model response not in JSON format');
        result = JSON.parse(jsonMatch[0]);
      }
      setAnalysisResult(result);
      setExecutiveSummary(result.executiveSummary || '');
      setIndustryBenchmarks(result.industryBenchmarks || null);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setFileError('Analysis failed. Please try again.');
      setAnalysisResult(null);
      setExecutiveSummary('');
      setIndustryBenchmarks(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    // Do not auto-analyze on mount; wait for user action
    // analyzeContractWithGemini();
  }, []);

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Critical': return 'bg-red-500/20 border-red-500/30 text-red-300';
      case 'High': return 'bg-red-500/20 border-red-500/30 text-red-300';
      case 'Medium': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';
      case 'Low': return 'bg-green-500/20 border-green-500/30 text-green-300';
      default: return 'bg-gray-500/20 border-gray-500/30 text-gray-300';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'Critical': return '🔴';
      case 'High': return '🔴';
      case 'Medium': return '🟡';
      case 'Low': return '🟢';
      default: return '⚪';
    }
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
                Risk & Fairness Analyzer
                <span className="block w-16 h-1 bg-[#f3cf1a] mt-2 rounded-full"></span>
              </h1>
              <p className="text-[#e0e0e0] mt-3 text-base">Identify and assess contractual risks with interactive heatmaps and scoring</p>
            </div>
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <label className="w-full sm:w-72">
                <span className="sr-only">Choose contract file</span>
                <input
                  type="file"
                  accept=".txt,.md,.pdf,.docx,image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-[#e0e0e0] file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#343535] file:text-white hover:file:bg-[#3d3d3d] cursor-pointer"
                />
              </label>
              <button 
                onClick={analyzeContractWithGemini}
                disabled={isAnalyzing}
                className="px-6 py-3 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    Analyze Contract
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="flex ring-1 ring-white/5 rounded-xl bg-[#1a1a1a] p-1 mb-6">
          <button
            className={`px-4 py-3 font-medium text-sm ${activeTab === 'heatmap' ? 'text-[#f3cf1a] ring-2 ring-[#f3cf1a] bg-[#f3cf1a]/10' : 'text-[#a0a0a0] hover:text-white'}`}
            onClick={() => setActiveTab('heatmap')}
          >
            Risk Heatmap
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${activeTab === 'fairness' ? 'text-[#f3cf1a] ring-2 ring-[#f3cf1a] bg-[#f3cf1a]/10' : 'text-[#a0a0a0] hover:text-white'}`}
            onClick={() => setActiveTab('fairness')}
          >
            Fairness Analysis
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${activeTab === 'executive' ? 'text-[#f3cf1a] ring-2 ring-[#f3cf1a] bg-[#f3cf1a]/10' : 'text-[#a0a0a0] hover:text-white'}`}
            onClick={() => setActiveTab('executive')}
          >
            Executive Summary
          </button>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          <div className="xl:col-span-2">
            {/* Risk Heatmap */}
            <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-2xl p-5 sm:p-6 ring-1 ring-white/5 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Risk Heatmap
              </h2>
              
              {isAnalyzing ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <svg className="w-12 h-12 animate-spin mx-auto text-[#f3cf1a]" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-[#e0e0e0]">Analyzing contract with Gemini AI...</p>
                  </div>
                </div>
              ) : analysisResult ? (
                <div className="bg-[#232323] rounded-xl p-4 sm:p-5 ring-1 ring-white/5 mb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                    <h3 className="font-medium text-white text-base sm:text-lg">{selectedFile?.name || 'Document'}</h3>
                    {analysisResult?.overallRisk && (
                      <span className={`text-sm px-3 py-1.5 rounded-full border ${getRiskColor(analysisResult.overallRisk)} self-start sm:self-center`}>
                        Overall Risk: {analysisResult.overallRisk}
                      </span>
                    )}
                  </div>
                  {(selectedFile || extractedText || fileError) && (
                    <div className="mb-4 p-3 rounded-lg bg-[#1a1a1a] ring-1 ring-white/5 text-sm text-[#e0e0e0] space-y-2">
                      {selectedFile && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">File:</span>
                          <span>{selectedFile.name}</span>
                          <span className="text-[#a0a0a0]">({(selectedFile.size/1024).toFixed(1)} KB)</span>
                          <button
                            onClick={() => { setSelectedFile(null); setExtractedText(''); setFileError(''); }}
                            className="ml-auto px-2 py-1 text-xs rounded bg-[#343535] hover:bg-[#3d3d3d]"
                          >Clear</button>
                        </div>
                      )}
                      {extractedText && (
                        <div>
                          <span className="font-medium">Preview:</span>
                          <p className="mt-1 max-h-24 overflow-auto whitespace-pre-wrap text-xs text-[#cfcfcf]">{extractedText.slice(0, 600)}{extractedText.length > 600 ? '…' : ''}</p>
                        </div>
                      )}
                      {ocrStatus && (
                        <p className="text-[#e0e0e0]">{ocrStatus}</p>
                      )}
                      {fileError && (
                        <p className="text-red-300">{fileError}</p>
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    {analysisResult?.riskBreakdown?.map((item, index) => (
                      <div key={index} className={`p-3 rounded-lg ${getRiskColor(item.riskLevel)} border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 group hover:scale-[1.02] transition-all duration-300`}>
                        <div className="flex-1">
                          <span className="text-white text-sm truncate group-hover:text-[#f3cf1a] transition-colors duration-300 flex items-center gap-2">
                            {getRiskIcon(item.riskLevel)} {item.section}
                          </span>
                          {item.issues.length > 0 && (
                            <div className="mt-2 text-xs text-[#e0e0e0]">
                              {item.issues.map((issue, i) => (
                                <div key={i} className="flex items-start gap-1">
                                  <span className="text-red-400">•</span>
                                  <span>{issue}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-[#343535] text-white whitespace-nowrap">
                          {item.riskLevel} Risk
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-[#232323] rounded-xl p-6 ring-1 ring-white/5 mb-4 text-center text-[#e0e0e0]">
                  Upload a document and click Analyze to view the risk heatmap.
                </div>
              )}
              
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-[#a0a0a0]">Critical/High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs text-[#a0a0a0]">Medium Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-[#a0a0a0]">Low Risk</span>
                </div>
              </div>
            </div>
            
            {/* Executive Summary (shown when tab is active) */}
            {activeTab === 'executive' && analysisResult && (
                          <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-2xl p-5 sm:p-6 ring-1 ring-white/5 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Executive Summary
                </h2>
                
                <div className="bg-[#232323] rounded-xl p-5 ring-1 ring-white/5">
                  <div className="prose prose-invert max-w-none">
                    {executiveSummary && (
                      <p className="text-[#e0e0e0] leading-relaxed">{executiveSummary}</p>
                    )}
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-[#1a1a1a] ring-1 ring-white/5">
                        <h3 className="text-lg font-semibold text-white mb-2">Key Risks</h3>
                        <ul className="text-sm text-[#e0e0e0] space-y-1">
                          <li className="flex items-start gap-1">
                            <span className="text-red-400">•</span>
                            <span>One-sided termination clause favors vendor</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-yellow-400">•</span>
                            <span>Limitation of liability may be too restrictive</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-yellow-400">•</span>
                            <span>Intellectual property rights need clarification</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-[#1a1a1a] ring-1 ring-white/5">
                        <h3 className="text-lg font-semibold text-white mb-2">Recommendations</h3>
                        <ul className="text-sm text-[#e0e0e0] space-y-1">
                          <li className="flex items-start gap-1">
                            <span className="text-green-400">•</span>
                            <span>Negotiate mutual termination rights</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-green-400">•</span>
                            <span>Increase liability cap for direct damages</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-green-400">•</span>
                            <span>Clarify IP ownership of deliverables</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            {/* Fairness Score */}
            {analysisResult?.fairnessScore !== undefined && (
                        <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-2xl p-5 sm:p-6 ring-1 ring-white/5 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                Fairness Score
              </h2>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="3"
                      strokeDasharray="100, 100"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#f3cf1a"
                      strokeWidth="3"
                      strokeDasharray={`${analysisResult.fairnessScore}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl sm:text-4xl font-bold text-[#f3cf1a]">{analysisResult.fairnessScore}%</span>
                    <span className="text-sm text-[#a0a0a0]">Fair</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-[#232323] ring-1 ring-white/5">
                  <p className="text-sm text-[#a0a0a0]">Risk Score</p>
                  <p className="text-xl font-bold text-white">32/100</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-[#232323] ring-1 ring-white/5">
                  <p className="text-sm text-[#a0a0a0]">Issues Found</p>
                  <p className="text-xl font-bold text-white">{analysisResult?.predatoryClauses?.length ?? 0}</p>
                </div>
              </div>
            </div>
            )}
            
            {/* Unfair Clauses */}
            {analysisResult?.predatoryClauses?.length > 0 && (
                        <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-2xl p-5 sm:p-6 ring-1 ring-white/5 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                Unfair Clauses
              </h2>
              <div className="space-y-4">
                {analysisResult?.predatoryClauses?.map((clause, index) => (
                  <div key={index} className="p-4 rounded-xl bg-[#232323] border border-red-500/30 hover:border-red-500/50 transition-all duration-300 group">
                    <h3 className="font-medium text-white text-base group-hover:text-red-300 transition-colors duration-300">{clause.section}</h3>
                    <p className="text-sm mt-2 text-[#e0e0e0] leading-relaxed">{clause.description}</p>
                    <div className="mt-3 p-3 bg-[#1a1a1a] rounded-lg ring-1 ring-white/5">
                      <p className="text-xs text-[#a0a0a0]">Suggested Alternative:</p>
                      <p className="text-sm text-green-300 mt-1">{clause.suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            )}
            
            {/* Industry Benchmarking */}
            <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-2xl p-5 sm:p-6 ring-1 ring-white/5 shadow-lg">

              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Industry Benchmarks
              </h2>
              <div className="space-y-4">
                {industryBenchmarks && Object.entries(industryBenchmarks).map(([key, value], index) => (
                  <div key={index} className="p-3 rounded-lg bg-[#232323] ring-1 ring-white/5 flex justify-between items-center">
                    <span className="text-sm text-[#e0e0e0] capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="text-sm font-medium text-[#f3cf1a]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Risk;
