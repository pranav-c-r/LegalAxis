import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const menuItems = [
    { name: 'Dashboard', icon: 'home', path: '/dashboard' },
    { name: 'Compliance Guardian', icon: 'shield-check', path: '/compliance' },
    { name: 'Obligation Tracker', icon: 'calendar', path: '/obligations' },
    { name: 'Risk Analyzer', icon: 'chart-bar', path: '/risk' },
    { name: 'Negotiation Strategist', icon: 'chat', path: '/negotiation' },
    { name: 'Scenario Simulation', icon: 'play', path: '/scenarios' },
    { name: 'AI Chatbot', icon: 'message-circle', path: '/chatbot' },
    { name: 'Voice Assistant', icon: 'mic', path: '/voice-assistant' },
    { name: 'Legal Research', icon: 'search', path: '/research' },
    { name: 'Documents', icon: 'document-text', path: '/documents' },
    { name: 'Collaboration', icon: 'users', path: '/collaboration' },
    { name: 'Settings', icon: 'cog', path: '/settings' },
  ];

  const renderIcon = (iconName) => {
    const iconClasses = "w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300";
    switch(iconName) {
      case 'home':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10h14V10"></path>
          </svg>
        );
      case 'shield-check':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.6-4A12 12 0 0112 3a12 12 0 01-8.6 3A12 12 0 003 9c0 6 4 11 9 12 5-1 9-6 9-12 0-1-.1-2-.4-3z"></path>
          </svg>
        );
      case 'calendar':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14V7H5z"></path>
          </svg>
        );
      case 'chart-bar':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6H5v6h4zm6 0V9h-4v10h4zm6 0V5h-4v14h4z"></path>
          </svg>
        );
      case 'chat':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4-4 8-9 8a9 9 0 01-4-1L3 20l1-3c-.5-1.5-1-3-1-5 0-4 4-8 9-8s9 4 9 8z"></path>
          </svg>
        );
      case 'play':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.7 11.2L11.5 9.1A1 1 0 0010 10v4a1 1 0 001.5.8l3.2-2.1a1 1 0 000-1.5z"></path>
            <circle cx="12" cy="12" r="9" strokeWidth="1.5" stroke="currentColor" fill="none"></circle>
          </svg>
        );
      case 'search':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        );
      case 'document-text':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6M7 4h5l5 5v11H7z"></path>
          </svg>
        );
      case 'users':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-1a6 6 0 00-9-5M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        );
      case 'cog':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" strokeWidth="1.5" stroke="currentColor" fill="none"></circle>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5v.3a2 2 0 01-4 0v-.3a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H4a2 2 0 010-4h.3a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 012.8-2.8l.1.1a1.7 1.7 0 001.8.3h.3a1.7 1.7 0 001-1.5V4a2 2 0 014 0v.3a1.7 1.7 0 001 1.5h.3a1.7 1.7 0 001.8-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8v.3a1.7 1.7 0 001.5 1H20a2 2 0 010 4h-.3a1.7 1.7 0 00-1.5 1z"></path>
          </svg>
        );
      case 'message-circle':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6A8.38 8.38 0 0112.5 3c4.7 0 8.5 3.8 8.5 8.5z"></path>
          </svg>
        );
      case 'mic':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19v2m0 0h3m-3 0H9m6-2a6 6 0 10-12 0v.75a6 6 0 0012 0v-.75z" />
            <circle cx="12" cy="10" r="4" strokeWidth="1.5" stroke="currentColor" fill="none"></circle>
          </svg>
        );
      default:
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v12m6-6H6"></path>
          </svg>
        );
    }
  };

  return (
    <aside className={`bg-[#1a1a1a] fixed h-full top-0 left-0 pt-14 sm:pt-16 transition-all duration-500 ease-in-out ${isOpen ? 'w-64' : 'w-20'} z-40 shadow-xl shadow-black/50 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}> 
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f3cf1a] to-[#d4af37]"></div>
      
      <div className="h-full px-2 sm:px-3 py-4 sm:py-6 overflow-y-auto">
        {/* Desktop toggle button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-16 sm:top-20 bg-[#1a1a1a] border border-[#343535] rounded-full p-1.5 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#343535] hover:shadow-[0_0_10px_rgba(243,207,26,0.3)] hidden lg:block"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <svg className={`w-4 h-4 text-[#f3cf1a] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        {/* Mobile header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <span className="text-lg font-bold text-[#f3cf1a] flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            LegalAxis
          </span>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-white hover:text-[#f3cf1a] rounded-lg transition-colors duration-300"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <ul className="space-y-1 sm:space-y-2 font-medium">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center p-2 sm:p-3 rounded-xl transition-all duration-300 group no-underline ${isActive ? 'bg-[#343535] text-[#f3cf1a] border-l-4 border-[#f3cf1a] shadow-md' : 'text-white hover:bg-[#343535] hover:text-[#f3cf1a] border-l-4 border-transparent'} ${isOpen ? '' : 'lg:justify-center'}`
                }
                style={{ textDecoration: 'none' }}
              >
                {({ isActive }) => (
                  <>
                    <span className={`transition-all duration-300 transform flex-shrink-0 ${isActive ? 'text-[#f3cf1a] scale-110' : 'text-white group-hover:text-[#f3cf1a]'} ${hoveredItem === index ? 'scale-110' : ''}`}>
                      {renderIcon(item.icon)}
                    </span>
                    {(isOpen) && (
                      <span className="ml-3 font-medium text-sm sm:text-base truncate transition-all duration-300">
                        {item.name}
                      </span>
                    )}
                    {/* Tooltip for collapsed state */}
                    {!isOpen && (
                      <div className="absolute left-full ml-3 px-2 py-1 bg-[#343535] text-white text-sm rounded-md shadow-lg opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        {item.name}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        
        {/* Footer with version info */}
        <div className={`absolute bottom-4 left-0 right-0 px-4 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>
          <div className="border-t border-[#343535] pt-3">
            <p className="text-xs text-white/50 text-center">LegalAxis v2.1</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;