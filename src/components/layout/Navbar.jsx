import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-quaternary/95 border-b border-tertiary/30 px-4 py-2.5 fixed w-full top-0 left-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-2 text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary">LegalAxis</span>
          </Link>
        </div>
        
        <div className="flex items-center">
          <div className="relative mr-4">
            <input 
              type="text" 
              className="bg-quaternary/80 border border-tertiary/50 text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5" 
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-tertiary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
          
          <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <span className="sr-only">Open user menu</span>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white font-medium">JD</div>
          </button>
          
          {isProfileOpen && (
            <div className="absolute top-12 right-4 z-50 my-4 text-base list-none bg-quaternary/90 divide-y divide-tertiary/30 rounded shadow border border-tertiary/20">
              <div className="px-4 py-3">
                <span className="block text-sm text-primary">John Doe</span>
                <span className="block text-sm font-medium text-tertiary truncate">john.doe@legalaxis.com</span>
              </div>
              <ul className="py-1">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-tertiary hover:bg-tertiary/20 hover:text-primary">Profile</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-tertiary hover:bg-tertiary/20 hover:text-primary">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-tertiary hover:bg-tertiary/20 hover:text-primary">Sign out</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;