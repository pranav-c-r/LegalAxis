import React from 'react';

const Settings = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-quaternary">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences.</p>
      </div>
      
      <div className="card">
        <h2 className="section-title">User Preferences</h2>
        <p className="text-gray-600 mb-4">Configure your application settings.</p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-quaternary/5 rounded-lg">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-gray-600">Toggle between light and dark theme</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
              <input type="checkbox" id="darkMode" className="absolute w-6 h-6 opacity-0 cursor-pointer" />
              <label htmlFor="darkMode" className="block h-full bg-gray-300 rounded-full shadow-inner">
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out transform"></span>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-quaternary/5 rounded-lg">
            <div>
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-gray-600">Enable or disable notifications</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
              <input type="checkbox" id="notifications" className="absolute w-6 h-6 opacity-0 cursor-pointer" checked />
              <label htmlFor="notifications" className="block h-full bg-quaternary rounded-full shadow-inner">
                <span className="absolute left-7 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out transform"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;