const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 p-4 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-sm text-gray-500">© 2025 LegalAxis. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-quaternary">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-quaternary">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-quaternary">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;