// Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-[#1B1725]/80 border-t border-[#A1E8AF]/10 p-6 mt-auto backdrop-blur-md shadow-lg shadow-black/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-sm text-gray-400 font-light">© 2025 <span className="text-[#A1E8AF] font-medium">LegalAxis</span>. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-400 hover:text-[#FFF07C] transition-all duration-300 hover:scale-105 inline-block">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#FFF07C] transition-all duration-300 hover:scale-105 inline-block">Terms of Service</a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#FFF07C] transition-all duration-300 hover:scale-105 inline-block">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;