import React, { useState } from 'react';

const Risk = () => {
  const [activeTab, setActiveTab] = useState('heatmap');
  
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
              className="px-6 py-3 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 w-full sm:w-auto"
              style={{
                borderRadius: '8px',
                backgroundColor: '#f3cf1a',
                color: '#1a1a1a',
                border: '2px solid #f3cf1a'
              }}
            >
              Analyze New Contract
            </button>
          </div>
        </div>
        
        
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          <div className="xl:col-span-2">
            <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Risk Heatmap
              </h2>
              
              <div className="bg-[#2a2a2a] rounded-xl p-4 sm:p-5 border border-[#343535] mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                  <h3 className="font-medium text-white text-base sm:text-lg">Master Service Agreement</h3>
                  <span className="text-sm px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 self-start sm:self-center">
                    Overall Risk: Medium
                  </span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { section: 'Termination Clause (§12)', risk: 'High', color: 'bg-red-500/20 border-red-500/30 text-red-300' },
                    { section: 'Limitation of Liability (§8)', risk: 'Medium', color: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300' },
                    { section: 'Payment Terms (§4)', risk: 'Low', color: 'bg-green-500/20 border-green-500/30 text-green-300' },
                    { section: 'IP Rights (§6)', risk: 'Medium', color: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300' },
                    { section: 'Confidentiality (§10)', risk: 'Low', color: 'bg-green-500/20 border-green-500/30 text-green-300' },
                  ].map((item, index) => (
                    <div key={index} className={`p-3 rounded-lg ${item.color} border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 group hover:scale-[1.02] transition-all duration-300`}>
                      <span className="text-white text-sm truncate group-hover:text-[#f3cf1a] transition-colors duration-300">{item.section}</span>
                      <span className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-[#343535] text-white">
                        {item.risk} Risk
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-[#a0a0a0]">High Risk</span>
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
          </div>
          
          <div className="space-y-6 sm:space-y-8">
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
                      strokeDasharray="65, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl sm:text-4xl font-bold text-[#f3cf1a]">65%</span>
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
                  <p className="text-xl font-bold text-white">8</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                Unfair Clauses
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#2a2a2a] border border-red-500/30 hover:border-red-500/50 transition-all duration-300 group">
                  <h3 className="font-medium text-white text-base group-hover:text-red-300 transition-colors duration-300">One-sided Termination</h3>
                  <p className="text-sm mt-2 text-[#e0e0e0] leading-relaxed">Allows vendor to terminate without cause with only 15 days notice</p>
                  <button 
                    className="text-xs mt-3 px-3 py-1.5 rounded-lg bg-[#f3cf1a]/10 text-[#f3cf1a] hover:bg-[#f3cf1a]/20 transition-all"
                    style={{
                      borderRadius: '8px',
                      backgroundColor: 'rgba(243, 207, 26, 0.1)',
                      color: '#f3cf1a',
                      border: '1px solid rgba(243, 207, 26, 0.2)'
                    }}
                  >
                    View Suggested Alternative
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-[#2a2a2a] border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 group">
                  <h3 className="font-medium text-white text-base group-hover:text-yellow-300 transition-colors duration-300">Unbalanced Indemnification</h3>
                  <p className="text-sm mt-2 text-[#e0e0e0] leading-relaxed">Customer indemnifies vendor broadly while vendor's obligations are limited</p>
                  <button 
                    className="text-xs mt-3 px-3 py-1.5 rounded-lg bg-[#f3cf1a]/10 text-[#f3cf1a] hover:bg-[#f3cf1a]/20 transition-all"
                    style={{
                      borderRadius: '8px',
                      backgroundColor: 'rgba(243, 207, 26, 0.1)',
                      color: '#f3cf1a',
                      border: '1px solid rgba(243, 207, 26, 0.2)'
                    }}
                  >
                    View Suggested Alternative
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Risk;