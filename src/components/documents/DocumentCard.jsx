// DocumentCard.jsx
const DocumentCard = ({ document }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-300';
      case 'Draft':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'Expired':
        return 'bg-red-500/20 text-red-300';
      case 'Under Review':
        return 'bg-blue-500/20 text-blue-300';
      case 'Expiring Soon':
        return 'bg-orange-500/20 text-orange-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getDocumentTypeIcon = (type) => {
    const iconClasses = "w-6 h-6 sm:w-8 sm:h-8";
    
    switch (type) {
      case 'Contract':
        return (
          <svg className={`${iconClasses} text-[#A9CEF4]`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        );
      case 'Agreement':
        return (
          <svg className={`${iconClasses} text-[#7EA0B7]`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
        );
      case 'Policy':
        return (
          <svg className={`${iconClasses} text-[#597081]`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        );
      case 'Legal Brief':
        return (
          <svg className={`${iconClasses} text-[#A9CEF4]`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
        );
      default:
        return (
          <svg className={`${iconClasses} text-gray-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        );
    }
  };

  return (
    <div className="card group hover:border-l-4 hover:border-l-[#A9CEF4] transition-all duration-300 animate-fadeIn">
      <div className="flex items-start">
        <div className="p-2 sm:p-3 bg-white/5 rounded-xl mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
          {getDocumentTypeIcon(document.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#A9CEF4] transition-colors duration-300 truncate">
              {document.name}
            </h3>
            <span className={`text-xs font-medium px-2 sm:px-3 py-1 rounded-full flex-shrink-0 ${getStatusColor(document.status)}`}>
              {document.status}
            </span>
          </div>
          <p className="text-gray-300 text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">{document.description}</p>
          
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
            {document.tags.map((tag, index) => (
              <span key={index} className="bg-white/5 text-gray-300 text-xs px-2 sm:px-3 py-1 rounded-full border border-white/10">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm text-gray-400 gap-2">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-[#7EA0B7] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="truncate">{document.lastUpdated}</span>
            </div>
            
            <div className="flex space-x-2 sm:space-x-3 self-end sm:self-center">
              <button className="text-gray-400 hover:text-[#A9CEF4] transition-colors duration-300 transform hover:scale-110 p-1" title="Edit">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              </button>
              <button className="text-gray-400 hover:text-[#A9CEF4] transition-colors duration-300 transform hover:scale-110 p-1" title="Download">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </button>
              <button className="text-gray-400 hover:text-[#A9CEF4] transition-colors duration-300 transform hover:scale-110 p-1" title="More options">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;