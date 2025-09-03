import React from 'react';

const Consistency = () => {
  return (
    <div className="space-y-6">
      <h1 className="section-title-primary text-3xl">Cross-Contract Consistency</h1>
      
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Contract Comparison Tool</h2>
        <p className="mb-4">Analyze and compare multiple contracts to identify inconsistencies, conflicts, and alignment issues.</p>
        
        <div className="bg-quaternary/80 p-4 rounded-md text-center">
          <p className="text-primary font-medium">This feature is currently under development.</p>
          <p className="text-tertiary text-sm mt-2">Check back soon for updates!</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-secondary">
          <h3 className="text-lg font-semibold mb-3">Key Features</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>Multi-document comparison</li>
            <li>Clause alignment analysis</li>
            <li>Terminology consistency check</li>
            <li>Obligation tracking across contracts</li>
            <li>Visual conflict highlighting</li>
          </ul>
        </div>
        
        <div className="card-tertiary">
          <h3 className="text-lg font-semibold mb-3">Benefits</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>Reduce legal risk from contradictory terms</li>
            <li>Ensure consistent language across your contract portfolio</li>
            <li>Identify potential conflicts before they become problems</li>
            <li>Streamline contract management processes</li>
            <li>Improve overall contract quality and clarity</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Consistency;