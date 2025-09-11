import React from 'react';

const Negotiation = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-iconbg">Negotiation Strategist</h1>
        <button className="btn-primary w-full sm:w-auto">New Negotiation</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="card lg:col-span-2">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-iconbg">Negotiable Clauses</h2>
          <div className="space-y-3 sm:space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-3 sm:p-4 rounded-lg bg-greybg border border-iconbg/30 hover:border-iconbg/50 transition-all">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <h3 className="font-medium text-iconbg text-sm sm:text-base">
                    {item === 1 ? 'Limitation of Liability' : item === 2 ? 'Payment Terms' : 'Service Level Agreement'}
                  </h3>
                  <span className="text-xs sm:text-sm px-2 py-1 rounded-full bg-iconbg/20 text-iconbg self-start">
                    {item === 1 ? 'High Priority' : item === 2 ? 'Medium Priority' : 'Low Priority'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm mt-2 text-textcolor/70 leading-relaxed">
                  {item === 1 
                    ? 'Current cap at 12 months of fees is below industry standard. Recommend negotiating to 24 months.' 
                    : item === 2 
                      ? 'Net-30 payment terms are standard, but vendor is requesting Net-15. Recommend pushing back.' 
                      : 'SLA uptime of 99.5% is below market standard of 99.9% for this service type.'}
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2">
                  <span className="text-xs text-textcolor/60">Section {item === 1 ? '8.2' : item === 2 ? '4.1' : '3.4'} of Master Service Agreement</span>
                  <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                    <button className="text-xs px-3 py-1 rounded-full bg-iconbg/20 text-iconbg hover:bg-iconbg/30 transition-all">
                      View Redline
                    </button>
                    <button className="text-xs px-3 py-1 rounded-full bg-iconbg/20 text-iconbg hover:bg-iconbg/30 transition-all">
                      Talking Points
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-iconbg">Negotiation Leverage</h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-greybg border border-iconbg/30 hover:border-iconbg/50 transition-all">
                <h3 className="font-medium text-iconbg text-sm">Market Position</h3>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-boxbg rounded-full h-2.5">
                    <div className="bg-iconbg h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <span className="ml-2 text-sm text-iconbg">Strong</span>
                </div>
                <p className="text-xs mt-2 text-textcolor/70">Multiple alternative vendors available</p>
              </div>
              <div className="p-3 rounded-lg bg-greybg border border-iconbg/30 hover:border-iconbg/50 transition-all">
                <h3 className="font-medium text-iconbg text-sm">Time Pressure</h3>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-boxbg rounded-full h-2.5">
                    <div className="bg-iconbg h-2.5 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="ml-2 text-sm text-iconbg">Weak</span>
                </div>
                <p className="text-xs mt-2 text-textcolor/70">Current contract expires in 15 days</p>
              </div>
              <div className="p-3 rounded-lg bg-greybg border border-iconbg/30 hover:border-iconbg/50 transition-all">
                <h3 className="font-medium text-iconbg text-sm">Relationship Value</h3>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-boxbg rounded-full h-2.5">
                    <div className="bg-iconbg h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="ml-2 text-sm text-iconbg">Medium</span>
                </div>
                <p className="text-xs mt-2 text-textcolor/70">2-year relationship with moderate spend</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-iconbg">Negotiation Strategy</h2>
            <div className="p-3 rounded-lg bg-greybg border border-iconbg/30 hover:border-iconbg/50 transition-all">
              <h3 className="font-medium text-iconbg text-sm">Recommended Approach</h3>
              <p className="text-xs sm:text-sm mt-2 text-textcolor/70 leading-relaxed">Focus on value exchange rather than direct pushback. Offer longer contract term in exchange for improved liability cap and SLAs.</p>
              <button className="text-xs mt-3 px-3 py-1 rounded-full bg-iconbg/20 text-iconbg hover:bg-iconbg/30 transition-all w-full">
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