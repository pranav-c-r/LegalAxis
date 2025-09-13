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
          <div className="bg-box rounded-2xl p-6 border border-[#343535] shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary flex items-center">
              <span className="mr-2">🔀</span> Interactive What-If Engine
            </h2>
            <p className="text-text/70 mb-6">Drag and drop elements to build custom scenarios</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Elements Panel */}
              <div className="bg-background rounded-xl p-4 border border-[#343535]">
                <h3 className="font-medium text-primary mb-3">Scenario Elements</h3>
                <div className="space-y-2">
                  {['Contract Breach', 'Payment Delay', 'Force Majeure', 'Price Increase', 'Scope Change', 'Termination'].map(item => (
                    <div 
                      key={item}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                      className="p-3 bg-background/50 border border-[#343535] rounded-lg cursor-move hover:border-primary/30 transition"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-2">↕️</span>
                        <span className="text-text/90">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Canvas Area */}
              <div className="lg:col-span-2">
                <div 
                  className="bg-background rounded-xl p-6 border-2 border-dashed border-[#343535] min-h-[300px] mb-4"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <h3 className="font-medium text-primary mb-3">Scenario Canvas</h3>
                  {scenarioElements.length === 0 ? (
                    <div className="flex items-center justify-center h-64 text-text/50">
                      <p>Drag elements here to build your scenario</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {scenarioElements.map((element, index) => (
                        <div key={index} className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-text/90">{element.content}</span>
                            <button 
                              className="text-red-500 hover:text-red-400"
                              onClick={() => setScenarioElements(scenarioElements.filter((_, i) => i !== index))}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <button 
                    className="bg-primary/20 text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/30 transition"
                    onClick={() => setScenarioElements([])}
                  >
                    Clear Canvas
                  </button>
                  <button 
                    className="bg-primary text-background px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition disabled:opacity-50"
                    disabled={scenarioElements.length === 0}
                    onClick={() => {
                      const scenarioText = scenarioElements.map(e => e.content).join(', ');
                      callGemini(`Analyze this scenario built from these elements: ${scenarioText}. Provide potential outcomes and risks.`);
                    }}
                  >
                    Analyze Scenario
                  </button>
                </div>
              </div>
            </div>
            
            {aiResponse && (
              <div className="mt-6 p-4 bg-background border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Scenario Analysis:</h3>
                <div className="whitespace-pre-line">{aiResponse}</div>
              </div>
            )}
          </div>
        );
      case 'financial':
        return (
          <div className="bg-box rounded-2xl p-6 border border-[#343535] shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary flex items-center">
              <span className="mr-2">💰</span> Financial Impact Calculator
            </h2>
            <p className="text-text/70 mb-6">Calculate cost projections for different scenarios</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-background p-5 rounded-xl border border-[#343535]">
                <h3 className="font-medium text-primary mb-4">Input Parameters</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-text/80 mb-1">Initial Cost ($)</label>
                    <input
                      type="number"
                      className="w-full p-3 rounded-lg bg-background/50 border border-[#343535] text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={financialInputs.initialCost}
                      onChange={e => setFinancialInputs({...financialInputs, initialCost: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-text/80 mb-1">Monthly Cost ($)</label>
                    <input
                      type="number"
                      className="w-full p-3 rounded-lg bg-background/50 border border-[#343535] text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={financialInputs.monthlyCost}
                      onChange={e => setFinancialInputs({...financialInputs, monthlyCost: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-text/80 mb-1">Duration (months)</label>
                    <input
                      type="number"
                      className="w-full p-3 rounded-lg bg-background/50 border border-[#343535] text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={financialInputs.duration}
                      onChange={e => setFinancialInputs({...financialInputs, duration: e.target.value})}
                      placeholder="12"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-text/80 mb-1">Risk Factor (%)</label>
                    <input
                      type="number"
                      className="w-full p-3 rounded-lg bg-background/50 border border-[#343535] text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={financialInputs.riskFactor}
                      onChange={e => setFinancialInputs({...financialInputs, riskFactor: e.target.value})}
                      placeholder="10"
                      min="0"
                      max="100"
                    />
                  </div>
                  
                  <button
                    className="w-full bg-primary text-background px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition disabled:opacity-50"
                    onClick={calculateFinancialImpact}
                    disabled={!financialInputs.initialCost || !financialInputs.monthlyCost || !financialInputs.duration}
                  >
                    Calculate Impact
                  </button>
                </div>
              </div>
              
              <div className="bg-background p-5 rounded-xl border border-[#343535]">
                <h3 className="font-medium text-primary mb-4">Financial Projection</h3>
                
                {financialResult ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                      <span className="text-text/80">Total Base Cost</span>
                      <span className="text-lg font-semibold text-primary">${financialResult.totalCost}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                      <span className="text-text/80">Risk-Adjusted Cost</span>
                      <span className="text-lg font-semibold text-primary">${financialResult.riskAdjustedCost}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                      <span className="text-text/80">Risk Factor</span>
                      <span className="text-lg font-semibold text-primary">{financialResult.riskPercentage}%</span>
                    </div>
                    
                    <div className="mt-4 p-3 bg-background/50 rounded-lg">
                      <h4 className="font-medium text-primary mb-2">AI Analysis</h4>
                      <textarea
                        className="w-full p-3 rounded-lg bg-background border border-[#343535] text-text mb-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        rows={3}
                        placeholder="Add context for AI analysis..."
                        value={inputScenario}
                        onChange={e => setInputScenario(e.target.value)}
                      />
                      <button
                        className="bg-primary text-background px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition text-sm disabled:opacity-50"
                        onClick={() => callGemini(`Analyze this financial scenario: Base cost: $${financialResult.totalCost}, Risk-adjusted: $${financialResult.riskAdjustedCost}. Context: ${inputScenario}`)}
                        disabled={!inputScenario || loading}
                      >
                        {loading ? 'Analyzing...' : 'Get AI Insights'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-text/50">
                    <p>Enter parameters and calculate to see results</p>
                  </div>
                )}
              </div>
            </div>
            
            {aiResponse && (
              <div className="p-4 bg-background border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Financial Analysis:</h3>
                <div className="whitespace-pre-line">{aiResponse}</div>
              </div>
            )}
          </div>
        );
      case 'roleplay':
        return (
          <div className="bg-box rounded-2xl p-6 border border-[#343535] shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary flex items-center">
              <span className="mr-2">🧑‍🤝‍🧑</span> Multi-Party Role Playing
            </h2>
            <p className="text-text/70 mb-6">Simulate perspectives of all stakeholders</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-background p-5 rounded-xl border border-[#343535]">
                <h3 className="font-medium text-primary mb-4">Select Role</h3>
                <div className="space-y-3">
                  {['Legal Team', 'Vendor', 'Finance', 'Executive', 'IT Department', 'Customer'].map(role => (
                    <button
                      key={role}
                      className={`w-full p-3 rounded-lg text-left transition ${selectedRole === role ? 'bg-primary text-background' : 'bg-background/50 hover:bg-primary/10'}`}
                      onClick={() => setSelectedRole(role)}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-2 bg-background p-5 rounded-xl border border-[#343535]">
                <h3 className="font-medium text-primary mb-4">Role Perspective: {selectedRole}</h3>
                
                <textarea
                  className="w-full p-3 rounded-lg bg-background/50 border border-[#343535] text-text mb-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  rows={4}
                  placeholder={`Describe the scenario from ${selectedRole}'s perspective...`}
                  value={inputScenario}
                  onChange={e => setInputScenario(e.target.value)}
                />
                
                <button
                  className="bg-primary text-background px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition mb-6 disabled:opacity-50"
                  onClick={() => callGemini(`As a ${selectedRole}, analyze this scenario: ${inputScenario}. What are your concerns, priorities, and recommended actions?`)}
                  disabled={!inputScenario || loading}
                >
                  {loading ? 'Simulating...' : 'Simulate Perspective'}
                </button>
                
                {aiResponse && (
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-medium text-primary mb-2">{selectedRole} Perspective:</h4>
                    <div className="whitespace-pre-line">{aiResponse}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-background/50 p-4 rounded-lg border border-[#343535]">
              <h3 className="font-medium text-primary mb-3">Multi-Party Analysis</h3>
              <p className="text-text/70 mb-3">Compare perspectives across all stakeholders</p>
              <button
                className="bg-primary/20 text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/30 transition"
                onClick={() => callGemini(`Compare stakeholder perspectives for this scenario: ${inputScenario}. Analyze conflicts and alignment between Legal, Vendor, Finance, and Executive roles.`)}
                disabled={!inputScenario || loading}
              >
                Compare All Perspectives
              </button>
            </div>
          </div>
        );
      case 'dispute':
        return (
          <div className="bg-box rounded-2xl p-6 border border-[#343535] shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary flex items-center">
              <span className="mr-2">⚖️</span> Dispute Resolution Pathways
            </h2>
            <p className="text-text/70 mb-6">Map potential legal remedies for different dispute types</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button 
                className={`p-4 rounded-xl border transition-all ${disputeType === 'contractual' ? 'bg-primary text-background border-primary' : 'bg-background border-[#343535] hover:border-primary/30'}`}
                onClick={() => setDisputeType('contractual')}
              >
                <h3 className="font-medium mb-2">Contractual</h3>
                <p className="text-sm opacity-80">Breach of contract, terms violation</p>
              </button>
              
              <button 
                className={`p-4 rounded-xl border transition-all ${disputeType === 'payment' ? 'bg-primary text-background border-primary' : 'bg-background border-[#343535] hover:border-primary/30'}`}
                onClick={() => setDisputeType('payment')}
              >
                <h3 className="font-medium mb-2">Payment</h3>
                <p className="text-sm opacity-80">Late payments, invoicing issues</p>
              </button>
              
              <button 
                className={`p-4 rounded-xl border transition-all ${disputeType === 'performance' ? 'bg-primary text-background border-primary' : 'bg-background border-[#343535] hover:border-primary/30'}`}
                onClick={() => setDisputeType('performance')}
              >
                <h3 className="font-medium mb-2">Performance</h3>
                <p className="text-sm opacity-80">SLA breaches, quality issues</p>
              </button>
            </div>
            
            <textarea
              className="w-full p-3 rounded-lg bg-background border border-[#343535] text-text mb-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={4}
              placeholder="Describe the dispute scenario..."
              value={inputScenario}
              onChange={e => setInputScenario(e.target.value)}
            />
            
            <button
              className="bg-primary text-background px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition mb-6 disabled:opacity-50"
              onClick={() => callGemini(`Map legal remedies for this ${disputeType} dispute: ${inputScenario}. Include escalation pathways, potential resolutions, and estimated timelines.`)}
              disabled={!inputScenario || loading}
            >
              {loading ? 'Mapping...' : 'Map Resolution Pathways'}
            </button>
            
            {aiResponse && (
              <div className="p-4 bg-background border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Dispute Resolution Analysis:</h3>
                <div className="whitespace-pre-line">{aiResponse}</div>
              </div>
            )}
          </div>
        );
      case 'timeline':
        return (
          <div className="bg-box rounded-2xl p-6 border border-[#343535] shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary flex items-center">
              <span className="mr-2">📅</span> Timeline Visualization
            </h2>
            <p className="text-text/70 mb-6">Visualize how scenarios unfold over time</p>
            
            <textarea
              className="w-full p-3 rounded-lg bg-background border border-[#343535] text-text mb-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={4}
              placeholder="Describe the scenario for timeline visualization..."
              value={inputScenario}
              onChange={e => setInputScenario(e.target.value)}
            />
            
            <button
              className="bg-primary text-background px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition mb-6 disabled:opacity-50"
              onClick={generateTimeline}
              disabled={!inputScenario || loading}
            >
              {loading ? 'Generating...' : 'Generate Timeline'}
            </button>
            
            {timelineData.length > 0 ? (
              <div className="relative">
                {/* Timeline visualization */}
                <div className="border-l-2 border-primary/30 pl-6 ml-3 py-4 space-y-8">
                  {timelineData.map((item, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-9 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-background text-xs font-bold">{item.day}</span>
                      </div>
                      <div className="bg-background p-4 rounded-xl border border-[#343535] shadow-sm">
                        <h4 className="font-medium text-primary mb-1">Day {item.day}</h4>
                        <p className="text-text/90">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-background/50 p-8 rounded-lg border border-dashed border-[#343535] text-center">
                <p className="text-text/70">Enter a scenario to generate a timeline visualization</p>
              </div>
            )}
            
            {aiResponse && !timelineData.length && (
              <div className="mt-4 p-4 bg-background border border-primary/20 rounded-lg">
                <div className="whitespace-pre-line">{aiResponse}</div>
              </div>
            )}
          </div>
        );
      case 'probability':
        return (
          <div className="bg-box rounded-2xl p-6 border border-[#343535] shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary flex items-center">
              <span className="mr-2">📊</span> Probability-Weighted Outcomes
            </h2>
            <p className="text-text/70 mb-6">Estimate statistical likelihood of different scenarios</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-background p-5 rounded-xl border border-[#343535]">
                <h3 className="font-medium text-primary mb-4">Scenario Input</h3>
                
                <textarea
                  className="w-full p-3 rounded-lg bg-background/50 border border-[#343535] text-text mb-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  rows={6}
                  placeholder="Describe the scenario for probability analysis. Include possible outcomes and any known factors that might influence probabilities..."
                  value={inputScenario}
                  onChange={e => setInputScenario(e.target.value)}
                />
                
                <button
                  className="w-full bg-primary text-background px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition disabled:opacity-50"
                  onClick={() => callGemini(`Estimate probability-weighted outcomes for this scenario: ${inputScenario}. Provide a statistical analysis of likely outcomes with percentages and confidence intervals.`)}
                  disabled={!inputScenario || loading}
                >
                  {loading ? 'Calculating...' : 'Calculate Probabilities'}
                </button>
              </div>
              
              <div className="bg-background p-5 rounded-xl border border-[#343535]">
                <h3 className="font-medium text-primary mb-4">Probability Distribution</h3>
                
                {aiResponse ? (
                  <div className="space-y-4">
                    <div className="whitespace-pre-line">{aiResponse}</div>
                    
                    <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                      <h4 className="font-medium text-primary mb-2">Risk Assessment</h4>
                      <button
                        className="bg-primary/20 text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/30 transition text-sm"
                        onClick={() => callGemini(`Based on this probability analysis: ${aiResponse}. What risk mitigation strategies would you recommend?`)}
                      >
                        Suggest Risk Mitigation
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-text/50">
                    <p>Enter a scenario to see probability analysis</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-background/50 p-4 rounded-lg border border-[#343535]">
              <h3 className="font-medium text-primary mb-2">Monte Carlo Simulation</h3>
              <p className="text-text/70 mb-3">Run advanced probability simulations</p>
              <button
                className="bg-primary/20 text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/30 transition"
                onClick={() => callGemini(`Create a Monte Carlo simulation plan for this scenario: ${inputScenario}. Outline the variables, distributions, and number of iterations needed.`)}
                disabled={!inputScenario || loading}
              >
                Design Simulation
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
  <div className="min-h-screen bg-[#010101] text-[#FFFFFF] p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-text relative">
                Scenario Simulation Agent
                <span className="block w-16 h-1 bg-primary mt-2 rounded-full"></span>
              </h1>
              <p className="text-text/80 mt-3 text-base">AI-powered scenario modeling for contract negotiations</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 border-2 flex items-center ${activeTab === tab.key ? 'bg-[#222222] text-[#f3cf1a] border-[#f3cf1a] shadow-lg shadow-[#f3cf1a]/20' : 'bg-[#1a1a1a] text-[#a0a0a0] border-[#343535] hover:text-[#f3cf1a] hover:border-[#f3cf1a]/30'}`}
              onClick={() => { 
                setActiveTab(tab.key); 
                setAiResponse(''); 
                setInputScenario(''); 
              }}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        {/* New Simulation Button */}
        <div className="mb-8 flex justify-end">
          <button 
            className="px-6 py-3 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#010101] font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 w-full sm:w-auto border-2 border-[#f3cf1a]"
          >
            New Simulation
          </button>
        </div>

        {/* Active Tab Content */}
        <div>
          {renderTab()}
        </div>
        
        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-[#343535] text-center text-[#a0a0a0] text-sm">
          <p>AI-powered by Gemini • Simulation results are estimates only</p>
        </div>
      </div>
    </div>
  );
};

export default Scenarios;