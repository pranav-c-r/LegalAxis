import React from 'react';

const Scenarios = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#A9CEF4]">Scenario Simulation</h1>
        <button className="btn-primary">New Simulation</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">What-If Scenarios</h2>
          <div className="space-y-4">
            {[
              { title: 'Early Termination', description: 'Impact of terminating the SaaS agreement after 6 months' },
              { title: 'Breach of SLA', description: 'Financial impact if vendor fails to meet 99.5% uptime guarantee' },
              { title: 'Delayed Payment', description: 'Consequences of missing the quarterly payment deadline by 15 days' }
            ].map((scenario, index) => (
              <div key={index} className="p-4 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30 hover:border-[#A9CEF4]/50 transition-all">
                <div className="flex justify-between">
                  <h3 className="font-medium text-[#A9CEF4]">{scenario.title}</h3>
                  <button className="text-sm px-2 py-1 rounded-full bg-[#7EA0B7]/20 text-[#A9CEF4] hover:bg-[#7EA0B7]/30 transition-all">
                    Run Simulation
                  </button>
                </div>
                <p className="text-sm mt-2 text-[#7EA0B7]">{scenario.description}</p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="p-2 rounded-lg bg-[#36494E] border border-[#7EA0B7]/20">
                    <span className="text-xs text-[#7EA0B7]">Financial Impact</span>
                    <p className="text-lg font-semibold text-[#A9CEF4]">$24,500</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[#36494E] border border-[#7EA0B7]/20">
                    <span className="text-xs text-[#7EA0B7]">Legal Risk</span>
                    <p className="text-lg font-semibold text-[#A9CEF4]">{index === 0 ? 'Medium' : index === 1 ? 'Low' : 'High'}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[#36494E] border border-[#7EA0B7]/20">
                    <span className="text-xs text-[#7EA0B7]">Probability</span>
                    <p className="text-lg font-semibold text-[#A9CEF4]">{index === 0 ? '15%' : index === 1 ? '35%' : '10%'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Simulation Results</h2>
            <div className="p-4 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-[#A9CEF4]">Early Termination</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4]">Completed</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-[#7EA0B7]">Financial Projection</h4>
                  <div className="mt-2 h-24 bg-[#36494E] rounded-lg border border-[#7EA0B7]/20 p-2 relative overflow-hidden">
                    {/* Simple chart visualization */}
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                      <div className="w-1/4 h-[30%] bg-[#A9CEF4]/30 mx-0.5"></div>
                      <div className="w-1/4 h-[80%] bg-[#A9CEF4]/30 mx-0.5"></div>
                      <div className="w-1/4 h-[100%] bg-[#A9CEF4]/30 mx-0.5"></div>
                      <div className="w-1/4 h-[60%] bg-[#A9CEF4]/30 mx-0.5"></div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 rounded-lg bg-[#36494E] border border-[#7EA0B7]/20">
                    <span className="text-xs text-[#7EA0B7]">Termination Fee</span>
                    <p className="text-lg font-semibold text-[#A9CEF4]">$15,000</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[#36494E] border border-[#7EA0B7]/20">
                    <span className="text-xs text-[#7EA0B7]">Lost Investment</span>
                    <p className="text-lg font-semibold text-[#A9CEF4]">$9,500</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[#7EA0B7]">Recommendation</h4>
                  <p className="text-sm mt-1 text-[#A9CEF4]/80">Avoid early termination. Consider renegotiating terms instead of terminating to save $24,500 in fees and lost investment.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Create Custom Scenario</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-[#7EA0B7] block mb-1">Scenario Type</label>
                <select className="w-full p-2 rounded-lg bg-[#36494E] border border-[#7EA0B7]/30 text-[#A9CEF4] focus:border-[#A9CEF4]/50 focus:outline-none">
                  <option>Contract Breach</option>
                  <option>Payment Issue</option>
                  <option>Termination</option>
                  <option>Dispute Resolution</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-[#7EA0B7] block mb-1">Contract</label>
                <select className="w-full p-2 rounded-lg bg-[#36494E] border border-[#7EA0B7]/30 text-[#A9CEF4] focus:border-[#A9CEF4]/50 focus:outline-none">
                  <option>Master Service Agreement</option>
                  <option>SaaS Subscription</option>
                  <option>NDA</option>
                </select>
              </div>
              <button className="w-full mt-2 px-4 py-2 rounded-lg bg-[#7EA0B7]/20 text-[#A9CEF4] hover:bg-[#7EA0B7]/30 transition-all">
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