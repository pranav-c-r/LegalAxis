import React from 'react';

const Settings = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-iconbg">Settings</h1>
        <button className="btn-primary w-full sm:w-auto">Save Changes</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-iconbg">User Preferences</h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="text-sm text-textcolor/70 block mb-1">Display Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 rounded-lg bg-greybg border border-iconbg/30 text-textcolor focus:border-iconbg/50 focus:outline-none"
                  defaultValue="John Smith"
                />
              </div>
              <div>
                <label className="text-sm text-textcolor/70 block mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full p-2 rounded-lg bg-greybg border border-iconbg/30 text-textcolor focus:border-iconbg/50 focus:outline-none"
                  defaultValue="john.smith@company.com"
                />
              </div>
              <div>
                <label className="text-sm text-textcolor/70 block mb-1">Language</label>
                <select className="w-full p-2 rounded-lg bg-greybg border border-iconbg/30 text-textcolor focus:border-iconbg/50 focus:outline-none">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-iconbg">Notification Settings</h2>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg bg-greybg border border-iconbg/30 hover:border-iconbg/50 transition-all gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-iconbg text-sm">Email Notifications</h3>
                  <p className="text-xs text-textcolor/70">Receive alerts and updates via email</p>
                </div>
                <div className="relative inline-block w-12 h-6 rounded-full bg-iconbg/20 flex-shrink-0">
                  <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-iconbg transition-all duration-300"></div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg bg-greybg border border-iconbg/30 hover:border-iconbg/50 transition-all gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-iconbg text-sm">Slack Notifications</h3>
                  <p className="text-xs text-textcolor/70">Receive alerts and updates via Slack</p>
                </div>
                <div className="relative inline-block w-12 h-6 rounded-full bg-iconbg/20 flex-shrink-0">
                  <div className="absolute left-7 top-1 w-4 h-4 rounded-full bg-iconbg transition-all duration-300"></div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg bg-greybg border border-iconbg/30 hover:border-iconbg/50 transition-all gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-iconbg text-sm">Calendar Integration</h3>
                  <p className="text-xs text-textcolor/70">Add deadlines to your calendar automatically</p>
                </div>
                <div className="relative inline-block w-12 h-6 rounded-full bg-iconbg/20 flex-shrink-0">
                  <div className="absolute left-7 top-1 w-4 h-4 rounded-full bg-iconbg transition-all duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-iconbg">Appearance</h2>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg bg-greybg border border-iconbg/30 hover:border-iconbg/50 transition-all gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-iconbg text-sm">Dark Mode</h3>
                  <p className="text-xs text-textcolor/70">Use dark theme</p>
                </div>
                <div className="relative inline-block w-12 h-6 rounded-full bg-iconbg/20 flex-shrink-0">
                  <div className="absolute left-7 top-1 w-4 h-4 rounded-full bg-iconbg transition-all duration-300"></div>
                </div>
              </div>
              <div>
                <label className="text-sm text-textcolor/70 block mb-1">Font Size</label>
                <select className="w-full p-2 rounded-lg bg-greybg border border-iconbg/30 text-textcolor focus:border-iconbg/50 focus:outline-none">
                  <option>Small</option>
                  <option selected>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-iconbg">Integrations</h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-greybg border border-iconbg/30 hover:border-iconbg/50 transition-all flex items-center">
                <div className="w-10 h-10 rounded-full bg-iconbg/20 flex items-center justify-center text-iconbg flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <h3 className="font-medium text-iconbg text-sm">Google Calendar</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-iconbg/20 text-iconbg self-start">Connected</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-greybg border border-iconbg/30 hover:border-iconbg/50 transition-all flex items-center">
                <div className="w-10 h-10 rounded-full bg-iconbg/20 flex items-center justify-center text-iconbg flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                  </svg>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <h3 className="font-medium text-iconbg text-sm">Slack</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-iconbg/20 text-iconbg self-start">Connected</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-greybg border border-iconbg/30 hover:border-iconbg/50 transition-all flex items-center">
                <div className="w-10 h-10 rounded-full bg-iconbg/20 flex items-center justify-center text-iconbg flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <h3 className="font-medium text-iconbg text-sm">DocuSign</h3>
                    <button className="text-xs px-2 py-1 rounded-full bg-iconbg/20 text-iconbg hover:bg-iconbg/30 transition-all self-start">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;