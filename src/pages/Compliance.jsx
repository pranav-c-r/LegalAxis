import React from 'react';

const Compliance = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#A9CEF4]">Compliance Guardian</h1>
        <button className="btn-primary w-full sm:w-auto">Scan New Contract</button>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-2">
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#A9CEF4]">Compliance Alerts</h2>
            <div className="space-y-3 sm:space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-3 sm:p-4 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30 hover:border-[#A9CEF4]/50 transition-all">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                    <h3 className="font-medium text-[#A9CEF4] text-sm sm:text-base">GDPR Non-Compliance Risk</h3>
                    <span className="text-xs sm:text-sm px-2 py-1 rounded-full bg-[#7EA0B7]/20 text-[#A9CEF4] self-start">
                      High Priority
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm mt-2 text-[#7EA0B7] leading-relaxed">Data processing clause in SaaS Agreement does not meet current GDPR requirements</p>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2">
                    <span className="text-xs text-[#7EA0B7]/70">Found in: Section 8.3 of Master Service Agreement</span>
                    <button className="text-xs px-3 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4] hover:bg-[#A9CEF4]/20 transition-all self-start">
                      View Suggested Fix
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#A9CEF4]">Compliance Score</h2>
            <div className="flex items-center justify-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#7EA0B7"
                    strokeWidth="2"
                    strokeDasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#A9CEF4"
                    strokeWidth="2"
                    strokeDasharray="75, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-[#A9CEF4]">75%</span>
                  <span className="text-xs text-[#7EA0B7]">Compliant</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#A9CEF4]">Regulation Updates</h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-medium text-[#A9CEF4] text-sm">CCPA Amendment</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4] flex-shrink-0">New</span>
                </div>
                <p className="text-xs mt-1 text-[#7EA0B7]">Effective Jan 1, 2023</p>
              </div>
              <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-medium text-[#A9CEF4] text-sm">EU AI Act</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4] flex-shrink-0">Pending</span>
                </div>
                <p className="text-xs mt-1 text-[#7EA0B7]">Expected Q3 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;