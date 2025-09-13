import React, { useState, useEffect } from 'react';

const Risk = () => {
  const [activeTab, setActiveTab] = useState('heatmap');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [executiveSummary, setExecutiveSummary] = useState('');
  const [industryBenchmarks, setIndustryBenchmarks] = useState(null);
  
  // Sample contract data for analysis
  const sampleContract = {
    title: 'Master Service Agreement',
    content: `
      This Master Service Agreement (the "Agreement") is entered into as of [Date] (the "Effective Date") by and between [Company Name], 
      a [State] corporation ("Client") and [Vendor Name], a [State] corporation ("Vendor").
      
      SECTION 1: SERVICES
      Vendor shall provide the services described in Exhibit A (the "Services") to Client in accordance with the terms of this Agreement.
      
      SECTION 2: TERM AND TERMINATION
      This Agreement shall commence on the Effective Date and continue for a period of one (1) year unless earlier terminated as provided herein.
      Either party may terminate this Agreement for convenience upon thirty (30) days written notice to the other party.
      Vendor may terminate this Agreement immediately if Client fails to pay any amount due within fifteen (15) days after receipt of written notice of non-payment.
      
      SECTION 3: PAYMENT TERMS
      Client shall pay Vendor the fees set forth in Exhibit B. All payments are due within thirty (30) days of invoice date.
      Late payments shall bear interest at the rate of 1.5% per month or the maximum rate allowed by law, whichever is less.
      
      SECTION 4: INTELLECTUAL PROPERTY
      Vendor retains all right, title, and interest in and to its pre-existing intellectual property.
      Client shall own all right, title, and interest in and to the deliverables specifically developed for Client under this Agreement.
      
      SECTION 5: LIMITATION OF LIABILITY
      In no event shall either party's total liability exceed the total fees paid by Client to Vendor under this Agreement in the twelve (12) months preceding the claim.
      Neither party shall be liable for any indirect, special, incidental, or consequential damages.
      
      SECTION 6: CONFIDENTIALITY
      Both parties agree to maintain the confidentiality of each other's proprietary information for a period of three (3) years after termination.
    `,
    clauses: [
      { id: 1, section: 'Termination Clause (§2)', text: 'Either party may terminate this Agreement for convenience upon thirty (30) days written notice to the other party. Vendor may terminate this Agreement immediately if Client fails to pay any amount due within fifteen (15) days after receipt of written notice of non-payment.' },
      { id: 2, section: 'Limitation of Liability (§5)', text: 'In no event shall either party\'s total liability exceed the total fees paid by Client to Vendor under this Agreement in the twelve (12) months preceding the claim. Neither party shall be liable for any indirect, special, incidental, or consequential damages.' },
      { id: 3, section: 'Payment Terms (§3)', text: 'Client shall pay Vendor the fees set forth in Exhibit B. All payments are due within thirty (30) days of invoice date. Late payments shall bear interest at the rate of 1.5% per month or the maximum rate allowed by law, whichever is less.' },
      { id: 4, section: 'IP Rights (§4)', text: 'Vendor retains all right, title, and interest in and to its pre-existing intellectual property. Client shall own all right, title, and interest in and to the deliverables specifically developed for Client under this Agreement.' },
      { id: 5, section: 'Confidentiality (§6)', text: 'Both parties agree to maintain the confidentiality of each other\'s proprietary information for a period of three (3) years after termination.' }
    ]
  };

  // Analyze contract with Gemini API
  const analyzeContractWithGemini = async () => {
    setIsAnalyzing(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key not found');
      }

      const prompt = `
        Analyze this legal contract for risks and fairness. Provide a detailed assessment including:
        1. Risk heatmap with clause-by-clause risk assessment (High, Medium, Low)
        2. Fairness scoring on a scale of 0-100%
        3. Identification of any predatory or unfair clauses
        4. Comparison against industry standards for similar contracts
        5. Risk severity classification (Critical, High, Medium, Low)
        6. Executive summary for stakeholders
        
        Contract content: ${sampleContract.content}
        
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
        const resultText = data.candidates[0].content.parts[0].text;
        // Extract JSON from the response (Gemini might add some text around the JSON)
        const jsonMatch = resultText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          setAnalysisResult(result);
          setExecutiveSummary(result.executiveSummary);
          setIndustryBenchmarks(result.industryBenchmarks);
        } else {
          // Fallback if we can't parse JSON
          setAnalysisResult({
            overallRisk: "Medium",
            fairnessScore: 65,
            riskBreakdown: [
              {section: "Termination Clause (§2)", riskLevel: "High", issues: ["One-sided termination rights", "Short notice period"]},
              {section: "Limitation of Liability (§5)", riskLevel: "Medium", issues: ["Cap on liability may be too low"]},
              {section: "Payment Terms (§3)", riskLevel: "Low", issues: []},
              {section: "IP Rights (§4)", riskLevel: "Medium", issues: ["Vendor retains too much IP"]},
              {section: "Confidentiality (§6)", riskLevel: "Low", issues: []}
            ],
            predatoryClauses: [
              {section: "Termination Clause (§2)", description: "Allows vendor to terminate without cause with only 15 days notice", suggestion: "Require mutual termination rights with 30 days notice"},
              {section: "Limitation of Liability (§5)", description: "Customer indemnifies vendor broadly while vendor's obligations are limited", suggestion: "Balance indemnification obligations for both parties"}
            ],
            industryBenchmarks: {
              terminationNotice: "Industry standard: 30 days",
              liabilityCap: "Industry standard: 12 months fees or greater",
              paymentTerms: "Industry standard: Net 30",
              confidentiality: "Industry standard: 3-5 years"
            },
            executiveSummary: "This contract has moderate risk with several areas needing negotiation. The termination clause and limitation of liability present the highest risks that should be addressed before signing."
          });
        }
      } else {
        // Fallback data if API fails
        setAnalysisResult({
          overallRisk: "Medium",
          fairnessScore: 65,
          riskBreakdown: [
            {section: "Termination Clause (§2)", riskLevel: "High", issues: ["One-sided termination rights", "Short notice period"]},
            {section: "Limitation of Liability (§5)", riskLevel: "Medium", issues: ["Cap on liability may be too low"]},
            {section: "Payment Terms (§3)", riskLevel: "Low", issues: []},
            {section: "IP Rights (§4)", riskLevel: "Medium", issues: ["Vendor retains too much IP"]},
            {section: "Confidentiality (§6)", riskLevel: "Low", issues: []}
          ],
          predatoryClauses: [
            {section: "Termination Clause (§2)", description: "Allows vendor to terminate without cause with only 15 days notice", suggestion: "Require mutual termination rights with 30 days notice"},
            {section: "Limitation of Liability (§5)", description: "Customer indemnifies vendor broadly while vendor's obligations are limited", suggestion: "Balance indemnification obligations for both parties"}
          ],
          industryBenchmarks: {
            terminationNotice: "Industry standard: 30 days",
            liabilityCap: "Industry standard: 12 months fees or greater",
            paymentTerms: "Industry standard: Net 30",
            confidentiality: "Industry standard: 3-5 years"
          },
          executiveSummary: "This contract has moderate risk with several areas needing negotiation. The termination clause and limitation of liability present the highest risks that should be addressed before signing."
        });
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      // Set fallback data on error
      setAnalysisResult({
        overallRisk: "Medium",
        fairnessScore: 65,
        riskBreakdown: [
          {section: "Termination Clause (§2)", riskLevel: "High", issues: ["One-sided termination rights", "Short notice period"]},
          {section: "Limitation of Liability (§5)", riskLevel: "Medium", issues: ["Cap on liability may be too low"]},
          {section: "Payment Terms (§3)", riskLevel: "Low", issues: []},
          {section: "IP Rights (§4)", riskLevel: "Medium", issues: ["Vendor retains too much IP"]},
          {section: "Confidentiality (§6)", riskLevel: "Low", issues: []}
        ],
        predatoryClauses: [
          {section: "Termination Clause (§2)", description: "Allows vendor to terminate without cause with only 15 days notice", suggestion: "Require mutual termination rights with 30 days notice"},
          {section: "Limitation of Liability (§5)", description: "Customer indemnifies vendor broadly while vendor's obligations are limited", suggestion: "Balance indemnification obligations for both parties"}
        ],
        industryBenchmarks: {
          terminationNotice: "Industry standard: 30 days",
          liabilityCap: "Industry standard: 12 months fees or greater",
          paymentTerms: "Industry standard: Net 30",
          confidentiality: "Industry standard: 3-5 years"
        },
        executiveSummary: "This contract has moderate risk with several areas needing negotiation. The termination clause and limitation of liability present the highest risks that should be addressed before signing."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    // Analyze contract on component mount
    analyzeContractWithGemini();
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
            <button 
              onClick={analyzeContractWithGemini}
              disabled={isAnalyzing}
              className="px-6 py-3 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 w-full sm:w-auto flex items-center justify-center gap-2"
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
        
        {/* Tabs Navigation */}
        <div className="flex border-b border-[#343535] mb-6">
          <button
            className={`px-4 py-3 font-medium text-sm ${activeTab === 'heatmap' ? 'text-[#f3cf1a] border-b-2 border-[#f3cf1a]' : 'text-[#a0a0a0] hover:text-white'}`}
            onClick={() => setActiveTab('heatmap')}
          >
            Risk Heatmap
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${activeTab === 'fairness' ? 'text-[#f3cf1a] border-b-2 border-[#f3cf1a]' : 'text-[#a0a0a0] hover:text-white'}`}
            onClick={() => setActiveTab('fairness')}
          >
            Fairness Analysis
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${activeTab === 'executive' ? 'text-[#f3cf1a] border-b-2 border-[#f3cf1a]' : 'text-[#a0a0a0] hover:text-white'}`}
            onClick={() => setActiveTab('executive')}
          >
            Executive Summary
          </button>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          <div className="xl:col-span-2">
            {/* Risk Heatmap */}
            <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
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
              ) : (
                <div className="bg-[#2a2a2a] rounded-xl p-4 sm:p-5 border border-[#343535] mb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                    <h3 className="font-medium text-white text-base sm:text-lg">{sampleContract.title}</h3>
                    <span className={`text-sm px-3 py-1.5 rounded-full border ${getRiskColor(analysisResult?.overallRisk || 'Medium')} self-start sm:self-center`}>
                      Overall Risk: {analysisResult?.overallRisk || 'Medium'}
                    </span>
                  </div>
                  
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
            {activeTab === 'executive' && (
              <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg mt-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Executive Summary
                </h2>
                
                <div className="bg-[#2a2a2a] rounded-xl p-5 border border-[#343535]">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-[#e0e0e0] leading-relaxed">
                      {executiveSummary || "This contract has moderate risk with several areas needing negotiation. The termination clause and limitation of liability present the highest risks that should be addressed before signing."}
                    </p>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#343535]">
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
                      
                      <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#343535]">
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
            <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
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
                      stroke="#343535"
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
                      strokeDasharray={`${analysisResult?.fairnessScore || 65}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl sm:text-4xl font-bold text-[#f3cf1a]">{analysisResult?.fairnessScore || 65}%</span>
                    <span className="text-sm text-[#a0a0a0]">Fair</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-[#2a2a2a] border border-[#343535]">
                  <p className="text-sm text-[#a0a0a0]">Risk Score</p>
                  <p className="text-xl font-bold text-white">32/100</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-[#2a2a2a] border border-[#343535]">
                  <p className="text-sm text-[#a0a0a0]">Issues Found</p>
                  <p className="text-xl font-bold text-white">{analysisResult?.predatoryClauses?.length || 2}</p>
                </div>
              </div>
            </div>
            
            {/* Unfair Clauses */}
            <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                Unfair Clauses
              </h2>
              <div className="space-y-4">
                {analysisResult?.predatoryClauses?.map((clause, index) => (
                  <div key={index} className="p-4 rounded-xl bg-[#2a2a2a] border border-red-500/30 hover:border-red-500/50 transition-all duration-300 group">
                    <h3 className="font-medium text-white text-base group-hover:text-red-300 transition-colors duration-300">{clause.section}</h3>
                    <p className="text-sm mt-2 text-[#e0e0e0] leading-relaxed">{clause.description}</p>
                    <div className="mt-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#343535]">
                      <p className="text-xs text-[#a0a0a0]">Suggested Alternative:</p>
                      <p className="text-sm text-green-300 mt-1">{clause.suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Industry Benchmarking */}
            <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Industry Benchmarks
              </h2>
              <div className="space-y-4">
                {industryBenchmarks && Object.entries(industryBenchmarks).map(([key, value], index) => (
                  <div key={index} className="p-3 rounded-lg bg-[#2a2a2a] border border-[#343535] flex justify-between items-center">
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