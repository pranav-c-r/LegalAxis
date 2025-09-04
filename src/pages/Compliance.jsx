import React from 'react';

const Compliance = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#A9CEF4]">Compliance Guardian</h1>
        <button className="btn-primary">Scan New Contract</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Compliance Alerts</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30 hover:border-[#A9CEF4]/50 transition-all">
                <div className="flex justify-between">
                  <h3 className="font-medium text-[#A9CEF4]">GDPR Non-Compliance Risk</h3>
                  <span className="text-sm px-2 py-1 rounded-full bg-[#7EA0B7]/20 text-[#A9CEF4]">
                    High Priority
                  </span>
                </div>
                <p className="text-sm mt-2 text-[#7EA0B7]">Data processing clause in SaaS Agreement does not meet current GDPR requirements</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-[#7EA0B7]/70">Found in: Section 8.3 of Master Service Agreement</span>
                  <button className="text-xs px-3 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4] hover:bg-[#A9CEF4]/20 transition-all">
                    View Suggested Fix
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Compliance Score</h2>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
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
                  <span className="text-3xl font-bold text-[#A9CEF4]">75%</span>
                  <span className="text-xs text-[#7EA0B7]">Compliant</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Regulation Updates</h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-[#A9CEF4]">CCPA Amendment</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4]">New</span>
                </div>
                <p className="text-xs mt-1 text-[#7EA0B7]">Effective Jan 1, 2023</p>
              </div>
              <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-[#A9CEF4]">EU AI Act</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4]">Pending</span>
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