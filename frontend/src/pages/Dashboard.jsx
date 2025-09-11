// Dashboard.jsx
import React from 'react';
import { AgentCard } from '../components/agents';

const Dashboard = () => {
  const agents = [
    {
      title: 'Compliance Guardian',
      description: 'Monitor regulatory changes and ensure document compliance across jurisdictions.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      actionText: 'View',
      metrics: [
        { label: 'Compliance Score', value: '94%' },
        { label: 'Monitored Regulations', value: '1,243' },
      ],
      onAction: () => window.location.href = '/compliance'
    },
    {
      title: 'Obligation & Deadline Tracker',
      description: 'Track contract deadlines, payment schedules, and renewal dates automatically.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      ),
      actionText: 'View',
      metrics: [
        { label: 'Upcoming Deadlines', value: '12' },
        { label: 'Tracked Obligations', value: '87' },
      ],
      onAction: () => window.location.href = '/obligations'
    },
    {
      title: 'Risk & Fairness Analyzer',
      description: 'Identify and assess contractual risks with interactive heatmaps and scoring.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      ),
      actionText: 'View',
      metrics: [
        { label: 'Risk Score', value: '32 (Low)' },
        { label: 'Fairness Rating', value: '8.5/10' },
      ],
      onAction: () => window.location.href = '/risk'
    },
    {
      title: 'Negotiation Strategist',
      description: 'Generate counter-proposals and negotiation strategies based on contract analysis.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      ),
      actionText: 'View',
      metrics: [
        { label: 'Success Rate', value: '78%' },
        { label: 'Avg. Improvement', value: '23%' },
      ],
      onAction: () => window.location.href = '/negotiation'
    },
    {
      title: 'Scenario Simulation',
      description: 'Model different contract scenarios and visualize potential outcomes.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      actionText: 'View',
      metrics: [
        { label: 'Scenarios Created', value: '24' },
        { label: 'Simulations Run', value: '156' },
      ],
      onAction: () => window.location.href = '/scenarios'
    },
    {
      title: 'Legal Research & Citation',
      description: 'Access case law, regulations, and generate legal briefs with proper citations.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 01114 0z"></path>
        </svg>
      ),
      actionText: 'View',
      metrics: [
        { label: 'Sources Accessed', value: '1,892' },
        { label: 'Citations Generated', value: '342' },
      ],
      onAction: () => window.location.href = '/research'
    },
    {
      title: 'Document Management',
      description: 'Upload, organize, and manage all your legal documents in one place.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      ),
      actionText: 'View',
      metrics: [
        { label: 'Total Documents', value: '247' },
        { label: 'Recent Uploads', value: '12' },
      ],
      onAction: () => window.location.href = '/documents'
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-iconbg">
          Dashboard
        </h1>
        <p className="text-textcolor/70 mt-2 text-sm sm:text-base">Welcome to LegalAxis, your AI-powered legal co-pilot.</p>
      </div>
      
      <div className="dashboard-grid">
        {agents.map((agent, index) => (
          <AgentCard 
            key={index}
            title={agent.title}
            description={agent.description}
            icon={agent.icon}
            actionText={agent.actionText}
            onAction={agent.onAction}
            metrics={agent.metrics}
          />
        ))}
      </div>
      
      <div className="mt-6 sm:mt-8 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <div className="card">
          <h3 className="text-lg sm:text-xl font-semibold text-iconbg mb-4 sm:mb-6 flex items-center">
            <div className="w-2 h-4 sm:h-6 bg-iconbg rounded-full mr-3"></div>
            Recent Activity
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {[
              { action: 'Document Uploaded', item: 'Service Agreement - TechCorp', time: '2 hours ago' },
              { action: 'Compliance Check', item: 'Privacy Policy v2.1', time: '4 hours ago' },
              { action: 'Risk Analysis', item: 'Vendor Contract - SupplyChain Inc', time: '1 day ago' },
              { action: 'Deadline Added', item: 'Renewal - Office Lease', time: '2 days ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start pb-3 sm:pb-4 border-b border-textcolor/10 last:border-0 group">
                <div className="bg-iconbg/20 p-2 rounded-full mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-iconbg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-textcolor group-hover:text-iconbg transition-colors duration-300 truncate">
                    {activity.action}: {activity.item}
                  </p>
                  <p className="text-xs text-textcolor/60 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg sm:text-xl font-semibold text-iconbg mb-4 sm:mb-6 flex items-center">
            <div className="w-2 h-4 sm:h-6 bg-iconbg rounded-full mr-3"></div>
            Upcoming Deadlines
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {[
              { title: 'Contract Renewal', description: 'Software License - CloudTech', date: 'Sep 15, 2025', urgent: true },
              { title: 'Payment Due', description: 'Legal Research Subscription', date: 'Sep 22, 2025', urgent: false },
              { title: 'Compliance Review', description: 'Updated Data Protection Policy', date: 'Oct 1, 2025', urgent: false },
              { title: 'Contract Expiration', description: 'Office Equipment Lease', date: 'Oct 10, 2025', urgent: false },
            ].map((deadline, index) => (
              <div key={index} className="flex items-start pb-3 sm:pb-4 border-b border-textcolor/10 last:border-0 group">
                <div className={`p-2 rounded-full mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ${
                  deadline.urgent ? 'bg-red-500/20' : 'bg-yellow-500/20'
                }`}>
                  <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${deadline.urgent ? 'text-red-400' : 'text-yellow-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
                    <p className="text-xs sm:text-sm font-medium text-white group-hover:text-[#A9CEF4] transition-colors duration-300 min-w-0">
                      {deadline.title}
                    </p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${
                      deadline.urgent ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {deadline.date}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{deadline.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;