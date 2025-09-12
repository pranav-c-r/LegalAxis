import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <nav className="bg-[#1a1a1a]/95 backdrop-blur-md border-b border-[#343535] px-4 sm:px-6 py-3 sm:py-4 fixed w-full top-0 left-0 z-50 shadow-lg shadow-black/30">
      <div className="flex justify-between items-center">
        <div className="flex items-center min-w-0">
          <button 
            onClick={toggleSidebar}
            className="mr-3 sm:mr-4 text-[#f3cf1a] hover:text-white focus:outline-none lg:hidden transition-all duration-300 p-1 hover:bg-[#343535] rounded-lg"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <Link to="/" className="flex items-center min-w-0">
            <span className="text-xl sm:text-2xl font-bold text-[#f3cf1a] truncate flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              LegalAxis
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <input 
              type="text" 
              className="bg-[#2a2a2a] border border-[#343535] text-white text-sm rounded-xl focus:ring-2 focus:ring-[#f3cf1a]/30 focus:border-transparent block w-48 lg:w-64 pl-10 p-2.5 placeholder-[#a0a0a0] transition-all duration-300 hover:bg-[#2d2d2d] focus:bg-[#2d2d2d]" 
              placeholder="Search contracts, regulations..."
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-[#f3cf1a]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>

          

          {/* Mobile Search Button */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden text-[#f3cf1a] hover:text-white focus:outline-none transition-all duration-300 p-2 hover:bg-[#343535] rounded-lg"
            aria-label="Toggle search"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="text-[#f3cf1a] hover:text-white focus:outline-none transition-all duration-300 p-2 hover:bg-[#343535] rounded-lg relative"
              aria-label="Notifications"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1 text-xs font-bold leading-none text-[#1a1a1a] transform translate-x-1/2 -translate-y-1/2 bg-[#f3cf1a] rounded-full">3</span>
            </button>
            
            {isNotificationsOpen && (
              <div className="absolute top-full right-0 z-50 mt-2 bg-[#222222] border border-[#343535] rounded-xl shadow-lg shadow-black/50 w-80 sm:w-96 py-2">
                <div className="px-4 py-2 border-b border-[#343535]">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="px-4 py-3 hover:bg-[#343535] transition-colors duration-200">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-8 h-8 rounded-full bg-[#f3cf1a]/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-white">Compliance Alert</p>
                          <p className="text-xs text-[#a0a0a0] mt-1">GDPR update requires your attention</p>
                          <p className="text-xs text-[#f3cf1a] mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-[#343535]">
                  <button className="text-xs text-[#f3cf1a] hover:underline">View all notifications</button>
                </div>
              </div>
            )}
          </div>
          
          {/* User Profile */}
          <div className="relative">
            <button 
              type="button" 
              className="flex text-sm bg-[#f3cf1a] rounded-full focus:ring-2 focus:ring-[#f3cf1a]/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f3cf1a]/20"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-label="Open user menu"
            >
              <span className="sr-only">Open user menu</span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#f3cf1a] text-[#1a1a1a] font-bold text-sm sm:text-base">
                JD
              </div>
            </button>
            
            {isProfileOpen && (
              <div className="absolute top-full right-0 z-50 mt-2 bg-[#222222] border border-[#343535] rounded-xl shadow-lg shadow-black/50 w-48 sm:w-56 py-2">
                <div className="px-4 py-3 border-b border-[#343535]">
                  <span className="block text-sm text-white">John Doe</span>
                  <span className="block text-sm font-medium text-[#f3cf1a] truncate">john.doe@legalaxis.com</span>
                </div>
                <ul className="py-2">
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-[#343535] transition-all duration-300 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-[#343535] transition-colors duration-300 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-[#343535] transition-colors duration-300 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                      </svg>
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-[#343535]">
          <div className="relative">
            <input 
              type="text" 
              className="bg-[#2a2a2a] border border-[#343535] text-white text-sm rounded-xl focus:ring-2 focus:ring-[#f3cf1a]/30 focus:border-transparent block w-full pl-10 p-2.5 placeholder-[#a0a0a0] transition-all duration-300" 
              placeholder="Search contracts, regulations..."
              autoFocus
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-[#f3cf1a]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;