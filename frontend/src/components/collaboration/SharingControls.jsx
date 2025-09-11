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
      <h3 className="text-lg sm:text-xl font-semibold text-iconbg mb-4 sm:mb-6 flex items-center">
        <div className="w-2 h-4 sm:h-6 bg-iconbg rounded-full mr-3 flex-shrink-0"></div>
        Sharing Settings
      </h3>
      
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-iconbg flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-page" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-textcolor">Anyone with the link</p>
            <p className="text-xs text-textcolor/60 break-words">Share this document using a direct link</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center mt-4 gap-2 sm:gap-0">
          <input 
            type="text" 
            value={`https://legalaxis.com/documents/${documentId}`} 
            readOnly 
            className="flex-1 p-2 sm:p-3 text-xs sm:text-sm bg-boxbg border border-iconbg/20 rounded-lg sm:rounded-l-xl sm:rounded-r-none focus:ring-2 focus:ring-iconbg focus:border-transparent text-textcolor/80 min-w-0"
          />
          <button className="bg-iconbg text-page py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-r-xl sm:rounded-l-none hover:bg-iconbg/90 transition-all duration-300 font-medium text-xs sm:text-sm whitespace-nowrap">
            Copy Link
          </button>
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <h4 className="text-sm font-semibold text-textcolor mb-3">Add people</h4>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-1 p-2 sm:p-3 text-xs sm:text-sm bg-boxbg border border-iconbg/20 rounded-lg focus:ring-2 focus:ring-iconbg focus:border-transparent text-textcolor placeholder-textcolor/50 min-w-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-2 sm:gap-3">
              <select 
                className="flex-1 sm:flex-none p-2 sm:p-3 text-xs sm:text-sm bg-boxbg border border-iconbg/20 rounded-lg focus:ring-2 focus:ring-iconbg focus:border-iconbg/50 focus:outline-none transition-all duration-300 text-textcolor min-w-0 sm:min-w-[120px] hover:border-iconbg/40 shadow-sm hover:shadow-md"
                value={permission}
                onChange={(e) => setPermission(e.target.value)}
              >
                <option value="view" className="bg-boxbg text-textcolor">Can view</option>
                <option value="comment" className="bg-boxbg text-textcolor">Can comment</option>
                <option value="edit" className="bg-boxbg text-textcolor">Can edit</option>
                <option value="admin" className="bg-boxbg text-textcolor">Admin</option>
              </select>
              <button 
                className="bg-iconbg text-page px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-iconbg/90 active:scale-95 transition-all duration-300 font-medium text-xs sm:text-sm whitespace-nowrap flex items-center justify-center min-w-[60px] sm:min-w-auto disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                onClick={handleAddUser}
                disabled={email.trim() === ''}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-semibold text-textcolor">People with access</h4>
          <button 
            className="text-xs sm:text-sm text-iconbg hover:text-iconbg/80 transition-all duration-300 flex items-center hover:bg-iconbg/10 px-2 py-1 rounded-lg"
            onClick={() => setShowPermissionsList(!showPermissionsList)}
          >
            {showPermissionsList ? (
              <>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
                Hide
              </>
            ) : (
              <>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
                Show
              </>
            )}
          </button>
        </div>
        
        {showPermissionsList && (
          <div className="space-y-3 sm:space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between py-2 sm:py-3 border-b border-textcolor/10">
              <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-iconbg flex items-center justify-center text-page font-bold text-xs sm:text-sm flex-shrink-0">
                  JD
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-textcolor truncate">John Doe (You)</p>
                  <p className="text-xs text-textcolor/60 truncate">john.doe@example.com</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-iconbg bg-iconbg/20 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">Owner</div>
            </div>

            {currentPermissions.map((user) => (
              <div key={user.id} className="flex items-center justify-between py-2 sm:py-3 border-b border-textcolor/10 last:border-0 group">
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-boxbg flex items-center justify-center text-textcolor font-bold text-xs sm:text-sm flex-shrink-0">
                    {user.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-textcolor truncate">{user.name}</p>
                    <p className="text-xs text-textcolor/60 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                  <select 
                    className="p-1 sm:p-2 text-xs bg-boxbg border border-iconbg/20 rounded focus:ring-1 focus:ring-iconbg focus:border-iconbg/50 focus:outline-none transition-all duration-300 text-textcolor min-w-0 hover:border-iconbg/40 shadow-sm hover:shadow-md"
                    value={user.permission}
                    onChange={(e) => handleChangePermission(user.id, e.target.value)}
                  >
                    <option value="view" className="bg-boxbg text-textcolor">View</option>
                    <option value="comment" className="bg-boxbg text-textcolor">Comment</option>
                    <option value="edit" className="bg-boxbg text-textcolor">Edit</option>
                    <option value="admin" className="bg-boxbg text-textcolor">Admin</option>
                  </select>
                  <button 
                    className="text-textcolor/60 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 p-1 rounded active:scale-95"
                    onClick={() => handleRemovePermission(user.id)}
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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