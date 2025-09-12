import React, { useState } from 'react';

const Negotiation = () => {
  const [activeTab, setActiveTab] = useState('clauses');
  
  return (
    <div className="min-h-screen bg-[#000000] text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f3cf1a]/10 rounded-full blur-xl"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white relative">
                Negotiation Strategist
                <span className="block w-16 h-1 bg-[#f3cf1a] mt-2 rounded-full"></span>
              </h1>
              <p className="text-[#e0e0e0] mt-3 text-base">Generate counter-proposals and negotiation strategies based on contract analysis</p>
            </div>
            <button className="px-6 py-3 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 w-full sm:w-auto">
              New Negotiation
            </button>
          </div>
        </div>
        
        
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Negotiable Clauses
              </h2>
              <div className="space-y-4 sm:space-y-5">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-4 sm:p-5 rounded-xl bg-[#2a2a2a] border border-[#343535] hover:border-[#f3cf1a]/30 transition-all duration-300 group">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-3">
                      <h3 className="font-medium text-white text-base sm:text-lg group-hover:text-[#f3cf1a] transition-colors duration-300">
                        {item === 1 ? 'Limitation of Liability' : item === 2 ? 'Payment Terms' : 'Service Level Agreement'}
                      </h3>
                      <span className={`text-xs sm:text-sm px-3 py-1.5 rounded-full self-start ${
                        item === 1 ? 'bg-red-500/20 text-red-300 border-red-500/30' : 
                        item === 2 ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 
                        'bg-green-500/20 text-green-300 border-green-500/30'
                      }`}>
                        {item === 1 ? 'High Priority' : item === 2 ? 'Medium Priority' : 'Low Priority'}
                      </span>
                    </div>
                    <p className="text-sm text-[#e0e0e0] leading-relaxed">
                      {item === 1 
                        ? 'Current cap at 12 months of fees is below industry standard. Recommend negotiating to 24 months.' 
                        : item === 2 
                          ? 'Net-30 payment terms are standard, but vendor is requesting Net-15. Recommend pushing back.' 
                          : 'SLA uptime of 99.5% is below market standard of 99.9% for this service type.'}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-2">
                      <span className="text-xs text-[#a0a0a0]">Section {item === 1 ? '8.2' : item === 2 ? '4.1' : '3.4'} of Master Service Agreement</span>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <button className="text-xs px-3 py-1.5 rounded-lg bg-[#f3cf1a]/10 text-[#f3cf1a] hover:bg-[#f3cf1a]/20 transition-all">
                          View Redline
                        </button>
                        <button className="text-xs px-3 py-1.5 rounded-lg bg-[#f3cf1a]/10 text-[#f3cf1a] hover:bg-[#f3cf1a]/20 transition-all">
                          Talking Points
                        </button>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                Negotiation Leverage
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#2a2a2a] border border-[#343535] hover:border-[#f3cf1a]/30 transition-all duration-300 group">
                  <h3 className="font-medium text-white text-base group-hover:text-[#f3cf1a] transition-colors duration-300">Market Position</h3>
                  <div className="flex items-center mt-3">
                    <div className="w-full bg-[#343535] rounded-full h-2.5">
                      <div className="bg-[#f3cf1a] h-2.5 rounded-full transition-all duration-500" style={{ width: '70%' }}></div>
                    </div>
                    <span className="ml-3 text-sm text-[#f3cf1a] font-medium">Strong</span>
                  </div>
                  <p className="text-xs mt-2 text-[#a0a0a0]">Multiple alternative vendors available</p>
                </div>
                <div className="p-4 rounded-xl bg-[#2a2a2a] border border-[#343535] hover:border-[#f3cf1a]/30 transition-all duration-300 group">
                  <h3 className="font-medium text-white text-base group-hover:text-[#f3cf1a] transition-colors duration-300">Time Pressure</h3>
                  <div className="flex items-center mt-3">
                    <div className="w-full bg-[#343535] rounded-full h-2.5">
                      <div className="bg-[#f3cf1a] h-2.5 rounded-full transition-all duration-500" style={{ width: '30%' }}></div>
                    </div>
                    <span className="ml-3 text-sm text-[#f3cf1a] font-medium">Weak</span>
                  </div>
                  <p className="text-xs mt-2 text-[#a0a0a0]">Current contract expires in 15 days</p>
                </div>
                <div className="p-4 rounded-xl bg-[#2a2a2a] border border-[#343535] hover:border-[#f3cf1a]/30 transition-all duration-300 group">
                  <h3 className="font-medium text-white text-base group-hover:text-[#f3cf1a] transition-colors duration-300">Relationship Value</h3>
                  <div className="flex items-center mt-3">
                    <div className="w-full bg-[#343535] rounded-full h-2.5">
                      <div className="bg-[#f3cf1a] h-2.5 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
                    </div>
                    <span className="ml-3 text-sm text-[#f3cf1a] font-medium">Medium</span>
                  </div>
                  <p className="text-xs mt-2 text-[#a0a0a0]">2-year relationship with moderate spend</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                Negotiation Strategy
              </h2>
              <div className="p-4 rounded-xl bg-[#2a2a2a] border border-[#343535] hover:border-[#f3cf1a]/30 transition-all duration-300 group">
                <h3 className="font-medium text-white text-base group-hover:text-[#f3cf1a] transition-colors duration-300">Recommended Approach</h3>
                <p className="text-sm mt-2 text-[#e0e0e0] leading-relaxed">Focus on value exchange rather than direct pushback. Offer longer contract term in exchange for improved liability cap and SLAs.</p>
                <button className="text-sm mt-4 px-4 py-2 rounded-lg bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium transition-all duration-300 w-full">
                  Generate Email Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Negotiation;