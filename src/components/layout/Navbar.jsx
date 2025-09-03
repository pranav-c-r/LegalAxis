// Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-white/5 backdrop-blur-sm border-b border-white/10 px-6 py-4 fixed w-full top-0 left-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-4 text-gray-400 hover:text-white focus:outline-none md:hidden transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-bold whitespace-nowrap bg-gradient-to-r from-[#A9CEF4] to-[#7EA0B7] bg-clip-text text-transparent">
              LegalAxis
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              className="bg-white/5 border border-white/10 text-white text-sm rounded-xl focus:ring-2 focus:ring-[#A9CEF4] focus:border-transparent block w-64 pl-10 p-2.5 placeholder-gray-400" 
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <button 
              type="button" 
              className="flex text-sm bg-gradient-to-br from-[#A9CEF4] to-[#7EA0B7] rounded-full focus:ring-2 focus:ring-[#A9CEF4] transition-transform duration-300 hover:scale-105"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg">
                JD
              </div>
            </button>
            
            {isProfileOpen && (
              <div className="absolute top-12 right-0 z-50 my-4 text-base list-none bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg divide-y divide-white/10 animate-fadeIn">
                <div className="px-4 py-3">
                  <span className="block text-sm text-white">John Doe</span>
                  <span className="block text-sm font-medium text-gray-400 truncate">john.doe@legalaxis.com</span>
                </div>
                <ul className="py-2">
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-300">Profile</a>
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
    </nav>
  );
};

export default Navbar;