import React, { useState, useEffect } from 'react';

const Research = () => {
  const [citations, setCitations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setCitations([
        {
          id: 1,
          title: "Smith v. Johnson (2022)",
          confidence: 98,
          description: "Precedent for contract termination clauses in SaaS agreements",
          reference: "Master Service Agreement"
        },
        {
          id: 2,
          title: "Doe v. Enterprise Corp (2021)",
          confidence: 92,
          description: "Establishes liability limits in service agreements",
          reference: "Service Terms"
        },
        {
          id: 3,
          title: "State v. Innovation LLC (2023)",
          confidence: 95,
          description: "Clarifies intellectual property rights in collaborative work",
          reference: "IP Agreement"
        }
      ]);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleNewResearch = () => {
    // Implement new research functionality
    alert('New research functionality would open here');
  };
  
  const handleViewCase = (caseId, caseTitle) => {
    // Implement view case functionality
    alert(`Viewing case details for ${caseTitle}`);
  };

  return (
    <div className="min-h-screen bg-[#000000] p-4 sm:p-6 text-white">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

        {/* Header */}
        <div className="mb-8 sm:mb-12 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f3cf1a]/10 rounded-full blur-xl"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white relative">
               Legal Research & Citation
                <span className="block w-16 h-1 bg-[#f3cf1a] mt-2 rounded-full"></span>
              </h1>
              
            </div>
            <button 
              className="px-6 py-3 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 w-full sm:w-auto"
              style={{ 
                borderRadius: '8px',
                backgroundColor: '#f3cf1a',
                color: '#1a1a1a',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              New Research
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Recent Citations - 2/3 width on large screens */}
          <div className="lg:col-span-2 bg-[#242424] p-5 sm:p-6 rounded-lg border border-[#343535]">
            <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-[#f3cf1a]">Recent Citations</h2>
            
            {loading ? (
              // Loading state
              <div className="space-y-4">
                {[1, 2, 3].map(item => (
                  <div key={item} className="p-4 rounded-lg bg-[#2c2c2c] border border-[#343535] animate-pulse">
                    <div className="h-6 bg-[#343535] rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-[#343535] rounded w-full mb-2"></div>
                    <div className="h-4 bg-[#343535] rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : citations.length === 0 ? (
              // Empty state
              <div className="text-center py-10">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#2c2c2c] flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">No citations yet</h3>
                <p className="text-gray-400">Start your first research to see citations here</p>
              </div>
            ) : (
              // Citations list
              <div className="space-y-4 sm:space-y-5">
                {citations.map((item) => (
                  <div key={item.id} className="p-4 sm:p-5 rounded-lg bg-[#2c2c2c] border border-[#343535] hover:border-[#f3cf1a]/50 transition-all">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-3">
                      <h3 className="font-medium text-white text-base sm:text-lg">{item.title}</h3>
                      <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-[#f3cf1a]/20 text-[#f3cf1a] self-start">
                        {item.confidence}% Confidence
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">{item.description}</p>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                      <span className="text-xs text-gray-400">Referenced in: {item.reference}</span>
                      <button 
                        onClick={() => handleViewCase(item.id, item.title)}
                        className="text-xs px-4 py-2 rounded-full bg-[#f3cf1a]/20 text-[#f3cf1a] hover:bg-[#f3cf1a]/30 transition-all"
                        style={{ 
                          borderRadius: '50px',
                          backgroundColor: 'rgba(243, 207, 26, 0.2)',
                          border: 'none'
                        }}
                      >
                        View Full Case
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Research Sources - 1/3 width on large screens */}
          <div className="bg-[#242424] p-5 sm:p-6 rounded-lg border border-[#343535]">
            <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-[#f3cf1a]">Research Sources</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#2c2c2c] border border-[#343535] hover:border-[#f3cf1a]/50 transition-all flex items-center cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#f3cf1a]/20 flex items-center justify-center text-[#f3cf1a] flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div className="ml-4 min-w-0">
                  <h3 className="font-medium text-white text-sm sm:text-base">Caselaw Access Project</h3>
                  <p className="text-xs text-gray-400">40M+ court decisions</p>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-[#2c2c2c] border border-[#343535] hover:border-[#f3cf1a]/50 transition-all flex items-center cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#f3cf1a]/20 flex items-center justify-center text-[#f3cf1a] flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div className="ml-4 min-w-0">
                  <h3 className="font-medium text-white text-sm sm:text-base">Legal Journals</h3>
                  <p className="text-xs text-gray-400">Academic research & analysis</p>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-[#2c2c2c] border border-[#343535] hover:border-[#f3cf1a]/50 transition-all flex items-center cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#f3cf1a]/20 flex items-center justify-center text-[#f3cf1a] flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div className="ml-4 min-w-0">
                  <h3 className="font-medium text-white text-sm sm:text-base">Regulatory Databases</h3>
                  <p className="text-xs text-gray-400">Latest compliance requirements</p>
                </div>
              </div>
            </div>
            
            {/* Additional action button */}
            <button 
              className="mt-6 w-full py-3 rounded-lg border border-[#343535] hover:border-[#f3cf1a]/50 text-[#f3cf1a] hover:bg-[#f3cf1a]/10 transition-all flex items-center justify-center gap-2"
              style={{ 
                borderRadius: '8px',
                border: '1px solid #343535',
                backgroundColor: 'transparent'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add New Source
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;