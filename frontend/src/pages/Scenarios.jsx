import React, { useState, useEffect } from 'react';

const TABS = [
  { key: 'whatif', label: 'What-If Engine', icon: '🔀' },
  { key: 'financial', label: 'Financial Calculator', icon: '💰' },
  { key: 'roleplay', label: 'Role Playing', icon: '🧑‍🤝‍🧑' },
  { key: 'dispute', label: 'Dispute Pathways', icon: '⚖️' },
  { key: 'timeline', label: 'Timeline', icon: '📅' },
  { key: 'probability', label: 'Probability Outcomes', icon: '📊' },
];

const Scenarios = () => {
  const [activeTab, setActiveTab] = useState('whatif');
  const [inputScenario, setInputScenario] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [scenarioElements, setScenarioElements] = useState([]);
  const [structuredScenario, setStructuredScenario] = useState(null);
  const [simulationResults, setSimulationResults] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  // Gemini API call helper
  const callGemini = async (prompt, options = {}) => {
    setLoading(true);
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
            maxOutputTokens: options.maxTokens || 2048,
            responseMimeType: "application/json",
          }
        }),
      });
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const data = await res.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
      
      try {
        // Try to parse JSON response
        const jsonMatch = responseText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        return responseText;
      } catch (e) {
        return responseText;
      }
    } catch (e) {
      console.error('API call error:', e);
      return { error: e.message };
    } finally {
      setLoading(false);
    }
  };

  // Convert input to structured JSON
  const structureScenario = async (text) => {
    const prompt = `Convert this scenario description into structured JSON format with:
    - actors: array of involved parties with their roles
    - events: chronological sequence of key events
    - context: background information and constraints
    - disputePoints: potential areas of conflict
    - desiredOutcome: what the user wants to achieve

    Scenario: "${text}"

    Return ONLY valid JSON with this structure, no additional text.`;
    
    const result = await callGemini(prompt, { temperature: 0.3, maxTokens: 1024 });
    if (result && !result.error) {
      setStructuredScenario(result);
      return result;
    }
    return null;
  };

  // Run complete simulation
  const runSimulation = async () => {
    if (!inputScenario.trim()) return;
    
    setLoading(true);
    setSimulationResults(null);
    
    // Step 1: Structure the scenario
    const structured = await structureScenario(inputScenario);
    if (!structured) {
      setLoading(false);
      return;
    }

    // Step 2: Run comprehensive analysis
    const analysisPrompt = `As a legal AI analyst, perform comprehensive scenario analysis:

    STRUCTURED SCENARIO:
    ${JSON.stringify(structured, null, 2)}

    TASKS:
    1. Role-play each stakeholder's perspective and concerns
    2. Generate a detailed timeline of events with estimated durations
    3. Map dispute resolution pathways with pros/cons
    4. Calculate probability-weighted outcomes for different scenarios
    5. Provide risk assessment and mitigation strategies

    Return as JSON with:
    - stakeholderPerspectives: array of {actor: string, perspective: string, concerns: array, recommendations: array}
    - timeline: array of {event: string, timeframe: string, critical: boolean}
    - disputePathways: array of {type: string, steps: array, successProbability: number, pros: array, cons: array}
    - outcomeProbabilities: array of {scenario: string, probability: number, impact: string}
    - riskAssessment: {overallRisk: string, mitigationStrategies: array}

    Return ONLY valid JSON, no additional text.`;
    
    const results = await callGemini(analysisPrompt, { maxTokens: 4096 });
    if (results && !results.error) {
      setSimulationResults(results);
    }
    
    setLoading(false);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInputScenario(event.target.result);
      };
      reader.readAsText(files[0]);
    }
  };

  // Render simulation results
  const renderResults = () => {
    if (!simulationResults) return null;

    return (
      <div className="mt-8 space-y-8">
        {/* Stakeholder Perspectives */}
        {simulationResults.stakeholderPerspectives && (
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535]">
            <h3 className="text-xl font-bold text-[#f3cf1a] mb-4">Stakeholder Perspectives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {simulationResults.stakeholderPerspectives.map((stakeholder, index) => (
                <div key={index} className="bg-[#222222] p-4 rounded-lg border border-[#343535]">
                  <h4 className="font-semibold text-white mb-2">{stakeholder.actor}</h4>
                  <p className="text-gray-300 text-sm mb-3">{stakeholder.perspective}</p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[#f3cf1a] text-sm font-medium">Concerns:</span>
                      <ul className="text-gray-400 text-sm list-disc list-inside">
                        {stakeholder.concerns.map((concern, i) => (
                          <li key={i}>{concern}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-[#f3cf1a] text-sm font-medium">Recommendations:</span>
                      <ul className="text-gray-400 text-sm list-disc list-inside">
                        {stakeholder.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        {simulationResults.timeline && (
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535]">
            <h3 className="text-xl font-bold text-[#f3cf1a] mb-4">Event Timeline</h3>
            <div className="space-y-3">
              {simulationResults.timeline.map((event, index) => (
                <div key={index} className="flex items-start gap-4 bg-[#222222] p-4 rounded-lg border border-[#343535]">
                  <div className={`w-3 h-3 rounded-full mt-2 ${event.critical ? 'bg-red-500' : 'bg-[#f3cf1a]'}`}></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{event.event}</h4>
                    <p className="text-gray-400 text-sm">{event.timeframe}</p>
                    {event.description && (
                      <p className="text-gray-300 text-sm mt-1">{event.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dispute Pathways */}
        {simulationResults.disputePathways && (
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535]">
            <h3 className="text-xl font-bold text-[#f3cf1a] mb-4">Dispute Resolution Pathways</h3>
            <div className="grid grid-cols-1 gap-4">
              {simulationResults.disputePathways.map((pathway, index) => (
                <div key={index} className="bg-[#222222] p-4 rounded-lg border border-[#343535]">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-white">{pathway.type}</h4>
                    <span className="bg-[#f3cf1a]/20 text-[#f3cf1a] px-2 py-1 rounded text-sm">
                      {Math.round(pathway.successProbability * 100)}% success
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-[#f3cf1a] text-sm font-medium mb-2">Steps:</h5>
                      <ol className="text-gray-400 text-sm list-decimal list-inside space-y-1">
                        {pathway.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-green-400 text-sm font-medium mb-2">Pros:</h5>
                        <ul className="text-gray-400 text-sm list-disc list-inside space-y-1">
                          {pathway.pros.map((pro, i) => (
                            <li key={i}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-red-400 text-sm font-medium mb-2">Cons:</h5>
                        <ul className="text-gray-400 text-sm list-disc list-inside space-y-1">
                          {pathway.cons.map((con, i) => (
                            <li key={i}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Outcome Probabilities */}
        {simulationResults.outcomeProbabilities && (
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535]">
            <h3 className="text-xl font-bold text-[#f3cf1a] mb-4">Probability-Weighted Outcomes</h3>
            <div className="space-y-4">
              {simulationResults.outcomeProbabilities.map((outcome, index) => (
                <div key={index} className="bg-[#222222] p-4 rounded-lg border border-[#343535]">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-white">{outcome.scenario}</h4>
                    <span className="bg-[#f3cf1a]/20 text-[#f3cf1a] px-3 py-1 rounded-full text-sm font-bold">
                      {Math.round(outcome.probability * 100)}%
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{outcome.impact}</p>
                  {outcome.details && (
                    <p className="text-gray-400 text-sm mt-2">{outcome.details}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Risk Assessment */}
        {simulationResults.riskAssessment && (
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#343535]">
            <h3 className="text-xl font-bold text-[#f3cf1a] mb-4">Risk Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Overall Risk: {simulationResults.riskAssessment.overallRisk}</h4>
                <div className="bg-[#222222] p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">{simulationResults.riskAssessment.assessment}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Mitigation Strategies</h4>
                <ul className="space-y-2">
                  {simulationResults.riskAssessment.mitigationStrategies.map((strategy, index) => (
                    <li key={index} className="flex items-start gap-2 bg-[#222222] p-3 rounded-lg">
                      <span className="text-[#f3cf1a] text-sm">•</span>
                      <span className="text-gray-300 text-sm">{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#010101] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f3cf1a]/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#f3cf1a]/5 rounded-full blur-lg"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 relative">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white relative">
                Scenario Simulation Agent
                <div className="w-20 h-1 bg-[#f3cf1a] mt-3 rounded-full"></div>
              </h1>
              <p className="text-gray-400 mt-3 text-base sm:text-lg">AI-powered scenario modeling for contract negotiations and risk analysis</p>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 p-2 bg-[#1a1a1a] rounded-2xl border border-[#343535] shadow-xl">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                activeTab === tab.key 
                  ? 'bg-[#f3cf1a] text-[#010101] shadow-lg shadow-[#f3cf1a]/25' 
                  : 'bg-transparent text-gray-400 hover:text-white hover:bg-[#222222]'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-sm sm:text-base">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-[#222222] rounded-2xl p-6 sm:p-8 border border-[#343535] shadow-lg">
          <div className="flex items-center mb-6">
            <div className="w-3 h-8 bg-[#f3cf1a] rounded-full mr-4"></div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-2xl">🔀</span> 
                Scenario Simulation Engine
              </h2>
              <p className="text-gray-400 mt-2">Describe your scenario or drag & drop text to analyze stakeholders, timelines, and outcomes</p>
            </div>
          </div>

          {/* Input Area */}
          <div 
            className={`bg-[#1a1a1a] p-6 rounded-xl border-2 border-dashed transition-all duration-300 ${
              dragOver ? 'border-[#f3cf1a] bg-[#f3cf1a]/10' : 'border-[#343535] hover:border-[#f3cf1a]/30'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <textarea
              className="w-full h-48 p-4 rounded-xl bg-[#222222] border border-[#343535] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f3cf1a]/50 focus:border-[#f3cf1a]/50 transition-all duration-300 resize-none"
              placeholder="Describe your scenario here or drag & drop text file... Include parties involved, key events, and desired outcomes."
              value={inputScenario}
              onChange={e => setInputScenario(e.target.value)}
            />
            
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                className="flex-1 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#010101] px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                onClick={runSimulation}
                disabled={!inputScenario.trim() || loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                    Run Simulation
                  </>
                )}
              </button>
              
              <button
                className="bg-[#343535] hover:bg-[#404040] text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() => setInputScenario('')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 极 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Clear
              </button>
            </div>
          </div>

          {/* Structured Scenario Preview */}
          {structuredScenario && (
            <div className="mt-6 bg-[#1a1a1a] p-6 rounded-xl border border-[#343535]">
              <h3 className="text-lg font-bold text-[#f3cf1a] mb-4">Structured Scenario</h3>
              <div className="bg-[#222222] p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  {JSON.stringify(structuredScenario, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Simulation Results */}
          {renderResults()}

          {/* Loading State */}
          {loading && (
            <div className="mt-8 flex items-center justify-center">
              <div className="text-center">
                <svg className="animate-spin w-12 h-12 text-[#f3cf1a] mx-auto mb-4" fill="none" viewBox="0 极 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.极A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-400">AI is analyzing your scenario and generating comprehensive insights...</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#343535]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 极v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              <span className="text-sm font-medium">AI-powered by Gemini</span>
            </div>
            <div className="text-sm text-gray-500">
              Simulation results are AI-generated estimates for planning purposes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scenarios;