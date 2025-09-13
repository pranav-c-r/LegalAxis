// Footer.jsx
const Footer = ({ sidebarOpen, isMobile }) => {
  return (
    <footer className={`bg-[#000000] border-t border-iconbg/20 p-3 sm:p-4 lg:p-6 mt-auto backdrop-blur-md shadow-lg shadow-black/20 transition-all duration-500 ease-in-out ${
      sidebarOpen && !isMobile ? 'lg:ml-64' : 'lg:ml-20'
    }`}>
      <div className="container mx-auto max-w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs sm:text-sm  text-white font-light">© 2025 <span className=" text-white font-medium">LegalAxis</span>. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end space-x-3 sm:space-x-6">
            <a href="#" className="text-xs sm:text-sm text-textcolor/70 hover:text-iconbg transition-all duration-300 hover:scale-105 inline-block whitespace-nowrap">Privacy Policy</a>
            <a href="#" className="text-xs sm:text-sm text-textcolor/70 hover:text-iconbg transition-all duration-300 hover:scale-105 inline-block whitespace-nowrap">Terms of Service</a>
            <a href="#" className="text-xs sm:text-sm text-textcolor/70 hover:text-iconbg transition-all duration-300 hover:scale-105 inline-block whitespace-nowrap">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;