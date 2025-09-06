// Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="bg-[#1B1725]/80 backdrop-blur-md border-b border-[#A1E8AF]/10 px-3 sm:px-6 py-3 sm:py-4 fixed w-full top-0 left-0 z-50 shadow-lg shadow-black/10">
      <div className="flex justify-between items-center">
        <div className="flex items-center min-w-0">
          <button 
            onClick={toggleSidebar}
            className="mr-2 sm:mr-4 text-gray-400 hover:text-white focus:outline-none lg:hidden transition-colors duration-300 p-1"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <Link to="/" className="flex items-center min-w-0">
            <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#A1E8AF] to-[#3A7CA5] bg-clip-text text-transparent hover:from-[#3A7CA5] hover:to-[#A1E8AF] transition-all duration-500 truncate">
              LegalAxis
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <input 
              type="text" 
              className="bg-[#A1E8AF]/5 border border-[#A1E8AF]/10 text-white text-sm rounded-xl focus:ring-2 focus:ring-[#A1E8AF]/30 focus:border-transparent block w-48 lg:w-64 pl-10 p-2.5 placeholder-gray-400 transition-all duration-300 hover:bg-[#A1E8AF]/10" 
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>

          {/* Mobile Search Button */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden text-gray-400 hover:text-white focus:outline-none transition-colors duration-300 p-2"
            aria-label="Toggle search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          
          <div className="relative">
            <button 
              type="button" 
              className="flex text-sm bg-gradient-to-br from-[#A1E8AF] to-[#3A7CA5] rounded-full focus:ring-2 focus:ring-[#FFF07C] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#A1E8AF]/20"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-label="Open user menu"
            >
              <span className="sr-only">Open user menu</span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                JD
              </div>
            </button>
            
            {isProfileOpen && (
              <div className="absolute top-12 right-0 z-50 my-4 text-base list-none bg-[#1B1725]/90 backdrop-blur-md border border-[#A1E8AF]/10 rounded-xl shadow-lg shadow-black/20 divide-y divide-[#A1E8AF]/10 animate-fadeIn w-48 sm:w-56">
                <div className="px-4 py-3">
                  <span className="block text-sm text-white">John Doe</span>
                  <span className="block text-sm font-medium text-gray-400 truncate">john.doe@legalaxis.com</span>
                </div>
                <ul className="py-2">
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-[#A1E8AF] hover:bg-[#A1E8AF]/5 transition-all duration-300">Profile</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-300">Settings</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-300">Sign out</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-[#A1E8AF]/10">
          <div className="relative">
            <input 
              type="text" 
              className="bg-[#A1E8AF]/5 border border-[#A1E8AF]/10 text-white text-sm rounded-xl focus:ring-2 focus:ring-[#A1E8AF]/30 focus:border-transparent block w-full pl-10 p-2.5 placeholder-gray-400 transition-all duration-300 hover:bg-[#A1E8AF]/10" 
              placeholder="Search..."
              autoFocus
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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