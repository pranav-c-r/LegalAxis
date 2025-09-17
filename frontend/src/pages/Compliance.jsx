import React, { useState } from 'react';

const Compliance = () => {
  const [activeTab, setActiveTab] = useState('alerts');
  
  return (
    <div className="min-h-screen bg-[#000000] text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f3cf1a]/10 rounded-full blur-xl"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white relative">
                Compliance Guardian
                <span className="block w-16 h-1 bg-[#f3cf1a] mt-2 rounded-full"></span>
              </h1>
              <p className="text-[#e0e0e0] mt-3 text-base">Monitor regulatory changes and ensure document compliance</p>
            </div>
            <button 
              className="px-6 py-3 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 w-full sm:w-auto"
              style={{ 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: 'none'
              }}
            >
              Scan New Contract
            </button>
          </div>
        </div>
        
        
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          <div className="xl:col-span-2">
            <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-2xl p-5 sm:p-6 ring-1 ring-white/5 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                Compliance Alerts
              </h2>
              <div className="space-y-4 sm:space-y-5">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-4 sm:p-5 rounded-xl bg-[#232323] ring-1 ring-white/5 hover:ring-[#f3cf1a]/30 transition-all duration-300 group">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                      <h3 className="font-medium text-white text-base sm:text-lg group-hover:text-[#f3cf1a] transition-colors duration-300">GDPR Non-Compliance Risk</h3>
                      <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-red-500/20 text-red-300 self-start">
                        High Priority
                      </span>
                    </div>
                    <p className="text-sm mt-2 text-[#e0e0e0] leading-relaxed">Data processing clause in SaaS Agreement does not meet current GDPR requirements</p>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-2">
                      <span className="text-xs text-[#a0a0a0]">Found in: Section 8.3 of Master Service Agreement</span>
                      <button 
                        className="text-xs px-3 py-1.5 rounded-lg bg-[#f3cf1a]/10 text-[#f3cf1a] hover:bg-[#f3cf1a]/20 transition-all self-start"
                        style={{ 
                          borderRadius: '6px',
                          border: 'none'
                        }}
                      >
                        View Suggested Fix
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-2xl p-5 sm:p-6 ring-1 ring-white/5 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                Compliance Score
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
                      strokeDasharray="75, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl sm:text-4xl font-bold text-[#f3cf1a]">75%</span>
                    <span className="text-sm text-[#a0a0a0]">Compliant</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-[#232323] ring-1 ring-white/5">
                  <p className="text-sm text-[#a0a0a0]">Documents</p>
                  <p className="text-xl font-bold text-white">42</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-[#232323] ring-1 ring-white/5">
                  <p className="text-sm text-[#a0a0a0]">Issues</p>
                  <p className="text-xl font-bold text-white">8</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-2xl p-5 sm:p-6 ring-1 ring-white/5 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Regulation Updates
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#232323] ring-1 ring-white/5 hover:ring-[#f3cf1a]/30 transition-all duration-300 group">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-medium text-white text-base group-hover:text-[#f3cf1a] transition-colors duration-300">CCPA Amendment</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#f3cf1a]/20 text-[#f3cf1a] flex-shrink-0">New</span>
                  </div>
                  <p className="text-sm mt-2 text-[#e0e0e0]">Effective Jan 1, 2023</p>
                  <div className="mt-3 flex items-center text-xs text-[#a0a0a0]">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 01118 0z"></path>
                    </svg>
                    Posted 2 days ago
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#232323] ring-1 ring-white/5 hover:ring-[#f3cf1a]/30 transition-all duration-300 group">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-medium text-white text-base group-hover:text-[#f3cf1a] transition-colors duration-300">EU AI Act</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#f3cf1a]/20 text-[#f3cf1a] flex-shrink-0">Pending</span>
                  </div>
                  <p className="text-sm mt-2 text-[#e0e0e0]">Expected Q3 2023</p>
                  <div className="mt-3 flex items-center text-xs text-[#a0a0a0]">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 01118 0z"></path>
                    </svg>
                    Posted 1 week ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
