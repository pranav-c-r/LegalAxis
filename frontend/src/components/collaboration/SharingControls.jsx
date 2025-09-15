import { useState } from 'react';

const SharingControls = ({ documentId, currentPermissions = [], onAddPermission, onChangePermission, onRemovePermission }) => {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('view');
  const [showPermissionsList, setShowPermissionsList] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAddUser = async () => {
    if (email.trim() === '') return;
    await onAddPermission?.(email, permission);
    setEmail('');
  };

  const handleRemovePermission = async (userId) => {
    await onRemovePermission?.(userId);
  };

  const handleChangePermission = async (userId, newPermission) => {
    await onChangePermission?.(userId, newPermission);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://legalaxis.com/documents/${documentId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPermissionLabel = (perm) => {
    switch (perm) {
      case 'view': return 'Can view';
      case 'comment': return 'Can comment';
      case 'edit': return 'Can edit';
      case 'admin': return 'Admin';
      default: return perm;
    }
  };

  return (
    <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg">
      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-5 sm:mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        Sharing Settings
      </h3>
      
      {/* Link Sharing Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f3cf1a] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">Anyone with the link</p>
            <p className="text-xs text-[#a0a0a0] break-words">Share this document using a direct link</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center mt-4 gap-2 sm:gap-0">
          <input 
            type="text" 
            value={`https://legalaxis.com/documents/${documentId}`} 
            readOnly 
            className="flex-1 p-3 text-sm bg-[#2a2a2a] border border-[#343535] rounded-xl sm:rounded-l-xl sm:rounded-r-none focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent text-white/80 min-w-0 transition-all duration-300"
          />
          <button 
            className={`py-3 px-4 rounded-xl sm:rounded-r-xl sm:rounded-l-none font-medium text-sm whitespace-nowrap transition-all duration-300 flex items-center justify-center ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-[#f3cf1a] text-[#1a1a1a] hover:bg-[#f3cf1a]/90'
            }`}
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                Copy Link
              </>
            )}
          </button>
        </div>
      </div>

      {/* Add People Section */}
      <div className="mb-6 sm:mb-8">
        <h4 className="text-sm font-semibold text-white mb-3">Add people</h4>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-1 p-3 text-sm bg-[#2a2a2a] border border-[#343535] rounded-xl focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent text-white placeholder-[#a0a0a0] min-w-0 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-3">
              <select 
                className="flex-1 sm:flex-none p-3 text-sm bg-[#2a2a2a] border border-[#343535] rounded-xl focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent text-white min-w-0 sm:min-w-[140px] transition-all duration-300"
                value={permission}
                onChange={(e) => setPermission(e.target.value)}
              >
                <option value="view">Can view</option>
                <option value="comment">Can comment</option>
                <option value="edit">Can edit</option>
                <option value="admin">Admin</option>
              </select>
              <button 
                className="bg-[#f3cf1a] text-[#1a1a1a] px-4 py-3 rounded-xl hover:bg-[#f3cf1a]/90 active:scale-95 transition-all duration-300 font-medium text-sm whitespace-nowrap flex items-center justify-center min-w-[60px] sm:min-w-auto disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                onClick={handleAddUser}
                disabled={email.trim() === ''}
              >
                <svg className="w-4 h-4 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* People with Access Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-semibold text-white">People with access</h4>
          <button 
            className="text-sm text-[#f3cf1a] hover:text-[#f3cf1a]/80 transition-all duration-300 flex items-center hover:bg-[#f3cf1a]/10 px-3 py-1.5 rounded-lg"
            onClick={() => setShowPermissionsList(!showPermissionsList)}
          >
            {showPermissionsList ? (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
                Hide
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
                Show
              </>
            )}
          </button>
        </div>
        
        {showPermissionsList && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between py-3 border-b border-[#343535]">
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-full bg-[#f3cf1a] flex items-center justify-center text-[#1a1a1a] font-bold text-sm flex-shrink-0">
                  JD
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white truncate">John Doe (You)</p>
                  <p className="text-xs text-[#a0a0a0] truncate">john.doe@example.com</p>
                </div>
              </div>
              <div className="text-sm font-semibold text-[#f3cf1a] bg-[#f3cf1a]/20 px-3 py-1.5 rounded-full whitespace-nowrap">Owner</div>
            </div>

            {currentPermissions.map((user) => (
              <div key={user.id} className="flex items-center justify-between py-3 border-b border-[#343535] last:border-0 group">
                <div className="flex items-center space-x-4 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {user.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    <p className="text-xs text-[#a0a0a0] truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                  <select 
                    className="p-2 text-xs bg-[#2a2a2a] border border-[#343535] rounded-lg focus:ring-1 focus:ring-[#f3cf1a] focus:border-transparent text-white min-w-0 transition-all duration-300"
                    value={user.permission}
                    onChange={(e) => handleChangePermission(user.id, e.target.value)}
                  >
                    <option value="view">View</option>
                    <option value="comment">Comment</option>
                    <option value="edit">Edit</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button 
                    className="text-[#a0a0a0] hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 p-2 rounded-lg active:scale-95"
                    onClick={() => handleRemovePermission(user.id)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
                <div className="text-xs font-medium text-[#f3cf1a] bg-[#f3cf1a]/20 px-2 py-1 rounded-full opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  {getPermissionLabel(user.permission)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SharingControls;