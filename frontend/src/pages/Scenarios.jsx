import React, { useState } from 'react';

const Scenarios = () => {
  const [activeTab, setActiveTab] = useState('scenarios');
  const [selectedScenario, setSelectedScenario] = useState(0);
  
  const scenarios = [
    { 
      title: 'Early Termination', 
      description: 'Impact of terminating the SaaS agreement after 6 months',
      financialImpact: '$24,500',
      legalRisk: 'Medium',
      probability: '15%',
      status: 'completed'
    },
    { 
      title: 'Breach of SLA', 
      description: 'Financial impact if vendor fails to meet 99.5% uptime guarantee',
      financialImpact: '$12,800',
      legalRisk: 'Low',
      probability: '35%',
      status: 'completed'
    },
    { 
      title: 'Delayed Payment', 
      description: 'Consequences of missing the quarterly payment deadline by 15 days',
      financialImpact: '$8,200',
      legalRisk: 'High',
      probability: '10%',
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f3cf1a]/10 rounded-full blur-xl"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white relative">
                Scenario Simulation
                <span className="block w-16 h-1 bg-[#f3cf1a] mt-2 rounded-full"></span>
              </h1>
              <p className="text-[#e0e0e0] mt-3 text-base">Model different contract scenarios and visualize potential outcomes</p>
            </div>
            <button className="px-6 py-3 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 w-full sm:w-auto">
              New Simulation
            </button>
          </div>
        </div>
        
        
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
                What-If Scenarios
              </h2>
              <div className="space-y-4 sm:space-y-5">
                {scenarios.map((scenario, index) => (
                  <div 
                    key={index} 
                    className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer group ${
                      selectedScenario === index 
                        ? 'bg-[#2a2a2a] border-[#f3cf1a] shadow-lg shadow-[#f3cf1a]/10' 
                        : 'bg-[#2a2a2a] border-[#343535] hover:border-[#f3cf1a]/30'
                    }`}
                    onClick={() => setSelectedScenario(index)}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-3">
                      <h3 className="font-medium text-white text-base sm:text-lg group-hover:text-[#f3cf1a] transition-colors duration-300">
                        {scenario.title}
                      </h3>
                      <button className="text-xs sm:text-sm px-3 py-1.5 rounded-lg bg-[#f3cf1a]/10 text-[#f3cf1a] hover:bg-[#f3cf1a]/20 transition-all self-start">
                        Run Simulation
                      </button>
                    </div>
                    <p className="text-sm text-[#e0e0e0] leading-relaxed">{scenario.description}</p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-[#343535] border border-[#343535] group-hover:border-[#f3cf1a]/20 transition-all duration-300">
                        <span className="text-xs text-[#a0a0a0]">Financial Impact</span>
                        <p className="text-lg font-semibold text-[#f3cf1a]">{scenario.financialImpact}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#343535] border border-[#343535] group-hover:border-[#f3cf1a]/20 transition-all duration-300">
                        <span className="text-xs text-[#a0a0a0]">Legal Risk</span>
                        <p className={`text-lg font-semibold ${
                          scenario.legalRisk === 'High' ? 'text-red-400' : 
                          scenario.legalRisk === 'Medium' ? 'text-yellow-400' : 
                          'text-green-400'
                        }`}>
                          {scenario.legalRisk}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#343535] border border-[#343535] group-hover:border-[#f3cf1a]/20 transition-all duration-300">
                        <span className="text-xs text-[#a0a0a0]">Probability</span>
                        <p className="text-lg font-semibold text-white">{scenario.probability}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Simulation Results
              </h2>
              <div className="p-4 sm:p-5 rounded-xl bg-[#2a2a2a] border border-[#343535]">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                  <h3 className="font-medium text-white text-base">{scenarios[selectedScenario].title}</h3>
                  <span className="text-xs px-3 py-1.5 rounded-full bg-[#f3cf1a]/20 text-[#f3cf1a] self-start">
                    {scenarios[selectedScenario].status}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-[#a0a0a0] mb-2">Financial Projection</h4>
                    <div className="h-24 bg-[#343535] rounded-lg border border-[#343535] p-3 relative overflow-hidden">
                      {/* Enhanced chart visualization */}
                      <div className="absolute bottom-3 left-3 right-3 h-full flex items-end gap-2">
                        <div className="flex-1 h-[30%] bg-[#f3cf1a]/30 rounded-t transition-all duration-500 hover:bg-[#f3cf1a]/50"></div>
                        <div className="flex-1 h-[80%] bg-[#f3cf1a]/40 rounded-t transition-all duration-500 hover:bg-[#f3cf1a]/60"></div>
                        <div className="flex-1 h-[100%] bg-[#f3cf1a] rounded-t transition-all duration-500 hover:bg-[#f3cf1a]/90"></div>
                        <div className="flex-1 h-[60%] bg-[#f3cf1a]/50 rounded-t transition-all duration-500 hover:bg-[#f3cf1a]/70"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-[#343535] border border-[#343535]">
                      <span className="text-xs text-[#a0a0a0]">Termination Fee</span>
                      <p className="text-lg font-semibold text-[#f3cf1a]">$15,000</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#343535] border border-[#343535]">
                      <span className="text-xs text-[#a0a0a0]">Lost Investment</span>
                      <p className="text-lg font-semibold text-[#f3cf1a]">$9,500</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#a0a0a0] mb-2">Recommendation</h4>
                    <p className="text-sm text-[#e0e0e0] leading-relaxed">
                      Avoid early termination. Consider renegotiating terms instead of terminating to save {scenarios[selectedScenario].financialImpact} in fees and lost investment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Create Custom Scenario
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#a0a0a0] block mb-2">Scenario Type</label>
                  <select className="w-full p-3 rounded-xl bg-[#2a2a2a] border border-[#343535] text-white focus:border-[#f3cf1a] focus:outline-none transition-all duration-300">
                    <option>Contract Breach</option>
                    <option>Payment Issue</option>
                    <option>Termination</option>
                    <option>Dispute Resolution</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-[#a0a0a0] block mb-2">Contract</label>
                  <select className="w-full p-3 rounded-xl bg-[#2a2a2a] border border-[#343535] text-white focus:border-[#f3cf1a] focus:outline-none transition-all duration-300">
                    <option>Master Service Agreement</option>
                    <option>SaaS Subscription</option>
                    <option>NDA</option>
                  </select>
                </div>
                <button className="w-full mt-2 px-4 py-3 rounded-xl bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium transition-all duration-300">
                  Create Scenario
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scenarios;