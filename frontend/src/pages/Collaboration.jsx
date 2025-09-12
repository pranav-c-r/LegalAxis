import React from 'react';
import { ActivityFeed, ApprovalWorkflow, CommentThread, SharingControls } from '../components/collaboration';

const Collaboration = () => {
  // Sample data for demonstration
  const sampleDocument = {
    id: 'doc-123',
    name: 'Legal Contract - ABC Corp',
    type: 'contract',
    status: 'in_review'
  };

  const sampleComments = [
    {
      id: 'comment-1',
      author: { name: 'Jane Smith', initials: 'JS' },
      text: 'I think we should revise section 3.2 to clarify the payment terms.',
      timestamp: '2 hours ago',
      replies: [
        {
          id: 'reply-1',
          author: { name: 'Robert Johnson', initials: 'RJ' },
          text: 'Agreed. I will draft alternative language for that section.',
          timestamp: '1 hour ago'
        }
      ]
    },
    {
      id: 'comment-2',
      author: { name: 'Michael Brown', initials: 'MB' },
      text: 'The liability clause in section 5 needs to be more specific about force majeure events.',
      timestamp: '3 hours ago',
      replies: []
    }
  ];

  const sampleWorkflowSteps = [
    {
      id: 'step-1',
      title: 'Initial Draft Review',
      status: 'completed',
      approvers: [
        { id: 'user-1', name: 'Jane Smith', initials: 'JS', status: 'approved' },
        { id: 'user-2', name: 'Robert Johnson', initials: 'RJ', status: 'approved' }
      ]
    },
    {
      id: 'step-2',
      title: 'Legal Department Review',
      status: 'in_progress',
      approvers: [
        { id: 'user-3', name: 'Sarah Williams', initials: 'SW', status: 'pending' },
        { id: 'user-4', name: 'David Miller', initials: 'DM', status: 'approved' }
      ]
    },
    {
      id: 'step-3',
      title: 'Final Approval',
      status: 'pending',
      approvers: [
        { id: 'user-5', name: 'Jennifer Davis', initials: 'JD', status: 'pending' }
      ]
    }
  ];

  const sampleActivities = [
    {
      id: 'activity-1',
      type: 'edit',
      user: 'Jane Smith',
      action: 'edited the document',
      timestamp: '2 hours ago',
      documentName: 'Legal Contract - ABC Corp'
    },
    {
      id: 'activity-2',
      type: 'comment',
      user: 'Michael Brown',
      action: 'added a comment',
      details: 'The liability clause in section 5 needs to be more specific about force majeure events.',
      timestamp: '3 hours ago',
      documentName: 'Legal Contract - ABC Corp'
    },
    {
      id: 'activity-3',
      type: 'approval',
      user: 'David Miller',
      action: 'approved the document',
      timestamp: '4 hours ago',
      documentName: 'Legal Contract - ABC Corp'
    },
    {
      id: 'activity-4',
      type: 'share',
      user: 'Robert Johnson',
      action: 'shared the document with Sarah Williams',
      timestamp: '1 day ago',
      documentName: 'Legal Contract - ABC Corp'
    },
    {
      id: 'activity-5',
      type: 'upload',
      user: 'Jane Smith',
      action: 'uploaded a new version',
      timestamp: '2 days ago',
      documentName: 'Legal Contract - ABC Corp'
    }
  ];

  const samplePermissions = [
    {
      id: 'perm-1',
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      initials: 'SW',
      permission: 'edit'
    },
    {
      id: 'perm-2',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      initials: 'MB',
      permission: 'comment'
    },
    {
      id: 'perm-3',
      name: 'David Miller',
      email: 'david.miller@example.com',
      initials: 'DM',
      permission: 'view'
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f3cf1a]/10 rounded-full blur-xl"></div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white relative">
              Document Collaboration
              <span className="block w-16 h-1 bg-[#f3cf1a] mt-2 rounded-full"></span>
            </h1>
            <p className="text-[#e0e0e0] mt-3 text-base">Collaborate on legal documents with your team in real-time.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Document Header Card */}
            <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-6 gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-white break-words">
                  {sampleDocument.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#f3cf1a]/20 text-[#f3cf1a] border border-[#f3cf1a]/30 whitespace-nowrap">
                    {sampleDocument.type}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 whitespace-nowrap">
                    {sampleDocument.status}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-[#343535] pt-5 sm:pt-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-5 sm:mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                  </svg>
                  Comments
                </h3>
                <CommentThread comments={sampleComments} documentId={sampleDocument.id} />
              </div>
            </div>
            
            {/* Activity Feed */}
            <ActivityFeed activities={sampleActivities} />
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            {/* Sharing Controls */}
            <SharingControls 
              documentId={sampleDocument.id} 
              currentPermissions={samplePermissions} 
            />
            
            {/* Approval Workflow */}
            <ApprovalWorkflow 
              documentId={sampleDocument.id} 
              workflowSteps={sampleWorkflowSteps} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;