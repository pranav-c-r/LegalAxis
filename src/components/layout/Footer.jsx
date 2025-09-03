const Footer = () => {
  return (
    <footer className="bg-quaternary/95 border-t border-tertiary/30 p-4 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-sm text-tertiary">© 2025 LegalAxis. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-tertiary hover:text-primary">Privacy Policy</a>
            <a href="#" className="text-sm text-tertiary hover:text-primary">Terms of Service</a>
            <a href="#" className="text-sm text-tertiary hover:text-primary">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;