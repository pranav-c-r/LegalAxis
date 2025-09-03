import AgentCard from '../components/agents/AgentCard';

const Dashboard = () => {
  const agents = [
    {
      title: 'Compliance Guardian',
      description: 'Monitor regulatory changes and ensure document compliance across jurisdictions.',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      color: 'bg-quaternary',
      metrics: [
        { label: 'Compliance Score', value: '94%' },
        { label: 'Monitored Regulations', value: '1,243' },
      ],
      path: '/compliance'
    },
    {
      title: 'Obligation & Deadline Tracker',
      description: 'Track contract deadlines, payment schedules, and renewal dates automatically.',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      ),
      color: 'bg-primary',
      metrics: [
        { label: 'Upcoming Deadlines', value: '12' },
        { label: 'Tracked Obligations', value: '87' },
      ],
      path: '/obligations'
    },
    {
      title: 'Risk & Fairness Analyzer',
      description: 'Identify and assess contractual risks with interactive heatmaps and scoring.',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      ),
      color: 'bg-secondary',
      metrics: [
        { label: 'Risk Score', value: '32 (Low)' },
        { label: 'Fairness Rating', value: '8.5/10' },
      ],
      path: '/risk'
    },
    {
      title: 'Negotiation Strategist',
      description: 'Generate counter-proposals and negotiation strategies based on contract analysis.',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      ),
      color: 'bg-tertiary',
      metrics: [
        { label: 'Success Rate', value: '78%' },
        { label: 'Avg. Improvement', value: '23%' },
      ],
      path: '/negotiation'
    },
    {
      title: 'Scenario Simulation',
      description: 'Model different contract scenarios and visualize potential outcomes.',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      color: 'bg-quaternary',
      metrics: [
        { label: 'Scenarios Created', value: '24' },
        { label: 'Simulations Run', value: '156' },
      ],
      path: '/scenarios'
    },
    {
      title: 'Cross-Contract Consistency',
      description: 'Ensure consistency across related contracts and identify conflicts.',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
        </svg>
      ),
      color: 'bg-primary',
      metrics: [
        { label: 'Contracts Analyzed', value: '47' },
        { label: 'Conflicts Resolved', value: '18' },
      ],
      path: '/consistency'
    },
    {
      title: 'Legal Research & Citation',
      description: 'Access case law, regulations, and generate legal briefs with proper citations.',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      ),
      color: 'bg-secondary',
      metrics: [
        { label: 'Sources Accessed', value: '1,892' },
        { label: 'Citations Generated', value: '342' },
      ],
      path: '/research'
    },
    {
      title: 'Document Management',
      description: 'Upload, organize, and manage all your legal documents in one place.',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      ),
      color: 'bg-tertiary',
      metrics: [
        { label: 'Total Documents', value: '247' },
        { label: 'Recent Uploads', value: '12' },
      ],
      path: '/documents'
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-quaternary">Dashboard</h1>
        <p className="text-gray-600">Welcome to LegalAxis, your AI-powered legal co-pilot.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, index) => (
          <AgentCard 
            key={index}
            title={agent.title}
            description={agent.description}
            icon={agent.icon}
            color={agent.color}
            metrics={agent.metrics}
            path={agent.path}
          />
        ))}
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="section-title">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Document Uploaded', item: 'Service Agreement - TechCorp', time: '2 hours ago' },
              { action: 'Compliance Check', item: 'Privacy Policy v2.1', time: '4 hours ago' },
              { action: 'Risk Analysis', item: 'Vendor Contract - SupplyChain Inc', time: '1 day ago' },
              { action: 'Deadline Added', item: 'Renewal - Office Lease', time: '2 days ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}: {activity.item}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <h3 className="section-title">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {[
              { title: 'Contract Renewal', description: 'Software License - CloudTech', date: 'Sep 15, 2025', urgent: true },
              { title: 'Payment Due', description: 'Legal Research Subscription', date: 'Sep 22, 2025', urgent: false },
              { title: 'Compliance Review', description: 'Updated Data Protection Policy', date: 'Oct 1, 2025', urgent: false },
              { title: 'Contract Expiration', description: 'Office Equipment Lease', date: 'Oct 10, 2025', urgent: false },
            ].map((deadline, index) => (
              <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                <div className={`p-2 rounded-full mr-3 ${deadline.urgent ? 'bg-red-100' : 'bg-yellow-100'}`}>
                  <svg className={`w-5 h-5 ${deadline.urgent ? 'text-red-500' : 'text-yellow-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${deadline.urgent ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {deadline.date}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{deadline.description}</p>
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