import React, { useState, useEffect } from 'react';

const TABS = [
  { key: 'whatif', label: 'What-If Engine', icon: '🔀' },
  { key: 'financial', label: 'Financial Calculator', icon: '💰' },
  { key: 'roleplay', label: 'Role Playing', icon: '🧑‍🤝‍🧑' },
  { key: 'dispute', label: 'Dispute Pathways', icon: '⚖️' },
  { key: 'timeline', label: 'Timeline', icon: '📅' },
  { key: 'probability', label: 'Probability Outcomes', icon: '📊' },
];

const defaultScenarios = [
  { 
    id: 1,
    title: 'Early Termination', 
    description: 'Impact of terminating the SaaS agreement after 6 months',
    financialImpact: '$24,500',
    legalRisk: 'Medium',
    probability: '15%',
    status: 'completed',
    stakeholders: ['Legal Team', 'Finance', 'Vendor'],
    timeline: [
      { day: 0, event: 'Termination notice sent' },
      { day: 7, event: 'Vendor responds' },
      { day: 30, event: 'Final settlement' }
    ]
  },
  { 
    id: 2,
    title: 'Breach of SLA', 
    description: 'Financial impact if vendor fails to meet 99.5% uptime guarantee',
    financialImpact: '$12,800',
    legalRisk: 'Low',
    probability: '35%',
    status: 'completed',
    stakeholders: ['IT Department', 'Legal Team', 'Vendor'],
    timeline: [
      { day: 0, event: 'SLA breach detected' },
      { day: 3, event: 'Formal complaint filed' },
      { day: 14, event: 'Remediation plan' },
      { day: 30, event: 'Compensation processed' }
    ]
  },
  { 
    id: 3,
    title: 'Delayed Payment', 
    description: 'Consequences of missing the quarterly payment deadline by 15 days',
    financialImpact: '$8,200',
    legalRisk: 'High',
    probability: '10%',
    status: 'completed',
    stakeholders: ['Finance', 'Legal Team', 'Vendor'],
    timeline: [
      { day: 0, event: 'Payment missed' },
      { day: 5, event: 'Late notice received' },
      { day: 15, event: 'Payment made with penalty' },
      { day: 30, event: 'Relationship review' }
    ]
  }
];

const Scenarios = () => {
  const [activeTab, setActiveTab] = useState('whatif');
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [scenarios, setScenarios] = useState(defaultScenarios);
  const [inputScenario, setInputScenario] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [scenarioElements, setScenarioElements] = useState([]);
  const [financialInputs, setFinancialInputs] = useState({
    initialCost: '',
    monthlyCost: '',
    duration: '',
    riskFactor: ''
  });
  const [financialResult, setFinancialResult] = useState(null);
  const [selectedRole, setSelectedRole] = useState('Legal Team');
  const [disputeType, setDisputeType] = useState('contractual');
  const [timelineData, setTimelineData] = useState([]);

  // Gemini API call helper
  const callGemini = async (prompt, options = {}) => {
    setLoading(true);
    setAiResponse('');
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API key not found');
      }
      
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: options.temperature || 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: options.maxTokens || 1024,
          }
        }),
      });
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const data = await res.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
      setAiResponse(responseText);
      return responseText;
    } catch (e) {
      console.error('API call error:', e);
      setAiResponse('Error: ' + e.message);
      return null;
    }
    setLoading(false);
  };

  // Drag and drop handlers
  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItem) {
      setScenarioElements([...scenarioElements, { type: 'element', content: draggedItem }]);
      setDraggedItem(null);
    }
  };

  // Calculate financial impact
  const calculateFinancialImpact = () => {
    const { initialCost, monthlyCost, duration, riskFactor } = financialInputs;
    if (!initialCost || !monthlyCost || !duration) return;
    
    const initial = parseFloat(initialCost);
    const monthly = parseFloat(monthlyCost);
    const months = parseInt(duration);
    const risk = riskFactor ? parseFloat(riskFactor) / 100 : 0.1;
    
    const totalCost = initial + (monthly * months);
    const riskAdjustedCost = totalCost * (1 + risk);
    
    setFinancialResult({
      totalCost: totalCost.toFixed(2),
      riskAdjustedCost: riskAdjustedCost.toFixed(2),
      riskPercentage: (risk * 100).toFixed(1)
    });
  };

  // Generate timeline visualization
  const generateTimeline = async () => {
    if (!inputScenario) return;
    
    setLoading(true);
    const prompt = `Create a timeline for this scenario: ${inputScenario}. 
    Format as a JSON array of objects with day and event properties. 
    Example: [{"day": 0, "event": "Contract signed"}, {"day": 30, "event": "First payment due"}]`;
    
    const response = await callGemini(prompt, { temperature: 0.3 });
    if (response) {
      try {
        // Extract JSON from response
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const timeline = JSON.parse(jsonMatch[0]);
          setTimelineData(timeline);
        }
      } catch (e) {
        console.error('Error parsing timeline:', e);
      }
    }
    setLoading(false);
  };

  // Tab content renderers
  const renderTab = () => {
    switch (activeTab) {
      case 'whatif':
        return (
          <div className="bg-[#222222] rounded-2xl p-6 sm:p-8 border border-[#343535] shadow-lg hover:shadow-xl transition-all duration-500 hover:border-[#f3cf1a]/30 group">
            <div className="flex items-center mb-6">
              <div className="w-3 h-8 bg-[#f3cf1a] rounded-full mr-4"></div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-2xl">🔀</span> 
                  Interactive What-If Engine
                </h2>
                <p className="text-gray-400 mt-2">Drag and drop elements to build custom scenarios and analyze potential outcomes</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Elements Panel */}
              <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#343535] hover:border-[#f3cf1a]/20 transition-all duration-300">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  Scenario Elements
                </h3>
                <div className="space-y-3">
                  {['Contract Breach', 'Payment Delay', 'Force Majeure', 'Price Increase', 'Scope Change', 'Termination'].map(item => (
                    <div 
                      key={item}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                      className="p-4 bg-[#222222] border border-[#343535] rounded-lg cursor-move hover:border-[#f3cf1a]/40 hover:shadow-lg hover:shadow-[#f3cf1a]/10 transition-all duration-300 group"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-3 group-hover:scale-110 transition-transform duration-300">↕️</span>
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Canvas Area */}
              <div className="lg:col-span-2">
                <div 
                  className="bg-[#1a1a1a] rounded-xl p-6 border-2 border-dashed border-[#343535] min-h-[300px] mb-6 hover:border-[#f3cf1a]/30 transition-all duration-300"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <h3 className="font-semibold text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                    </svg>
                    Scenario Canvas
                  </h3>
                  {scenarioElements.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                      <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      <p className="text-lg font-medium">Drag elements here to build your scenario</p>
                      <p className="text-sm mt-1">Create complex scenarios by combining multiple elements</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {scenarioElements.map((element, index) => (
                        <div key={index} className="p-4 bg-[#f3cf1a]/10 border border-[#f3cf1a]/30 rounded-lg hover:bg-[#f3cf1a]/15 transition-all duration-300">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{element.content}</span>
                            <button 
                              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-all duration-300"
                              onClick={() => setScenarioElements(scenarioElements.filter((_, i) => i !== index))}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-between">
                  <button 
                    className="bg-[#343535] hover:bg-[#404040] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => setScenarioElements([])}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Clear Canvas
                  </button>
                  <button 
                    className="bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#010101] px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={scenarioElements.length === 0 || loading}
                    onClick={() => {
                      const scenarioText = scenarioElements.map(e => e.content).join(', ');
                      callGemini(`Analyze this scenario built from these elements: ${scenarioText}. Provide potential outcomes, risks, and strategic recommendations.`);
                    }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                        Analyze Scenario
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {aiResponse && (
              <div className="mt-8 p-6 bg-[#1a1a1a] border border-[#f3cf1a]/30 rounded-xl">
                <h3 className="font-bold text-[#f3cf1a] mb-4 flex items-center text-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                  AI Scenario Analysis
                </h3>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-line text-gray-300 leading-relaxed">{aiResponse}</div>
                </div>
              </div>
            )}
          </div>
        );
      case 'financial':
        return (
          <div className="bg-[#222222] rounded-2xl p-6 sm:p-8 border border-[#343535] shadow-lg hover:shadow-xl transition-all duration-500 hover:border-[#f3cf1a]/30 group">
            <div className="flex items-center mb-6">
              <div className="w-3 h-8 bg-[#f3cf1a] rounded-full mr-4"></div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-2xl">💰</span> 
                  Financial Impact Calculator
                </h2>
                <p className="text-gray-400 mt-2">Calculate cost projections and risk-adjusted financial impacts for different scenarios</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535] hover:border-[#f3cf1a]/20 transition-all duration-300">
                <h3 className="font-semibold text-white mb-6 flex items-center">
                  <svg className="w-5 h-5 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  Input Parameters
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Initial Cost ($)</label>
                    <input
                      type="number"
                      className="w-full p-4 rounded-xl bg-[#222222] border border-[#343535] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f3cf1a]/50 focus:border-[#f3cf1a]/50 transition-all duration-300"
                      value={financialInputs.initialCost}
                      onChange={e => setFinancialInputs({...financialInputs, initialCost: e.target.value})}
                      placeholder="Enter initial cost"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Cost ($)</label>
                    <input
                      type="number"
                      className="w-full p-4 rounded-xl bg-[#222222] border border-[#343535] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f3cf1a]/50 focus:border-[#f3cf1a]/50 transition-all duration-300"
                      value={financialInputs.monthlyCost}
                      onChange={e => setFinancialInputs({...financialInputs, monthlyCost: e.target.value})}
                      placeholder="Enter monthly cost"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Duration (months)</label>
                    <input
                      type="number"
                      className="w-full p-4 rounded-xl bg-[#222222] border border-[#343535] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f3cf1a]/50 focus:border-[#f3cf1a]/50 transition-all duration-300"
                      value={financialInputs.duration}
                      onChange={e => setFinancialInputs({...financialInputs, duration: e.target.value})}
                      placeholder="12"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Risk Factor (%)</label>
                    <input
                      type="number"
                      className="w-full p-4 rounded-xl bg-[#222222] border border-[#343535] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f3cf1a]/50 focus:border-[#f3cf1a]/50 transition-all duration-300"
                      value={financialInputs.riskFactor}
                      onChange={e => setFinancialInputs({...financialInputs, riskFactor: e.target.value})}
                      placeholder="10"
                      min="0"
                      max="100"
                    />
                  </div>
                  
                  <button
                    className="w-full bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#010101] px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    onClick={calculateFinancialImpact}
                    disabled={!financialInputs.initialCost || !financialInputs.monthlyCost || !financialInputs.duration}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    Calculate Impact
                  </button>
                </div>
              </div>
              
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535] hover:border-[#f3cf1a]/20 transition-all duration-300">
                <h3 className="font-semibold text-white mb-6 flex items-center">
                  <svg className="w-5 h-5 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  Financial Projection
                </h3>
                
                {financialResult ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[#222222] p-5 rounded-xl border border-[#343535]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm font-medium">Base Cost</span>
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                          </svg>
                        </div>
                        <p className="text-2xl font-bold text-white">${parseFloat(financialResult.totalCost).toLocaleString()}</p>
                      </div>
                      
                      <div className="bg-[#222222] p-5 rounded-xl border border-[#343535]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm font-medium">Risk Adjusted</span>
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                          </svg>
                        </div>
                        <p className="text-2xl font-bold text-white">${parseFloat(financialResult.riskAdjustedCost).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="bg-[#222222] p-5 rounded-xl border border-[#343535]">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 font-medium">Risk Impact</span>
                        <span className="text-[#f3cf1a] text-2xl font-bold">{financialResult.riskPercentage}%</span>
                      </div>
                      <div className="w-full bg-[#343535] rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-[#f3cf1a] to-yellow-500 h-3 rounded-full transition-all duration-500" 
                          style={{width: `${Math.min(100, financialResult.riskPercentage)}%`}}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Low Risk</span>
                        <span>High Risk</span>
                      </div>
                    </div>
                    
                    <div className="bg-[#222222] p-5 rounded-xl border border-[#343535]">
                      <h4 className="font-medium text-white mb-3 flex items-center">
                        <svg className="w-4 h-4 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Financial Summary
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Additional cost due to risk factors: <span className="text-[#f3cf1a] font-semibold">
                          ${(parseFloat(financialResult.riskAdjustedCost) - parseFloat(financialResult.totalCost)).toLocaleString()}
                        </span>
                        {' '}({((parseFloat(financialResult.riskAdjustedCost) - parseFloat(financialResult.totalCost)) / parseFloat(financialResult.totalCost) * 100).toFixed(1)}% increase)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    <p className="text-lg font-medium">Financial Analysis Ready</p>
                    <p className="text-sm mt-1">Enter parameters to calculate financial impact</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'roleplay':
        return (
          <div className="bg-[#222222] rounded-2xl p-6 sm:p-8 border border-[#343535] shadow-lg hover:shadow-xl transition-all duration-500 hover:border-[#f3cf1a]/30 group">
            <div className="flex items-center mb-6">
              <div className="w-3 h-8 bg-[#f3cf1a] rounded-full mr-4"></div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-2xl">🧑‍🤝‍🧑</span> 
                  Multi-Party Role Playing
                </h2>
                <p className="text-gray-400 mt-2">Simulate perspectives of all stakeholders in contract scenarios</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535] hover:border-[#f3cf1a]/20 transition-all duration-300">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Select Role
                </h3>
                <div className="space-y-3">
                  {['Legal Team', 'Vendor', 'Finance', 'Executive', 'IT Department', 'Customer'].map(role => (
                    <button
                      key={role}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-300 font-medium ${
                        selectedRole === role 
                          ? 'bg-[#f3cf1a] text-[#010101] shadow-lg' 
                          : 'bg-[#222222] text-gray-300 hover:bg-[#f3cf1a]/10 hover:text-[#f3cf1a] border border-[#343535] hover:border-[#f3cf1a]/30'
                      }`}
                      onClick={() => setSelectedRole(role)}
                    >
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${selectedRole === role ? 'bg-[#010101]' : 'bg-[#f3cf1a]'}`}></div>
                        {role}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-2 bg-[#1a1a1a] p-6 rounded-xl border border-[#343535] hover:border-[#f3cf1a]/20 transition-all duration-300">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Role Perspective: {selectedRole}
                </h3>
                
                <textarea
                  className="w-full p-4 rounded-xl bg-[#222222] border border-[#343535] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f3cf1a]/50 focus:border-[#f3cf1a]/50 transition-all duration-300 resize-none"
                  rows={4}
                  placeholder={`Describe the scenario from ${selectedRole}'s perspective...`}
                  value={inputScenario}
                  onChange={e => setInputScenario(e.target.value)}
                />
                
                <button
                  className="mt-4 w-full bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#010101] px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  onClick={() => callGemini(`As a ${selectedRole}, analyze this scenario: ${inputScenario}. What are your concerns, priorities, and recommended actions?`)}
                  disabled={!inputScenario || loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Simulating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      Simulate Perspective
                    </>
                  )}
                </button>
                
                {aiResponse && (
                  <div className="mt-6 p-5 bg-[#f3cf1a]/10 border border-[#f3cf1a]/30 rounded-xl">
                    <h4 className="font-bold text-[#f3cf1a] mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      {selectedRole} Perspective
                    </h4>
                    <div className="whitespace-pre-line text-gray-300">{aiResponse}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535] hover:border-[#f3cf1a]/20 transition-all duration-300">
              <h3 className="font-semibold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                Multi-Party Analysis
              </h3>
              <p className="text-gray-400 mb-4">Compare perspectives across all stakeholders</p>
              <button
                className="bg-[#343535] hover:bg-[#404040] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                onClick={() => callGemini(`Compare stakeholder perspectives for this scenario: ${inputScenario}. Analyze conflicts and alignment between Legal, Vendor, Finance, and Executive roles.`)}
                disabled={!inputScenario || loading}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Compare All Perspectives
              </button>
            </div>
          </div>
        );
      case 'dispute':
        return (
          <div className="bg-[#222222] rounded-2xl p-6 sm:p-8 border border-[#343535] shadow-lg hover:shadow-xl transition-all duration-500 hover:border-[#f3cf1a]/30 group">
            <div className="flex items-center mb-6">
              <div className="w-3 h-8 bg-[#f3cf1a] rounded-full mr-4"></div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-2xl">⚖️</span> 
                  Dispute Resolution Pathways
                </h2>
                <p className="text-gray-400 mt-2">Map potential legal remedies and escalation strategies for different dispute types</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <button 
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  disputeType === 'contractual' 
                    ? 'bg-[#f3cf1a] text-[#010101] border-[#f3cf1a] shadow-lg shadow-[#f3cf1a]/20' 
                    : 'bg-[#1a1a1a] text-gray-300 border-[#343535] hover:border-[#f3cf1a]/30 hover:bg-[#f3cf1a]/5'
                }`}
                onClick={() => setDisputeType('contractual')}
              >
                <div className="flex items-center justify-center mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Contractual</h3>
                <p className="text-sm opacity-80">Breach of contract, terms violation</p>
              </button>
              
              <button 
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  disputeType === 'payment' 
                    ? 'bg-[#f3cf1a] text-[#010101] border-[#f3cf1a] shadow-lg shadow-[#f3cf1a]/20' 
                    : 'bg-[#1a1a1a] text-gray-300 border-[#343535] hover:border-[#f3cf1a]/30 hover:bg-[#f3cf1a]/5'
                }`}
                onClick={() => setDisputeType('payment')}
              >
                <div className="flex items-center justify-center mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Payment</h3>
                <p className="text-sm opacity-80">Late payments, invoicing issues</p>
              </button>
              
              <button 
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  disputeType === 'performance' 
                    ? 'bg-[#f3cf1a] text-[#010101] border-[#f3cf1a] shadow-lg shadow-[#f3cf1a]/20' 
                    : 'bg-[#1a1a1a] text-gray-300 border-[#343535] hover:border-[#f3cf1a]/30 hover:bg-[#f3cf1a]/5'
                }`}
                onClick={() => setDisputeType('performance')}
              >
                <div className="flex items-center justify-center mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Performance</h3>
                <p className="text-sm opacity-80">SLA breaches, quality issues</p>
              </button>
            </div>
            
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535] hover:border-[#f3cf1a]/20 transition-all duration-300 mb-6">
              <h3 className="font-semibold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                Dispute Scenario
              </h3>
              <textarea
                className="w-full p-4 rounded-xl bg-[#222222] border border-[#343535] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f3cf1a]/50 focus:border-[#f3cf1a]/50 transition-all duration-300 resize-none"
                rows={4}
                placeholder="Describe the dispute scenario..."
                value={inputScenario}
                onChange={e => setInputScenario(e.target.value)}
              />
              
              <button
                className="mt-4 w-full bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#010101] px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                onClick={() => callGemini(`Map legal remedies for this ${disputeType} dispute: ${inputScenario}. Include escalation pathways, potential resolutions, and estimated timelines.`)}
                disabled={!inputScenario || loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mapping...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                    </svg>
                    Map Resolution Pathways
                  </>
                )}
              </button>
            </div>
            
            {aiResponse && (
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#f3cf1a]/30">
                <h3 className="font-bold text-[#f3cf1a] mb-4 flex items-center text-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                  </svg>
                  Dispute Resolution Analysis
                </h3>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-line text-gray-300 leading-relaxed">{aiResponse}</div>
                </div>
              </div>
            )}
          </div>
        );
      case 'timeline':
        return (
          <div className="bg-[#222222] rounded-2xl p-6 sm:p-8 border border-[#343535] shadow-lg hover:shadow-xl transition-all duration-500 hover:border-[#f3cf1a]/30 group">
            <div className="flex items-center mb-6">
              <div className="w-3 h-8 bg-[#f3cf1a] rounded-full mr-4"></div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-2xl">📅</span> 
                  Timeline Visualization
                </h2>
                <p className="text-gray-400 mt-2">Visualize how scenarios unfold over time with interactive timeline mapping</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535] hover:border-[#f3cf1a]/20 transition-all duration-300">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Scenario Input
                </h3>
                <textarea
                  className="w-full p-4 rounded-xl bg-[#222222] border border-[#343535] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f3cf1a]/50 focus:border-[#f3cf1a]/50 transition-all duration-300 resize-none"
                  rows={6}
                  placeholder="Describe the scenario for timeline visualization..."
                  value={inputScenario}
                  onChange={e => setInputScenario(e.target.value)}
                />
                
                <button
                  className="mt-4 w-full bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#010101] px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  onClick={generateTimeline}
                  disabled={!inputScenario || loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Generate Timeline
                    </>
                  )}
                </button>
              </div>
              
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535] hover:border-[#f3cf1a]/20 transition-all duration-300">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  Timeline Statistics
                </h3>
                
                {timelineData.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#222222] p-4 rounded-xl border border-[#343535]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm font-medium">Total Events</span>
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <p className="text-2xl font-bold text-white">{timelineData.length}</p>
                      </div>
                      
                      <div className="bg-[#222222] p-4 rounded-xl border border-[#343535]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm font-medium">Duration</span>
                          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <p className="text-2xl font-bold text-white">{Math.max(...timelineData.map(item => item.day))} Days</p>
                      </div>
                    </div>
                    
                    <div className="bg-[#222222] p-4 rounded-xl border border-[#343535]">
                      <h4 className="font-medium text-white mb-3 flex items-center">
                        <svg className="w-4 h-4 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Timeline Summary
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        The scenario spans <span className="text-[#f3cf1a] font-semibold">{Math.max(...timelineData.map(item => item.day))} days</span> with{' '}
                        <span className="text-[#f3cf1a] font-semibold">{timelineData.length} key events</span> mapped out for comprehensive planning.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                    <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="text-lg font-medium">Timeline Ready</p>
                    <p className="text-sm mt-1">Enter a scenario to generate timeline</p>
                  </div>
                )}
              </div>
            </div>
            
            {timelineData.length > 0 ? (
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535] hover:border-[#f3cf1a]/20 transition-all duration-300">
                <h3 className="font-semibold text-white mb-6 flex items-center">
                  <svg className="w-5 h-5 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  Interactive Timeline Visualization
                </h3>
                <div className="relative">
                  {/* Timeline visualization */}
                  <div className="border-l-2 border-[#f3cf1a]/30 pl-8 ml-4 py-4 space-y-6">
                    {timelineData.map((item, index) => (
                      <div key={index} className="relative group">
                        <div className="absolute -left-12 w-8 h-8 bg-[#f3cf1a] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <span className="text-[#010101] text-sm font-bold">{item.day}</span>
                        </div>
                        <div className="bg-[#222222] p-5 rounded-xl border border-[#343535] shadow-sm hover:border-[#f3cf1a]/30 hover:shadow-lg hover:shadow-[#f3cf1a]/10 transition-all duration-300">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-[#f3cf1a] text-lg">Day {item.day}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              {index === 0 ? 'Start' : index === timelineData.length - 1 ? 'End' : 'Progress'}
                            </div>
                          </div>
                          <p className="text-gray-300 leading-relaxed">{item.event}</p>
                          {index < timelineData.length - 1 && (
                            <div className="mt-3 text-xs text-gray-500">
                              ↓ {timelineData[index + 1].day - item.day} day{timelineData[index + 1].day - item.day > 1 ? 's' : ''} until next event
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#1a1a1a] p-8 rounded-xl border border-dashed border-[#343535] text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p className="text-gray-400 text-lg font-medium mb-2">Enter a scenario to generate a timeline visualization</p>
                <p className="text-gray-500 text-sm">AI will create a detailed timeline with key events and milestones</p>
              </div>
            )}
            
            {aiResponse && !timelineData.length && (
              <div className="mt-6 bg-[#1a1a1a] p-6 rounded-xl border border-[#f3cf1a]/30">
                <h3 className="font-bold text-[#f3cf1a] mb-4 flex items-center text-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                  Timeline Analysis
                </h3>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-line text-gray-300 leading-relaxed">{aiResponse}</div>
                </div>
              </div>
            )}
          </div>
        );
      case 'probability':
        return (
          <div className="bg-[#222222] rounded-2xl p-6 sm:p-8 border border-[#343535] shadow-lg hover:shadow-xl transition-all duration-500 hover:border-[#f3cf1a]/30 group">
            <div className="flex items-center mb-6">
              <div className="w-3 h-8 bg-[#f3cf1a] rounded-full mr-4"></div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-2xl">📊</span> 
                  Probability-Weighted Outcomes
                </h2>
                <p className="text-gray-400 mt-2">Estimate statistical likelihood of different scenarios with advanced probability analysis</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535] hover:border-[#f3cf1a]/20 transition-all duration-300">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                  Scenario Input
                </h3>
                <textarea
                  className="w-full p-4 rounded-xl bg-[#222222] border border-[#343535] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f3cf1a]/50 focus:border-[#f3cf1a]/50 transition-all duration-300 resize-none"
                  rows={6}
                  placeholder="Describe the scenario for probability analysis. Include possible outcomes and any known factors that might influence probabilities..."
                  value={inputScenario}
                  onChange={e => setInputScenario(e.target.value)}
                />
                
                <button
                  className="mt-4 w-full bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#010101] px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  onClick={() => callGemini(`Estimate probability-weighted outcomes for this scenario: ${inputScenario}. Provide a statistical analysis of likely outcomes with percentages and confidence intervals.`)}
                  disabled={!inputScenario || loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                      Calculate Probabilities
                    </>
                  )}
                </button>
              </div>
              
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535] hover:border-[#f3cf1a]/20 transition-all duration-300">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                  </svg>
                  Probability Distribution
                </h3>
                
                {aiResponse ? (
                  <div className="space-y-4">
                    <div className="bg-[#222222] p-4 rounded-xl border border-[#343535]">
                      <div className="prose prose-invert max-w-none">
                        <div className="whitespace-pre-line text-gray-300 leading-relaxed text-sm">{aiResponse}</div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-[#f3cf1a]/10 to-[#f3cf1a]/5 p-4 rounded-xl border border-[#f3cf1a]/20">
                      <h4 className="font-semibold text-[#f3cf1a] mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                        Risk Assessment
                      </h4>
                      <button
                        className="bg-[#f3cf1a]/20 hover:bg-[#f3cf1a]/30 text-[#f3cf1a] px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm hover:shadow-lg hover:shadow-[#f3cf1a]/10"
                        onClick={() => callGemini(`Based on this probability analysis: ${aiResponse}. What risk mitigation strategies would you recommend?`)}
                      >
                        Suggest Risk Mitigation
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                    <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    <p className="text-lg font-medium">Analysis Ready</p>
                    <p className="text-sm mt-1">Enter a scenario to see probability analysis</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535] hover:border-[#f3cf1a]/20 transition-all duration-300">
              <h3 className="font-semibold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 text-[#f3cf1a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Monte Carlo Simulation
              </h3>
              <p className="text-gray-400 mb-4">Run advanced probability simulations with statistical modeling</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 bg-gradient-to-r from-[#f3cf1a]/20 to-[#f3cf1a]/10 hover:from-[#f3cf1a]/30 hover:to-[#f3cf1a]/20 text-[#f3cf1a] px-6 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  onClick={() => callGemini(`Create a Monte Carlo simulation plan for this scenario: ${inputScenario}. Outline the variables, distributions, and number of iterations needed.`)}
                  disabled={!inputScenario || loading}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  Design Simulation
                </button>
                
                <button
                  className="flex-1 bg-[#222222] hover:bg-[#2a2a2a] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-[#343535] hover:border-[#f3cf1a]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  onClick={() => callGemini(`Perform statistical validation for this probability analysis: ${aiResponse}. Include confidence intervals and sensitivity analysis.`)}
                  disabled={!aiResponse || loading}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Validate Analysis
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#010101] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f3cf1a]/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#f3cf1a]/5 rounded-full blur-lg"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 relative">
            <div className="flex items-center">
              
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white relative leading-tight">
                  Scenario Simulation Agent
                  <div className="w-20 h-1 bg-[#f3cf1a] mt-3 rounded-full"></div>
                </h1>
                <p className="text-gray-400 mt-3 text-base sm:text-lg">AI-powered scenario modeling for contract negotiations and risk analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-400">Active Scenarios</p>
                <p className="text-2xl font-bold text-[#f3cf1a]">{scenarios.length}</p>
              </div>
              <button className="bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#010101] px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                New Simulation
              </button>
            </div>
          </div>
        </div>        {/* Enhanced Tabs with Animation */}
        <div className="flex flex-wrap gap-3 mb-8 p-2 bg-[#1a1a1a] rounded-2xl border border-[#343535] shadow-xl">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`
                px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-500 ease-out
                flex items-center gap-3 flex-1 sm:flex-none justify-center group relative overflow-hidden
                ${activeTab === tab.key 
                  ? 'bg-[#f3cf1a] text-[#010101] shadow-lg shadow-[#f3cf1a]/25 scale-105 transform' 
                  : 'bg-transparent text-gray-400 hover:text-white hover:bg-[#222222] hover:border-[#f3cf1a]/20 hover:scale-102'
                }
              `}
              onClick={() => { 
                setActiveTab(tab.key); 
                setAiResponse(''); 
                setInputScenario('');
                // Smooth scroll to top with animation
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {/* Background gradient animation */}
              <div className={`
                absolute inset-0 bg-gradient-to-r from-[#f3cf1a]/10 to-transparent 
                transform transition-transform duration-500 ease-out
                ${activeTab === tab.key ? 'translate-x-0' : '-translate-x-full group-hover:translate-x-0'}
              `}></div>
              
              {/* Icon with enhanced animation */}
              <span className={`
                text-xl transition-all duration-400 relative z-10
                ${activeTab === tab.key 
                  ? 'scale-110 rotate-12 drop-shadow-sm' 
                  : 'group-hover:scale-105 group-hover:rotate-6'
                }
              `}>
                {tab.icon}
              </span>
              
              {/* Text with enhanced styling */}
              <span className={`
                text-sm sm:text-base font-bold relative z-10 transition-all duration-300
                ${activeTab === tab.key 
                  ? 'opacity-100 drop-shadow-sm' 
                  : 'opacity-80 group-hover:opacity-100'
                }
              `}>
                {tab.label}
              </span>
              
              {/* Active indicator with animation */}
              {activeTab === tab.key && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#010101] rounded-full animate-pulse"></div>
              )}
              
              {/* Ripple effect on hover */}
              <div className={`
                absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300
                bg-gradient-to-r from-[#f3cf1a]/5 to-[#f3cf1a]/10
                ${activeTab !== tab.key ? 'group-hover:opacity-100' : ''}
              `}></div>
            </button>
          ))}
        </div>

        {/* Enhanced Active Tab Content with Fade Animation */}
        <div className="relative">
          <div className={`
            transition-all duration-700 ease-out transform
            ${activeTab ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            {renderTab()}
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#343535]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              <span className="text-sm font-medium">AI-powered by Gemini</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Simulation results are estimates only
              </span>
              <span className="hidden sm:block">•</span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {scenarios.length} Active Scenarios
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scenarios;