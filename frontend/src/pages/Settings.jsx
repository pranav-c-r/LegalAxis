import React from 'react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#A9CEF4]">Settings</h1>
        <button className="btn-primary">Save Changes</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">User Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#7EA0B7] block mb-1">Display Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 rounded-lg bg-[#36494E] border border-[#7EA0B7]/30 text-[#A9CEF4] focus:border-[#A9CEF4]/50 focus:outline-none"
                  defaultValue="John Smith"
                />
              </div>
              <div>
                <label className="text-sm text-[#7EA0B7] block mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full p-2 rounded-lg bg-[#36494E] border border-[#7EA0B7]/30 text-[#A9CEF4] focus:border-[#A9CEF4]/50 focus:outline-none"
                  defaultValue="john.smith@company.com"
                />
              </div>
              <div>
                <label className="text-sm text-[#7EA0B7] block mb-1">Language</label>
                <select className="w-full p-2 rounded-lg bg-[#36494E] border border-[#7EA0B7]/30 text-[#A9CEF4] focus:border-[#A9CEF4]/50 focus:outline-none">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Notification Settings</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
                <div>
                  <h3 className="font-medium text-[#A9CEF4]">Email Notifications</h3>
                  <p className="text-xs text-[#7EA0B7]">Receive alerts and updates via email</p>
                </div>
                <div className="relative inline-block w-12 h-6 rounded-full bg-[#7EA0B7]/20">
                  <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-[#A9CEF4] transition-all duration-300"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
                <div>
                  <h3 className="font-medium text-[#A9CEF4]">Slack Notifications</h3>
                  <p className="text-xs text-[#7EA0B7]">Receive alerts and updates via Slack</p>
                </div>
                <div className="relative inline-block w-12 h-6 rounded-full bg-[#7EA0B7]/20">
                  <div className="absolute left-7 top-1 w-4 h-4 rounded-full bg-[#A9CEF4] transition-all duration-300"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
                <div>
                  <h3 className="font-medium text-[#A9CEF4]">Calendar Integration</h3>
                  <p className="text-xs text-[#7EA0B7]">Add deadlines to your calendar automatically</p>
                </div>
                <div className="relative inline-block w-12 h-6 rounded-full bg-[#7EA0B7]/20">
                  <div className="absolute left-7 top-1 w-4 h-4 rounded-full bg-[#A9CEF4] transition-all duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Appearance</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30">
                <div>
                  <h3 className="font-medium text-[#A9CEF4]">Dark Mode</h3>
                  <p className="text-xs text-[#7EA0B7]">Use dark theme</p>
                </div>
                <div className="relative inline-block w-12 h-6 rounded-full bg-[#7EA0B7]/20">
                  <div className="absolute left-7 top-1 w-4 h-4 rounded-full bg-[#A9CEF4] transition-all duration-300"></div>
                </div>
              </div>
              <div>
                <label className="text-sm text-[#7EA0B7] block mb-1">Font Size</label>
                <select className="w-full p-2 rounded-lg bg-[#36494E] border border-[#7EA0B7]/30 text-[#A9CEF4] focus:border-[#A9CEF4]/50 focus:outline-none">
                  <option>Small</option>
                  <option selected>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-[#A9CEF4]">Integrations</h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30 flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#A9CEF4]/20 flex items-center justify-center text-[#A9CEF4]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-[#A9CEF4]">Google Calendar</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4]">Connected</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30 flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#A9CEF4]/20 flex items-center justify-center text-[#A9CEF4]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-[#A9CEF4]">Slack</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#A9CEF4]/10 text-[#A9CEF4]">Connected</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#36494E]/80 border border-[#7EA0B7]/30 flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#A9CEF4]/20 flex items-center justify-center text-[#A9CEF4]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-[#A9CEF4]">DocuSign</h3>
                    <button className="text-xs px-2 py-1 rounded-full bg-[#7EA0B7]/20 text-[#A9CEF4] hover:bg-[#7EA0B7]/30 transition-all">
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