import React, { useState, useEffect } from 'react';

const Obligations = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isScanning, setIsScanning] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    slack: true,
    escalation: true
  });
  const [scanResults, setScanResults] = useState(null);
  const [inputText, setInputText] = useState('');
  const [showInputModal, setShowInputModal] = useState(false);

  // Sample data for demonstration
  const obligationsData = {
    upcoming: [
      { 
        id: 1, 
        title: 'Quarterly Payment Due', 
        deadline: '2023-09-15', 
        deadlineDisplay: '3 days left', 
        description: '$25,000 payment due to Vendor Inc. as per Section 4.2 of the agreement', 
        source: 'SaaS Subscription Agreement',
        amount: '$25,000',
        priority: 'high',
        category: 'payment'
      },
      { 
        id: 2, 
        title: 'Annual Report Filing', 
        deadline: '2023-09-28', 
        deadlineDisplay: '2 weeks left', 
        description: 'Submit annual financial report to SEC as required by regulation', 
        source: 'SEC Compliance Requirements',
        priority: 'medium',
        category: 'compliance'
      },
      { 
        id: 3, 
        title: 'Software License Renewal', 
        deadline: '2023-10-15', 
        deadlineDisplay: '1 month left', 
        description: 'Renew enterprise software license with updated terms', 
        source: 'Software Agreement v2.1',
        amount: '$12,500',
        priority: 'medium',
        category: 'renewal'
      }
    ],
    overdue: [
      { 
        id: 4, 
        title: 'Insurance Premium Payment', 
        deadline: '2023-09-05', 
        deadlineDisplay: '5 days overdue', 
        description: 'Monthly insurance premium payment for property coverage', 
        source: 'Insurance Policy #45892',
        amount: '$3,200',
        priority: 'high',
        category: 'payment'
      }
    ],
    completed: [
      { 
        id: 5, 
        title: 'Tax Filing', 
        deadline: '2023-07-15', 
        deadlineDisplay: 'Completed', 
        description: 'Q2 corporate tax filing submitted to IRS', 
        source: 'IRS Requirements', 
        completionDate: 'Jul 15, 2023',
        category: 'compliance'
      }
    ]
  };

  // Function to extract obligations using Gemini API
  const extractObligationsWithGemini = async (text) => {
    setIsScanning(true);
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key not found');
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Analyze the following text and extract all legal obligations, deadlines, and important dates. Return ONLY a valid JSON array with objects containing:
- title: A short descriptive title
- deadline: ISO date format (YYYY-MM-DD)
- description: Detailed description of the obligation
- amount: If monetary, include the amount with currency
- priority: "high", "medium", or "low"
- category: "payment", "compliance", "renewal", "reporting", or "other"

Text to analyze: "${text}"

Return ONLY the JSON array, no other text.`
              }]
            }],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 1024,
              responseMimeType: "application/json",
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.candidates[0].content.parts[0].text;
      
      // Parse the JSON response
      let obligations;
      try {
        obligations = JSON.parse(responseText);
      } catch (parseError) {
        // Try to extract JSON from text if it's wrapped in markdown
        const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || responseText.match(/```\n([\s\S]*?)\n```/);
        if (jsonMatch) {
          obligations = JSON.parse(jsonMatch[1]);
        } else {
          throw new Error('Failed to parse JSON response from Gemini');
        }
      }

      // Add deadlineDisplay field
      const obligationsWithDisplay = obligations.map(obligation => ({
        ...obligation,
        deadlineDisplay: calculateDeadlineDisplay(obligation.deadline),
        source: 'AI Extraction'
      }));

      setScanResults({ deadlines: obligationsWithDisplay });
      setShowInputModal(false);
      setInputText('');
      
    } catch (error) {
      console.error('Error extracting obligations:', error);
      setScanResults({ 
        deadlines: [{
          title: 'Error',
          deadline: new Date().toISOString().split('T')[0],
          description: `Failed to extract obligations: ${error.message}`,
          priority: 'high',
          category: 'other'
        }]
      });
    }
    setIsScanning(false);
  };

  // Helper function to calculate deadline display text
  const calculateDeadlineDisplay = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return '1 day left';
    if (diffDays < 7) return `${diffDays} days left`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks left`;
    return `${Math.ceil(diffDays / 30)} months left`;
  };

  // Function to connect to calendar
  const connectCalendar = () => {
    setCalendarConnected(true);
  };

  // Function to handle notification settings change
  const handleNotificationChange = (type) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Function to handle text input and extraction
  const handleExtractObligations = () => {
    if (inputText.trim()) {
      extractObligationsWithGemini(inputText);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white p-4 sm:p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#f3cf1a] rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#f3cf1a] rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header Section */}
      <div className="mb-8 sm:mb-12 relative">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f3cf1a]/10 rounded-full blur-xl"></div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white relative">
              Obligation & Deadline Tracker
              <span className="block w-16 h-1 bg-[#f3cf1a] mt-2 rounded-full"></span>
            </h1>
            <p className="text-[#A9CEF4] mt-3 text-base">AI-powered deadline management with smart calendar integration</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button 
              className="px-6 py-3 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 flex items-center justify-center"
              onClick={() => setShowInputModal(true)}
              disabled={isScanning}
            >
              {isScanning ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#1a1a1a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Scanning...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Extract Obligations
                </>
              )}
            </button>
            <button 
              className="px-6 py-3 bg-transparent border border-[#f3cf1a] text-[#f3cf1a] font-medium rounded-lg transition-all duration-300 hover:bg-[#f3cf1a] hover:text-[#ffffff] flex items-center justify-center"
              onClick={connectCalendar}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {calendarConnected ? 'Calendar Connected' : 'Connect Calendar'}
            </button>
          </div>
        </div>
      </div>

      {/* Text Input Modal */}
      {showInputModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#242424] rounded-2xl p-6 max-w-2xl w-full border border-[#f3cf1a]/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Extract Obligations from Text</h3>
              <button onClick={() => setShowInputModal(false)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Paste contract text, email, or any content with obligations:
              </label>
              <textarea
                className="w-full h-48 bg-[#1a1a1a] text-white p-3 rounded-lg border border-[#343535] focus:border-[#f3cf1a] focus:outline-none"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste text here to extract obligations, deadlines, and important dates..."
              />
            </div>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowInputModal(false)} 
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button 
                onClick={handleExtractObligations}
                disabled={!inputText.trim() || isScanning}
                className="px-4 py-2 bg-[#f3cf1a] text-[#1a1a1a] rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScanning ? 'Extracting...' : 'Extract Obligations'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scan Results Modal */}
      {scanResults && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#242424] rounded-2xl p-6 max-w-2xl w-full border border-[#f3cf1a]/30 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Extracted Obligations</h3>
              <button onClick={() => setScanResults(null)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              {scanResults.deadlines.map((deadline, index) => (
                <div key={index} className="bg-[#1a1a1a] p-4 rounded-lg border border-[#343535]">
                  <h4 className="font-semibold text-white">{deadline.title}</h4>
                  <p className="text-sm text-[#A9CEF4]">{deadline.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">Deadline: {deadline.deadline} • {deadline.priority} priority</span>
                    <button className="text-xs bg-[#f3cf1a] text-[#1a1a1a] px-3 py-1 rounded">
                      Add to Tracker
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setScanResults(null)} className="px-4 py-2 text-gray-400 hover:text-white">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-gradient-to-br from-[#222222] to-[#1a1a1a] p-4 sm:p-6 rounded-xl border border-[#343535] flex items-center group hover:border-[#f3cf1a]/30 transition-all duration-300">
          <div className="bg-[#f3cf1a]/20 p-3 rounded-full mr-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">24</h3>
            <p className="text-sm text-gray-400">Total Obligations</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-[#222222] to-[#1a1a1a] p-4 sm:p-6 rounded-xl border border-[#343535] flex items-center group hover:border-[#f3cf1a]/30 transition-all duration-300">
          <div className="bg-[#f3cf1a]/20 p-3 rounded-full mr-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 01118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">3</h3>
            <p className="text-sm text-gray-400">Due This Week</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-[#222222] to-[#1a1a1a] p-4 sm:p-6 rounded-xl border border-[#343535] flex items-center group hover:border-[#f3cf1a]/30 transition-all duration-300">
          <div className="bg-[#f3cf1a]/20 p-3 rounded-full mr-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 01118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">92%</h3>
            <p className="text-sm text-gray-400">Compliance Rate</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#222222] to-[#1a1a1a] p-4 sm:p-6 rounded-xl border border-[#343535] flex items-center group hover:border-[#f3cf1a]/30 transition-all duration-300">
          <div className="bg-[#f3cf1a]/20 p-3 rounded-full mr-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">12</h3>
            <p className="text-sm text-gray-400">Active Alerts</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#343535] mb-6">
            <button 
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'upcoming' ? 'text-[#f3cf1a] border-b-2 border-[#f3cf1a]' : 'text-gray-400'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'overdue' ? 'text-[#f3cf1a] border-b-2 border-[#f3cf1a]' : 'text-gray-400'}`}
              onClick={() => setActiveTab('overdue')}
            >
              Overdue
            </button>
            <button 
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'completed' ? 'text-[#f3cf1a] border-b-2 border-[#f3cf1a]' : 'text-gray-400'}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
          </div>

          {/* Obligations List */}
          <div className="space-y-4">
            {obligationsData[activeTab].map((item) => (
              <div key={item.id} className="bg-gradient-to-br from-[#222222] to-[#1a1a1a] p-4 sm:p-6 rounded-xl border border-[#343535] hover:border-[#f3cf1a]/30 transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      item.priority === 'high' ? 'bg-red-500/20' : 'bg-[#f3cf1a]/20'
                    }`}>
                      <svg className={`w-4 h-4 ${item.priority === 'high' ? 'text-red-400' : 'text-[#f3cf1a]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 01118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-white">{item.title}</h3>
                      {item.amount && (
                        <p className="text-[#f3cf1a] font-medium text-sm">{item.amount}</p>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full self-start ${activeTab === 'overdue' ? 'bg-red-500/20 text-red-400' : activeTab === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-[#f3cf1a]/20 text-[#f3cf1a]'}`}>
                    {item.deadlineDisplay}
                  </span>
                </div>
                <p className="text-sm text-[#A9CEF4] mb-4">{item.description}</p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <span className="text-xs text-gray-500">From: {item.source}</span>
                  <div className="flex space-x-2">
                    <button className="text-xs px-3 py-2 rounded-lg bg-[#343535] text-gray-300 hover:bg-[#f3cf1a] hover:text-[#1a1a1a] transition-all flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Add to Calendar
                    </button>
                    <button className="text-xs px-3 py-2 rounded-lg bg-[#343535] text-gray-300 hover:bg-[#f3cf1a] hover:text-[#1a1a1a] transition-all flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                      </svg>
                      Set Alert
                    </button>
                    {activeTab === 'completed' && (
                      <span className="text-xs text-gray-500 self-center">Completed on {item.completionDate}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="bg-gradient-to-br from-[#222222] to-[#1a1a1a] p-6 rounded-xl border border-[#343535]">
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              Notification Settings
            </h2>
            
            <div className="space-y-4">
              {[
                { key: 'email', label: 'Email Notifications', icon: '✉️' },
                { key: 'sms', label: 'SMS Alerts', icon: '📱' },
                { key: 'slack', label: 'Slack Messages', icon: '💬' },
                { key: 'escalation', label: 'Escalation Alerts', icon: '⚠️' }
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-3">{setting.icon}</span>
                    <span className="text-sm text-gray-300">{setting.label}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={notificationSettings[setting.key]}
                      onChange={() => handleNotificationChange(setting.key)}
                    />
                    <div className={`w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer ${notificationSettings[setting.key] ? 'peer-checked:bg-[#f3cf1a]' : ''} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-[#1a1a1a] rounded-lg">
              <h4 className="text-sm font-medium text-white mb-2">Alert Timing</h4>
              <select className="w-full bg-[#343535] text-white text-sm rounded-lg p-2 border border-[#4b5563]">
                <option>7 days before</option>
                <option>3 days before</option>
                <option>1 day before</option>
                <option>Day of deadline</option>
              </select>
            </div>
          </div>

          {/* Compliance Score Card */}
          <div className="bg-gradient-to-br from-[#222222] to-[#1a1a1a] p-6 rounded-xl border border-[#343535]">
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 极 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              Compliance Score
            </h2>
            
            <div className="relative mb-6">
              <div className="w-full h-3 bg-[#343535] rounded-full">
                <div className="h-3 bg-gradient-to-r from-[#f3cf1a] to-[#e5b800] rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="absolute top-0 right-0 text-sm font-semibold text-[#f3cf1a]">85%</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] p-3 rounded-lg">
                <div className="text-2xl font-bold text-white">24</div>
                <div className="text-xs text-gray-400">Total Tracked</div>
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded-lg">
                <div className="text-2xl font-bold text-white">22</div>
                <div className="text-xs text-gray-400">Completed</div>
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded-lg">
                <div className="text-2xl font-bold text-white">1</div>
                <div className="text-xs text-gray-400">Overdue</div>
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded-lg">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-xs text-gray-400">Upcoming</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Obligations;