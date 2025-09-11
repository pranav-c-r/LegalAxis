import React from 'react';

const Scenarios = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-iconbg">Scenario Simulation</h1>
        <button className="btn-primary w-full sm:w-auto">New Simulation</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="card lg:col-span-2">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-iconbg">What-If Scenarios</h2>
          <div className="space-y-3 sm:space-y-4">
            {[
              { title: 'Early Termination', description: 'Impact of terminating the SaaS agreement after 6 months' },
              { title: 'Breach of SLA', description: 'Financial impact if vendor fails to meet 99.5% uptime guarantee' },
              { title: 'Delayed Payment', description: 'Consequences of missing the quarterly payment deadline by 15 days' }
            ].map((scenario, index) => (
              <div key={index} className="p-3 sm:p-4 rounded-lg bg-greybg border border-iconbg/30 hover:border-iconbg/50 transition-all">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <h3 className="font-medium text-iconbg text-sm sm:text-base">{scenario.title}</h3>
                  <button className="text-xs sm:text-sm px-2 py-1 rounded-full bg-iconbg/20 text-iconbg hover:bg-iconbg/30 transition-all self-start">
                    Run Simulation
                  </button>
                </div>
                <p className="text-xs sm:text-sm mt-2 text-textcolor/70 leading-relaxed">{scenario.description}</p>
                <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  <div className="p-2 rounded-lg bg-boxbg border border-iconbg/20">
                    <span className="text-xs text-textcolor/70">Financial Impact</span>
                    <p className="text-lg font-semibold text-iconbg">$24,500</p>
                  </div>
                  <div className="p-2 rounded-lg bg-boxbg border border-iconbg/20">
                    <span className="text-xs text-textcolor/70">Legal Risk</span>
                    <p className="text-lg font-semibold text-iconbg">{index === 0 ? 'Medium' : index === 1 ? 'Low' : 'High'}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-boxbg border border-iconbg/20">
                    <span className="text-xs text-textcolor/70">Probability</span>
                    <p className="text-lg font-semibold text-iconbg">{index === 0 ? '15%' : index === 1 ? '35%' : '10%'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-iconbg">Simulation Results</h2>
            <div className="p-3 sm:p-4 rounded-lg bg-greybg border border-iconbg/30">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                <h3 className="font-medium text-iconbg text-sm">Early Termination</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-iconbg/20 text-iconbg self-start">Completed</span>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-textcolor/70">Financial Projection</h4>
                  <div className="mt-2 h-20 sm:h-24 bg-boxbg rounded-lg border border-iconbg/20 p-2 relative overflow-hidden">
                    {/* Simple chart visualization */}
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                      <div className="w-1/4 h-[30%] bg-iconbg/30 mx-0.5"></div>
                      <div className="w-1/4 h-[80%] bg-iconbg/30 mx-0.5"></div>
                      <div className="w-1/4 h-[100%] bg-iconbg/30 mx-0.5"></div>
                      <div className="w-1/4 h-[60%] bg-iconbg/30 mx-0.5"></div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="p-2 rounded-lg bg-boxbg border border-iconbg/20">
                    <span className="text-xs text-textcolor/70">Termination Fee</span>
                    <p className="text-lg font-semibold text-iconbg">$15,000</p>
                  </div>
                  <div className="p-2 rounded-lg bg-boxbg border border-iconbg/20">
                    <span className="text-xs text-textcolor/70">Lost Investment</span>
                    <p className="text-lg font-semibold text-iconbg">$9,500</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-textcolor/70">Recommendation</h4>
                  <p className="text-xs sm:text-sm mt-1 text-textcolor/80 leading-relaxed">Avoid early termination. Consider renegotiating terms instead of terminating to save $24,500 in fees and lost investment.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-iconbg">Create Custom Scenario</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-textcolor/70 block mb-1">Scenario Type</label>
                <select className="w-full p-2 rounded-lg bg-greybg border border-iconbg/30 text-textcolor focus:border-iconbg/50 focus:outline-none">
                  <option>Contract Breach</option>
                  <option>Payment Issue</option>
                  <option>Termination</option>
                  <option>Dispute Resolution</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-textcolor/70 block mb-1">Contract</label>
                <select className="w-full p-2 rounded-lg bg-greybg border border-iconbg/30 text-textcolor focus:border-iconbg/50 focus:outline-none">
                  <option>Master Service Agreement</option>
                  <option>SaaS Subscription</option>
                  <option>NDA</option>
                </select>
              </div>
              <button className="w-full mt-2 px-4 py-2 rounded-lg bg-iconbg/20 text-iconbg hover:bg-iconbg/30 transition-all">
                Create Scenario
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scenarios;