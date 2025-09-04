import React from 'react';

const Negotiation = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#A9CEF4]">Negotiation Strategist</h1>
        <button className="btn-primary">New Negotiation</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Negotiable Clauses</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30 hover:border-[#A9CEF4]/50 transition-all">
                <div className="flex justify-between">
                  <h3 className="font-medium text-[#A9CEF4]">
                    {item === 1 ? 'Limitation of Liability' : item === 2 ? 'Payment Terms' : 'Service Level Agreement'}
                  </h3>
                  <span className="text-sm px-2 py-1 rounded-full bg-[#7EA0B7]/20 text-[#A9CEF4]">
                    {item === 1 ? 'High Priority' : item === 2 ? 'Medium Priority' : 'Low Priority'}
                  </span>
                </div>
                <p className="text-sm mt-2 text-[#7EA0B7]">
                  {item === 1 
                    ? 'Current cap at 12 months of fees is below industry standard. Recommend negotiating to 24 months.' 
                    : item === 2 
                      ? 'Net-30 payment terms are standard, but vendor is requesting Net-15. Recommend pushing back.' 
                      : 'SLA uptime of 99.5% is below market standard of 99.9% for this service type.'}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-[#7EA0B7]/70">Section {item === 1 ? '8.2' : item === 2 ? '4.1' : '3.4'} of Master Service Agreement</span>
                  <div className="flex space-x-2">
                    <button className="text-xs px-3 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4] hover:bg-[#A9CEF4]/20 transition-all">
                      View Redline
                    </button>
                    <button className="text-xs px-3 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4] hover:bg-[#A9CEF4]/20 transition-all">
                      Talking Points
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Negotiation Leverage</h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
                <h3 className="font-medium text-[#A9CEF4]">Market Position</h3>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-[#7EA0B7]/20 rounded-full h-2.5">
                    <div className="bg-[#A9CEF4] h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <span className="ml-2 text-sm text-[#A9CEF4]">Strong</span>
                </div>
                <p className="text-xs mt-2 text-[#7EA0B7]">Multiple alternative vendors available</p>
              </div>
              <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
                <h3 className="font-medium text-[#A9CEF4]">Time Pressure</h3>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-[#7EA0B7]/20 rounded-full h-2.5">
                    <div className="bg-[#A9CEF4] h-2.5 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="ml-2 text-sm text-[#A9CEF4]">Weak</span>
                </div>
                <p className="text-xs mt-2 text-[#7EA0B7]">Current contract expires in 15 days</p>
              </div>
              <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
                <h3 className="font-medium text-[#A9CEF4]">Relationship Value</h3>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-[#7EA0B7]/20 rounded-full h-2.5">
                    <div className="bg-[#A9CEF4] h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="ml-2 text-sm text-[#A9CEF4]">Medium</span>
                </div>
                <p className="text-xs mt-2 text-[#7EA0B7]">2-year relationship with moderate spend</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Negotiation Strategy</h2>
            <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
              <h3 className="font-medium text-[#A9CEF4]">Recommended Approach</h3>
              <p className="text-sm mt-2 text-[#7EA0B7]">Focus on value exchange rather than direct pushback. Offer longer contract term in exchange for improved liability cap and SLAs.</p>
              <button className="text-xs mt-3 px-3 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4] hover:bg-[#A9CEF4]/20 transition-all w-full">
                Generate Email Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Negotiation;