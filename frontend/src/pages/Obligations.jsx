import React, { useState } from 'react';

const Obligations = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Sample data for demonstration
  const obligationsData = {
    upcoming: [
      { id: 1, title: 'Quarterly Payment Due', deadline: '3 days left', description: '$25,000 payment due to Vendor Inc. as per Section 4.2 of the agreement', source: 'SaaS Subscription Agreement' },
      { id: 2, title: 'Annual Report Filing', deadline: '2 weeks left', description: 'Submit annual financial report to SEC as required by regulation', source: 'SEC Compliance Requirements' },
      { id: 3, title: 'Software License Renewal', deadline: '1 month left', description: 'Renew enterprise software license with updated terms', source: 'Software Agreement v2.1' }
    ],
    overdue: [
      { id: 4, title: 'Insurance Premium Payment', deadline: '5 days overdue', description: 'Monthly insurance premium payment for property coverage', source: 'Insurance Policy #45892' }
    ],
    completed: [
      { id: 5, title: 'Tax Filing', deadline: 'Completed', description: 'Q2 corporate tax filing submitted to IRS', source: 'IRS Requirements', completionDate: 'Jul 15, 2023' }
    ]
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white p-4 sm:p-6">
      {/* Header Section */}
      {/* Header Section */}
        <div className="mb-8 sm:mb-12 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f3cf1a]/10 rounded-full blur-xl"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white relative">
                Obligation & Deadline Tracker
                <span className="block w-16 h-1 bg-[#f3cf1a] mt-2 rounded-full"></span>
              </h1>
              <p className="text-[#e0e0e0] mt-3 text-base">Manage your contractual obligations, compliance requirements, and important deadlines in one place</p>
            </div>
            <button 
              className="px-6 py-3 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 w-full sm:w-auto"
              style={{
                borderRadius: '8px',
                backgroundColor: '#f3cf1a',
                color: '#1a1a1a',
                border: '2px solid #f3cf1a'
              }}
            >
              Scan New Contract
            </button>
          </div>
        </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-[#242424] p-4 sm:p-6 rounded-xl border border-[#343535] flex items-center">
          <div className="bg-[#f3cf1a]/20 p-3 rounded-full mr-4">
            <svg className="w-6 h-6 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold">24</h3>
            <p className="text-sm text-gray-400">Total Obligations</p>
          </div>
        </div>
        
        <div className="bg-[#242424] p-4 sm:p-6 rounded-xl border border-[#343535] flex items-center">
          <div className="bg-[#f3cf1a]/20 p-3 rounded-full mr-4">
            <svg className="w-6 h-6 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold">3</h3>
            <p className="text-sm text-gray-400">Due This Week</p>
          </div>
        </div>
        
        <div className="bg-[#242424] p-4 sm:p-6 rounded-xl border border-[#343535] flex items-center">
          <div className="bg-[#f3cf1a]/20 p-3 rounded-full mr-4">
            <svg className="w-6 h-6 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold">92%</h3>
            <p className="text-sm text-gray-400">Compliance Rate</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#343535] mb-6">
            <button 
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'upcoming' ? 'text-[#f3cf1a] border-b-2 border-[#f3cf1a]' : 'text-gray-400'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'overdue' ? 'text-[#f3cf1a] border-b-2 border-[#f3cf1a]' : 'text-gray-400'}`}
              onClick={() => setActiveTab('overdue')}
            >
              Overdue
            </button>
            <button 
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'completed' ? 'text-[#f3cf1a] border-b-2 border-[#f3cf1a]' : 'text-gray-400'}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
          </div>

          {/* Obligations List */}
          <div className="space-y-4">
            {obligationsData[activeTab].map((item) => (
              <div key={item.id} className="bg-[#242424] p-4 sm:p-6 rounded-xl border border-[#343535] hover:border-[#f3cf1a]/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-3">
                  <h3 className="font-semibold text-lg text-white">{item.title}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full self-start ${activeTab === 'overdue' ? 'bg-red-500/20 text-red-400' : activeTab === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-[#f3cf1a]/20 text-[#f3cf1a]'}`}>
                    {item.deadline}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{item.description}</p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <span className="text-xs text-gray-500">From: {item.source}</span>
                  <div className="flex space-x-2">
                    <button 
                      className="text-xs px-3 py-2 rounded-lg bg-[#343535] text-gray-300 hover:bg-[#f3cf1a] hover:text-[#1a1a1a] transition-all"
                      style={{
                        borderRadius: '8px',
                        backgroundColor: '#343535',
                        color: '#d1d5db',
                        border: '1px solid #4b5563'
                      }}
                    >
                      Add to Calendar
                    </button>
                    <button 
                      className="text-xs px-3 py-2 rounded-lg bg-[#343535] text-gray-300 hover:bg-[#f3cf1a] hover:text-[#1a1a1a] transition-all"
                      style={{
                        borderRadius: '8px',
                        backgroundColor: '#343535',
                        color: '#d1d5db',
                        border: '1px solid #4b5563'
                      }}
                    >
                      Set Alert
                    </button>
                    {activeTab === 'completed' && (
                      <span className="text-xs text-gray-500 self-center">Completed on {item.completionDate}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Compliance Score Card */}
          <div className="bg-[#242424] p-6 rounded-xl border border-[#343535]">
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              Compliance Score
            </h2>
            
            <div className="relative mb-6">
              <div className="w-full h-3 bg-[#343535] rounded-full">
                <div className="h-3 bg-gradient-to-r from-[#f3cf1a] to-[#e5b800] rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="absolute top-0 right-0 text-sm font-semibold text-[#f3cf1a]">85%</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] p-3 rounded-lg">
                <div className="text-2xl font-bold text-white">24</div>
                <div className="text-xs text-gray-400">Total Tracked</div>
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded-lg">
                <div className="text-2xl font-bold text-white">22</div>
                <div className="text-xs text-gray-400">Completed</div>
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded-lg">
                <div className="text-2xl font-bold text-white">1</div>
                <div className="text-xs text-gray-400">Overdue</div>
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded-lg">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-xs text-gray-400">Upcoming</div>
              </div>
            </div>
          </div>

          {/* Regulation Updates */}
          <div className="bg-[#242424] p-6 rounded-xl border border-[#343535]">
            <h2 className="text-xl font-semibold mb-4 text-white">Regulation Updates</h2>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-[#1a1a1a] border border-[#343535] hover:border-[#f3cf1a]/30 transition-all">
                <h3 className="font-medium text-white text-sm">New Tax Filing Requirements</h3>
                <p className="text-xs text-gray-400 mt-1">Updated regulations for FY2023 reporting</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  2 hours ago
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-[#1a1a1a] border border-[#343535] hover:border-[#f3cf1a]/30 transition-all">
                <h3 className="font-medium text-white text-sm">Data Privacy Law Changes</h3>
                <p className="text-xs text-gray-400 mt-1">New requirements for user data handling</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  1 day ago
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-[#1a1a1a] border border-[#343535] hover:border-[#f3cf1a]/30 transition-all">
                <h3 className="font-medium text-white text-sm">Industry Compliance Standards</h3>
                <p className="text-xs text-gray-400 mt-1">Updated safety protocols for Q3</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  3 days ago
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