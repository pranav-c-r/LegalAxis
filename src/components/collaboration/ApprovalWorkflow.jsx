// ApprovalWorkflow.jsx
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
      case 'completed': return 'bg-gradient-to-br from-green-500 to-green-600';
      case 'in_progress': return 'bg-gradient-to-br from-[#A9CEF4] to-[#7EA0B7]';
      case 'rejected': return 'bg-gradient-to-br from-red-500 to-red-600';
      default: return 'bg-gradient-to-br from-gray-400 to-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Approved';
      case 'in_progress': return 'In Progress';
      case 'rejected': return 'Rejected';
      default: return 'Pending';
    }
  };

  return (
    <div className="card animate-fadeIn">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <div className="w-2 h-6 bg-gradient-to-b from-[#A9CEF4] to-[#7EA0B7] rounded-full mr-3"></div>
        Approval Workflow
      </h3>
      
      <div className="space-y-6">
        {workflowSteps.length > 0 ? (
          <div className="relative">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex mb-8 last:mb-0 group">
                <div className="flex flex-col items-center mr-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-transform duration-300 group-hover:scale-110 ${getStepStatusColor(step.status)}`}>
                    {index + 1}
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="w-1 bg-gradient-to-b from-[#A9CEF4] to-[#7EA0B7] h-16 mt-2 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-[#A9CEF4]/30">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-white text-lg">{step.title}</h4>
                        <p className="text-sm text-gray-300 mt-1">
                          {getStatusText(step.status)}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${step.status === 'completed' ? 'bg-green-500/20 text-green-300' : step.status === 'in_progress' ? 'bg-[#A9CEF4]/20 text-[#A9CEF4]' : step.status === 'rejected' ? 'bg-red-500/20 text-red-300' : 'bg-gray-500/20 text-gray-300'}`}>
                        {step.status.replace('_', ' ').toUpperCase()}
                      </div>
                    </div>
                    
                    {step.approvers && step.approvers.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs text-gray-400 mb-2">Approvers:</p>
                        <div className="flex flex-wrap gap-2">
                          {step.approvers.map((approver) => (
                            <div key={approver.id} className="flex items-center bg-white/5 rounded-full px-3 py-1">
                              <div className="w-6 h-6 rounded-full bg-[#7EA0B7] flex items-center justify-center text-white text-xs font-bold mr-2">
                                {approver.initials}
                              </div>
                              <span className="text-xs text-gray-300">{approver.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/5 rounded-xl border-2 border-dashed border-white/10">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <p className="text-gray-400 mb-4">No approval workflow has been set up for this document.</p>
          </div>
        )}

        {!showAddStep ? (
          <button 
            className="flex items-center text-[#A9CEF4] hover:text-[#7EA0B7] text-sm font-medium transition-colors duration-300 group"
            onClick={() => setShowAddStep(true)}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#A9CEF4] to-[#7EA0B7] rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            Add approval step
          </button>
        ) : (
          <div className="bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
            <h4 className="font-semibold text-white text-lg mb-4">Add New Approval Step</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Step Title</label>
                <input 
                  type="text" 
                  className="w-full p-3 text-sm bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#A9CEF4] focus:border-transparent text-white placeholder-gray-400"
                  placeholder="e.g., Legal Review"
                  value={newStepTitle}
                  onChange={(e) => setNewStepTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Approvers (comma separated emails)</label>
                <input 
                  type="text" 
                  className="w-full p-3 text-sm bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#A9CEF4] focus:border-transparent text-white placeholder-gray-400"
                  placeholder="e.g., john@example.com, jane@example.com"
                  value={newStepApprovers}
                  onChange={(e) => setNewStepApprovers(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-3 pt-3">
                <button 
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white bg-white/5 rounded-lg transition-colors duration-300"
                  onClick={() => {
                    setShowAddStep(false);
                    setNewStepTitle('');
                    setNewStepApprovers('');
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary text-sm"
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