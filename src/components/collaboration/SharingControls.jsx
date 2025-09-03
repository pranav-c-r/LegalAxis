// SharingControls.jsx
import { useState } from 'react';

const SharingControls = ({ documentId, currentPermissions = [] }) => {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('view');
  const [showPermissionsList, setShowPermissionsList] = useState(false);

  const handleAddUser = () => {
    if (email.trim() === '') return;
    console.log('Adding permission:', { email, permission, documentId });
    setEmail('');
  };

  const handleRemovePermission = (userId) => {
    console.log('Removing permission for user:', userId);
  };

  const handleChangePermission = (userId, newPermission) => {
    console.log('Changing permission for user:', userId, 'to', newPermission);
  };

  return (
    <div className="card animate-fadeIn">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <div className="w-2 h-6 bg-gradient-to-b from-[#A9CEF4] to-[#7EA0B7] rounded-full mr-3"></div>
        Sharing Settings
      </h3>
      
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A9CEF4] to-[#7EA0B7] flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Anyone with the link</p>
            <p className="text-xs text-gray-400">Share this document using a direct link</p>
          </div>
        </div>
        
        <div className="flex items-center mt-4">
          <input 
            type="text" 
            value={`https://legalaxis.com/documents/${documentId}`} 
            readOnly 
            className="flex-1 p-3 text-sm bg-white/5 border border-white/10 rounded-l-xl focus:ring-2 focus:ring-[#A9CEF4] focus:border-transparent text-gray-300"
          />
          <button className="bg-gradient-to-br from-[#A9CEF4] to-[#7EA0B7] text-white py-3 px-4 rounded-r-xl hover:opacity-90 transition-opacity duration-300 font-medium">
            Copy
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-sm font-semibold text-white mb-3">Add people</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            placeholder="Email address" 
            className="flex-1 p-3 text-sm bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#A9CEF4] focus:border-transparent text-white placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select 
            className="p-3 text-sm bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#A9CEF4] focus:border-transparent text-white"
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
          >
            <option value="view">Can view</option>
            <option value="comment">Can comment</option>
            <option value="edit">Can edit</option>
            <option value="admin">Admin</option>
          </select>
          <button 
            className="btn-primary whitespace-nowrap"
            onClick={handleAddUser}
            disabled={email.trim() === ''}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
            Add
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-semibold text-white">People with access</h4>
          <button 
            className="text-sm text-[#A9CEF4] hover:text-[#7EA0B7] transition-colors duration-300 flex items-center"
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
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A9CEF4] to-[#7EA0B7] flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">John Doe (You)</p>
                  <p className="text-xs text-gray-400">john.doe@example.com</p>
                </div>
              </div>
              <div className="text-sm font-semibold text-[#A9CEF4] bg-[#A9CEF4]/10 px-3 py-1 rounded-full">Owner</div>
            </div>

            {currentPermissions.map((user) => (
              <div key={user.id} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0 group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#597081] to-[#36494E] flex items-center justify-center text-white font-bold">
                    {user.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <select 
                    className="p-2 text-xs bg-white/5 border border-white/10 rounded focus:ring-1 focus:ring-[#A9CEF4] focus:border-transparent text-white"
                    value={user.permission}
                    onChange={(e) => handleChangePermission(user.id, e.target.value)}
                  >
                    <option value="view">Can view</option>
                    <option value="comment">Can comment</option>
                    <option value="edit">Can edit</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button 
                    className="text-gray-400 hover:text-red-400 transition-colors duration-300"
                    onClick={() => handleRemovePermission(user.id)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
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