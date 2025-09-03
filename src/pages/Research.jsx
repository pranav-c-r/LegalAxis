import React from 'react';

const Research = () => {
  return (
    <div className="space-y-6">
      <h1 className="section-title-primary text-3xl">Legal Research Assistant</h1>
      
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">AI-Powered Legal Research</h2>
        <p className="mb-4">Access comprehensive legal research tools to find relevant cases, statutes, and legal analysis.</p>
        
        <div className="bg-quaternary/80 p-4 rounded-md text-center">
          <p className="text-primary font-medium">This feature is currently under development.</p>
          <p className="text-tertiary text-sm mt-2">Check back soon for updates!</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-secondary">
          <h3 className="text-lg font-semibold mb-3">Research Tools</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>Case law database</li>
            <li>Statute and regulation search</li>
            <li>Legal precedent analyzer</li>
            <li>Jurisdiction-specific research</li>
            <li>Citation generator</li>
          </ul>
        </div>
        
        <div className="card-tertiary">
          <h3 className="text-lg font-semibold mb-3">Research Insights</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>AI-generated case summaries</li>
            <li>Relevant precedent suggestions</li>
            <li>Legal trend analysis</li>
            <li>Jurisdiction comparison</li>
            <li>Risk assessment based on case outcomes</li>
          </ul>
        </div>
      </div>
      
      <div className="card-quaternary">
        <h3 className="text-lg font-semibold mb-3">Recent Legal Updates</h3>
        <p className="text-sm mb-4">Stay informed about the latest legal developments relevant to your practice areas.</p>
        <div className="bg-quaternary/80 p-4 rounded-md text-center">
          <p className="text-primary text-sm">Connect your legal database subscriptions to enable this feature.</p>
        </div>
      </div>
    </div>
  );
};

export default Research;