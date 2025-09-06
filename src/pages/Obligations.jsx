import React from 'react';

const Obligations = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#A9CEF4]">Obligation & Deadline Tracker</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button className="btn-primary w-full sm:w-auto">Add Obligation</button>
          <button className="px-3 sm:px-4 py-2 rounded-lg bg-[#7EA0B7]/20 text-[#A9CEF4] hover:bg-[#7EA0B7]/30 transition-all flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-2">
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#A9CEF4]">Upcoming Deadlines</h2>
            <div className="space-y-3 sm:space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-3 sm:p-4 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30 hover:border-[#A9CEF4]/50 transition-all">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <h3 className="font-medium text-[#A9CEF4] text-sm sm:text-base">Quarterly Payment Due</h3>
                    <span className="text-xs sm:text-sm px-2 py-1 rounded-full bg-[#7EA0B7]/20 text-[#A9CEF4] self-start">
                      {item === 1 ? '3 days left' : item === 2 ? '2 weeks left' : '1 month left'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm mt-2 text-[#7EA0B7] leading-relaxed">$25,000 payment due to Vendor Inc. as per Section 4.2 of the agreement</p>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2">
                    <span className="text-xs text-[#7EA0B7]/70">From: SaaS Subscription Agreement</span>
                    <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                      <button className="text-xs px-3 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4] hover:bg-[#A9CEF4]/20 transition-all">
                        Add to Calendar
                      </button>
                      <button className="text-xs px-3 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4] hover:bg-[#A9CEF4]/20 transition-all">
                        Set Alert
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#A9CEF4]">Obligation Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
                <span className="text-[#7EA0B7]">Due This Week</span>
                <span className="text-xl font-semibold text-[#A9CEF4]">3</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
                <span className="text-[#7EA0B7]">Due This Month</span>
                <span className="text-xl font-semibold text-[#A9CEF4]">8</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
                <span className="text-[#7EA0B7]">Total Active</span>
                <span className="text-xl font-semibold text-[#A9CEF4]">24</span>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Obligation Types</h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30 flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#A9CEF4]/20 flex items-center justify-center text-[#A9CEF4]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-[#A9CEF4]">Payments</h3>
                  <p className="text-xs text-[#7EA0B7]">12 obligations</p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30 flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#A9CEF4]/20 flex items-center justify-center text-[#A9CEF4]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-[#A9CEF4]">Filings</h3>
                  <p className="text-xs text-[#7EA0B7]">8 obligations</p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30 flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#A9CEF4]/20 flex items-center justify-center text-[#A9CEF4]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-[#A9CEF4]">Renewals</h3>
                  <p className="text-xs text-[#7EA0B7]">4 obligations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Obligations;