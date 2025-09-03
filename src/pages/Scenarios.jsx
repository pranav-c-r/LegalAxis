import React from 'react';

const Scenarios = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-quaternary">Scenario Simulation</h1>
        <p className="text-gray-600">Model different contract scenarios and visualize potential outcomes.</p>
      </div>
      
      <div className="card">
        <h2 className="section-title">Scenario Dashboard</h2>
        <p className="text-gray-600 mb-4">This feature is coming soon. Stay tuned for updates!</p>
        
        <div className="bg-quaternary/10 p-4 rounded-lg">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-quaternary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-quaternary font-medium">This page is under development</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scenarios;