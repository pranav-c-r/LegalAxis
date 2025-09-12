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
      case 'in_progress': return 'bg-gradient-to-br from-[#f3cf1a] to-[#d4af37]';
      case 'rejected': return 'bg-gradient-to-br from-red-500 to-red-600';
      default: return 'bg-gradient-to-br from-[#343535] to-[#2a2a2a]';
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

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-300';
      case 'in_progress': return 'bg-[#f3cf1a]/20 text-[#f3cf1a]';
      case 'rejected': return 'bg-red-500/20 text-red-300';
      default: return 'bg-[#343535] text-[#a0a0a0]';
    }
  };

  return (
    <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
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
                    <div className="w-1 bg-gradient-to-b from-[#f3cf1a] to-[#d4af37] h-16 mt-2 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="bg-[#2a2a2a] rounded-xl p-5 border border-[#343535] transition-all duration-300 hover:border-[#f3cf1a]/30">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-white text-lg">{step.title}</h4>
                        <p className="text-sm text-[#a0a0a0] mt-1">
                          {getStatusText(step.status)}
                        </p>
                      </div>
                      <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusBadgeColor(step.status)}`}>
                        {step.status.replace('_', ' ').toUpperCase()}
                      </div>
                    </div>
                    
                    {step.approvers && step.approvers.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs text-[#a0a0a0] mb-2">Approvers:</p>
                        <div className="flex flex-wrap gap-2">
                          {step.approvers.map((approver) => (
                            <div key={approver.id} className="flex items-center bg-[#343535] rounded-full px-3 py-1.5">
                              <div className="w-6 h-6 rounded-full bg-[#f3cf1a] flex items-center justify-center text-[#1a1a1a] text-xs font-bold mr-2">
                                {approver.initials}
                              </div>
                              <span className="text-xs text-white">{approver.name}</span>
                              <span className={`ml-2 w-2 h-2 rounded-full ${
                                approver.status === 'approved' ? 'bg-green-400' :
                                approver.status === 'pending' ? 'bg-[#f3cf1a]' :
                                approver.status === 'rejected' ? 'bg-red-400' :
                                'bg-[#a0a0a0]'
                              }`}></span>
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
          <div className="text-center py-12 bg-[#2a2a2a] rounded-xl border-2 border-dashed border-[#343535]">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#343535] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#a0a0a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <p className="text-[#a0a0a0] mb-4">No approval workflow has been set up for this document.</p>
          </div>
        )}

        {!showAddStep ? (
          <button 
            className="flex items-center text-[#f3cf1a] hover:text-[#d4af37] text-sm font-medium transition-colors duration-300 group"
            onClick={() => setShowAddStep(true)}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#f3cf1a] to-[#d4af37] rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            Add approval step
          </button>
        ) : (
          <div className="bg-[#2a2a2a] rounded-xl p-5 border border-[#343535]">
            <h4 className="font-semibold text-white text-lg mb-4">Add New Approval Step</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Step Title</label>
                <input 
                  type="text" 
                  className="w-full p-3 text-sm bg-[#343535] border border-[#343535] rounded-xl focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent text-white placeholder-[#a0a0a0] transition-all duration-300"
                  placeholder="e.g., Legal Review"
                  value={newStepTitle}
                  onChange={(e) => setNewStepTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Approvers (comma separated emails)</label>
                <input 
                  type="text" 
                  className="w-full p-3 text-sm bg-[#343535] border border-[#343535] rounded-xl focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent text-white placeholder-[#a0a0a0] transition-all duration-300"
                  placeholder="e.g., john@example.com, jane@example.com"
                  value={newStepApprovers}
                  onChange={(e) => setNewStepApprovers(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-3 pt-3">
                <button 
                  className="px-4 py-2 text-sm text-[#a0a0a0] hover:text-white bg-[#343535] rounded-lg transition-all duration-300"
                  onClick={() => {
                    setShowAddStep(false);
                    setNewStepTitle('');
                    setNewStepApprovers('');
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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