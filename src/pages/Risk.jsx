import React from 'react';

const Risk = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#A9CEF4]">Risk & Fairness Analyzer</h1>
        <button className="btn-primary">Analyze New Contract</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Risk Heatmap</h2>
          <div className="p-4 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="font-medium text-[#A9CEF4]">Master Service Agreement</h3>
              <span className="text-sm px-2 py-1 rounded-full bg-[#7EA0B7]/20 text-[#A9CEF4]">
                Overall Risk: Medium
              </span>
            </div>
            
            <div className="space-y-3">
              {[
                { section: 'Termination Clause (§12)', risk: 'High', color: 'bg-red-500/20 border-red-500/30' },
                { section: 'Limitation of Liability (§8)', risk: 'Medium', color: 'bg-yellow-500/20 border-yellow-500/30' },
                { section: 'Payment Terms (§4)', risk: 'Low', color: 'bg-green-500/20 border-green-500/30' },
                { section: 'IP Rights (§6)', risk: 'Medium', color: 'bg-yellow-500/20 border-yellow-500/30' },
                { section: 'Confidentiality (§10)', risk: 'Low', color: 'bg-green-500/20 border-green-500/30' },
              ].map((item, index) => (
                <div key={index} className={`p-3 rounded-lg ${item.color} border flex justify-between items-center`}>
                  <span className="text-[#A9CEF4]">{item.section}</span>
                  <span className="text-sm px-2 py-1 rounded-full bg-[#36494E]/50 text-[#A9CEF4]">
                    {item.risk} Risk
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Fairness Score</h2>
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
                    strokeDasharray="65, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold text-[#A9CEF4]">65%</span>
                  <span className="text-xs text-[#7EA0B7]">Fair</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Unfair Clauses</h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-[#36494E]/80 border border-red-500/30">
                <h3 className="font-medium text-[#A9CEF4]">One-sided Termination</h3>
                <p className="text-xs mt-1 text-[#7EA0B7]">Allows vendor to terminate without cause with only 15 days notice</p>
                <button className="text-xs mt-2 px-3 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4] hover:bg-[#A9CEF4]/20 transition-all">
                  View Suggested Alternative
                </button>
              </div>
              <div className="p-3 rounded-lg bg-[#36494E]/80 border border-yellow-500/30">
                <h3 className="font-medium text-[#A9CEF4]">Unbalanced Indemnification</h3>
                <p className="text-xs mt-1 text-[#7EA0B7]">Customer indemnifies vendor broadly while vendor's obligations are limited</p>
                <button className="text-xs mt-2 px-3 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4] hover:bg-[#A9CEF4]/20 transition-all">
                  View Suggested Alternative
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Risk;