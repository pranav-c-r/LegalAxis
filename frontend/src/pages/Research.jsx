import React from 'react';

const Research = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#A9CEF4]">Legal Research & Citation</h1>
        <button className="btn-primary">New Research</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Recent Citations</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30 hover:border-[#A9CEF4]/50 transition-all">
                <div className="flex justify-between">
                  <h3 className="font-medium text-[#A9CEF4]">Smith v. Johnson (2022)</h3>
                  <span className="text-sm px-2 py-1 rounded-full bg-[#7EA0B7]/20 text-[#A9CEF4]">
                    98% Confidence
                  </span>
                </div>
                <p className="text-sm mt-2 text-[#7EA0B7]">Precedent for contract termination clauses in SaaS agreements</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-[#7EA0B7]/70">Referenced in: Master Service Agreement</span>
                  <button className="text-xs px-3 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4] hover:bg-[#A9CEF4]/20 transition-all">
                    View Full Case
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Research Sources</h2>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30 flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#A9CEF4]/20 flex items-center justify-center text-[#A9CEF4]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-[#A9CEF4]">Caselaw Access Project</h3>
                <p className="text-xs text-[#7EA0B7]">40M+ court decisions</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30 flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#A9CEF4]/20 flex items-center justify-center text-[#A9CEF4]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-[#A9CEF4]">Legal Journals</h3>
                <p className="text-xs text-[#7EA0B7]">Academic research & analysis</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30 flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#A9CEF4]/20 flex items-center justify-center text-[#A9CEF4]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-[#A9CEF4]">Regulatory Databases</h3>
                <p className="text-xs text-[#7EA0B7]">Latest compliance requirements</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;