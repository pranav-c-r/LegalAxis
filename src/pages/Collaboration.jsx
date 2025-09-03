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
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Document Collaboration</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{sampleDocument.name}</h2>
            <div className="flex items-center space-x-3 mb-6">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-quaternary/10 text-quaternary">
                {sampleDocument.type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {sampleDocument.status}
              </span>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Comments</h3>
              <CommentThread comments={sampleComments} documentId={sampleDocument.id} />
            </div>
          </div>
          
          <ActivityFeed activities={sampleActivities} />
        </div>
        
        <div className="space-y-6">
          <SharingControls 
            documentId={sampleDocument.id} 
            currentPermissions={samplePermissions} 
          />
          
          <ApprovalWorkflow 
            documentId={sampleDocument.id} 
            workflowSteps={sampleWorkflowSteps} 
          />
        </div>
      </div>
    </div>
  );
};

export default Collaboration;