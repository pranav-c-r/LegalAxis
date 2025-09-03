import { useState } from 'react';

const SharingControls = ({ documentId, currentPermissions = [] }) => {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('view');
  const [showPermissionsList, setShowPermissionsList] = useState(false);

  const handleAddUser = () => {
    if (email.trim() === '') return;
    // In a real app, this would call an API to add the user permission
    console.log('Adding permission:', { email, permission, documentId });
    setEmail('');
  };

  const handleRemovePermission = (userId) => {
    // In a real app, this would call an API to remove the permission
    console.log('Removing permission for user:', userId);
  };

  const handleChangePermission = (userId, newPermission) => {
    // In a real app, this would call an API to change the permission
    console.log('Changing permission for user:', userId, 'to', newPermission);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Sharing Settings</h3>
      
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium">Anyone with the link</p>
            <p className="text-xs text-gray-500">Share this document using a direct link</p>
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          <input 
            type="text" 
            value={`https://legalaxis.com/documents/${documentId}`} 
            readOnly 
            className="flex-1 p-2 text-sm border border-gray-300 rounded-l-lg focus:ring-tertiary focus:border-tertiary bg-gray-50"
          />
          <button className="bg-quaternary text-white py-2 px-4 rounded-r-lg hover:bg-quaternary/90">
            Copy
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Add people</h4>
        <div className="flex space-x-2">
          <input 
            type="email" 
            placeholder="Email address" 
            className="flex-1 p-2 text-sm border border-gray-300 rounded-lg focus:ring-tertiary focus:border-tertiary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select 
            className="p-2 text-sm border border-gray-300 rounded-lg focus:ring-tertiary focus:border-tertiary"
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
          >
            <option value="view">Can view</option>
            <option value="comment">Can comment</option>
            <option value="edit">Can edit</option>
            <option value="admin">Admin</option>
          </select>
          <button 
            className="btn-primary py-2 px-4 text-sm"
            onClick={handleAddUser}
            disabled={email.trim() === ''}
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-900">People with access</h4>
          <button 
            className="text-sm text-quaternary hover:text-quaternary/80"
            onClick={() => setShowPermissionsList(!showPermissionsList)}
          >
            {showPermissionsList ? 'Hide' : 'Show'}
          </button>
        </div>
        
        {showPermissionsList && (
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white font-medium">
                  JD
                </div>
                <div>
                  <p className="text-sm font-medium">John Doe (You)</p>
                  <p className="text-xs text-gray-500">john.doe@example.com</p>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-700">Owner</div>
            </div>

            {currentPermissions.map((user) => (
              <div key={user.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                    {user.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <select 
                    className="p-1 text-xs border border-gray-300 rounded focus:ring-tertiary focus:border-tertiary"
                    value={user.permission}
                    onChange={(e) => handleChangePermission(user.id, e.target.value)}
                  >
                    <option value="view">Can view</option>
                    <option value="comment">Can comment</option>
                    <option value="edit">Can edit</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button 
                    className="text-gray-400 hover:text-red-500"
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