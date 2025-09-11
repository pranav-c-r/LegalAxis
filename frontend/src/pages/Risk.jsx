import React from 'react';

const Risk = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-iconbg">Risk & Fairness Analyzer</h1>
        <button className="btn-primary w-full sm:w-auto">Analyze New Contract</button>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-2">
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-iconbg">Risk Heatmap</h2>
            <div className="p-3 sm:p-4 rounded-lg bg-greybg border border-iconbg/30">
              <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <h3 className="font-medium text-iconbg text-sm sm:text-base">Master Service Agreement</h3>
                <span className="text-xs sm:text-sm px-2 py-1 rounded-full bg-iconbg/20 text-iconbg self-start">
                  Overall Risk: Medium
                </span>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                {[
                  { section: 'Termination Clause (§12)', risk: 'High', color: 'bg-red-500/20 border-red-500/30' },
                  { section: 'Limitation of Liability (§8)', risk: 'Medium', color: 'bg-yellow-500/20 border-yellow-500/30' },
                  { section: 'Payment Terms (§4)', risk: 'Low', color: 'bg-green-500/20 border-green-500/30' },
                  { section: 'IP Rights (§6)', risk: 'Medium', color: 'bg-yellow-500/20 border-yellow-500/30' },
                  { section: 'Confidentiality (§10)', risk: 'Low', color: 'bg-green-500/20 border-green-500/30' },
                ].map((item, index) => (
                  <div key={index} className={`p-2 sm:p-3 rounded-lg ${item.color} border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2`}>
                    <span className="text-textcolor text-sm truncate">{item.section}</span>
                    <span className="text-xs sm:text-sm px-2 py-1 rounded-full bg-boxbg text-textcolor self-start sm:self-center">
                      {item.risk} Risk
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-iconbg">Fairness Score</h2>
            <div className="flex items-center justify-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#343535"
                    strokeWidth="2"
                    strokeDasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f3cf1a"
                    strokeWidth="2"
                    strokeDasharray="65, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-iconbg">65%</span>
                  <span className="text-xs text-textcolor/70">Fair</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-iconbg">Unfair Clauses</h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-greybg border border-red-500/30 hover:border-red-500/50 transition-all">
                <h3 className="font-medium text-iconbg text-sm">One-sided Termination</h3>
                <p className="text-xs mt-1 text-textcolor/70 leading-relaxed">Allows vendor to terminate without cause with only 15 days notice</p>
                <button className="text-xs mt-2 px-3 py-1 rounded-full bg-iconbg/20 text-iconbg hover:bg-iconbg/30 transition-all">
                  View Suggested Alternative
                </button>
              </div>
              <div className="p-3 rounded-lg bg-greybg border border-yellow-500/30 hover:border-yellow-500/50 transition-all">
                <h3 className="font-medium text-iconbg text-sm">Unbalanced Indemnification</h3>
                <p className="text-xs mt-1 text-textcolor/70 leading-relaxed">Customer indemnifies vendor broadly while vendor's obligations are limited</p>
                <button className="text-xs mt-2 px-3 py-1 rounded-full bg-iconbg/20 text-iconbg hover:bg-iconbg/30 transition-all">
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