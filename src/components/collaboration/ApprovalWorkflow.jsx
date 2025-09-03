import { useState } from 'react';

const ApprovalWorkflow = ({ documentId, workflowSteps = [] }) => {
  const [showAddStep, setShowAddStep] = useState(false);
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepApprovers, setNewStepApprovers] = useState('');
  
  const handleAddStep = () => {
    if (newStepTitle.trim() === '' || newStepApprovers.trim() === '') return;
    console.log('Adding workflow step:', { 
      title: newStepTitle, 
      approvers: newStepApprovers.split(',').map(email => email.trim()),
      documentId 
    });
    setNewStepTitle('');
    setNewStepApprovers('');
    setShowAddStep(false);
  };

  const getStepStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-quaternary';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Approval Workflow</h3>
      
      <div className="space-y-6">
        {workflowSteps.length > 0 ? (
          <div className="relative">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex mb-8 last:mb-0">
                <div className="flex flex-col items-center mr-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getStepStatusColor(step.status)}`}>
                    {index + 1}
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="w-0.5 bg-gray-300 h-full mt-2"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{step.title}</h4>
                        <p className="text-sm text-gray-500">
                          {step.status === 'completed' ? 'Approved' : 
                           step.status === 'rejected' ? 'Rejected' : 
                           step.status === 'in_progress' ? 'Awaiting approval' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No approval workflow has been set up for this document.</p>
          </div>
        )}

        {!showAddStep ? (
          <button 
            className="flex items-center text-quaternary hover:text-quaternary/80 text-sm font-medium"
            onClick={() => setShowAddStep(true)}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add approval step
          </button>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Add New Approval Step</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Step Title</label>
                <input 
                  type="text" 
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-tertiary focus:border-tertiary"
                  placeholder="e.g., Legal Review"
                  value={newStepTitle}
                  onChange={(e) => setNewStepTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Approvers (comma separated emails)</label>
                <input 
                  type="text" 
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-tertiary focus:border-tertiary"
                  placeholder="e.g., john@example.com, jane@example.com"
                  value={newStepApprovers}
                  onChange={(e) => setNewStepApprovers(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button 
                  className="text-gray-500 hover:text-gray-700 py-1.5 px-3 text-sm"
                  onClick={() => {
                    setShowAddStep(false);
                    setNewStepTitle('');
                    setNewStepApprovers('');
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary py-1.5 px-3 text-sm"
                  onClick={handleAddStep}
                  disabled={newStepTitle.trim() === '' || newStepApprovers.trim() === ''}
                >
                  Add Step
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalWorkflow;