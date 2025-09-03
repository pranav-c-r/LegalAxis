// Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-white/5 border-t border-white/10 p-6 mt-auto backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-sm text-gray-400">© 2025 LegalAxis. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-400 hover:text-[#A9CEF4] transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#A9CEF4] transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#A9CEF4] transition-colors duration-300">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;