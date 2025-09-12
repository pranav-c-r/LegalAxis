import { useState } from 'react';
import DocumentCard from '../components/documents/DocumentCard';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const documents = [
    {
      id: 1,
      name: 'Service Agreement - TechCorp',
      description: 'IT services agreement with TechCorp Inc. covering software development and maintenance.',
      type: 'Contract',
      status: 'Active',
      tags: ['IT', 'Services', 'High Value'],
      lastUpdated: 'Updated 2 days ago',
    },
    {
      id: 2,
      name: 'Privacy Policy v2.1',
      description: 'Updated privacy policy reflecting latest data protection regulations and compliance requirements.',
      type: 'Policy',
      status: 'Under Review',
      tags: ['Compliance', 'GDPR', 'Privacy'],
      lastUpdated: 'Updated 1 week ago',
    },
    {
      id: 3,
      name: 'Vendor Contract - SupplyChain Inc',
      description: 'Supply agreement for raw materials and components with quarterly delivery schedule.',
      type: 'Contract',
      status: 'Active',
      tags: ['Supply Chain', 'Procurement'],
      lastUpdated: 'Updated 2 weeks ago',
    },
    {
      id: 4,
      name: 'Office Lease Agreement',
      description: 'Commercial property lease for headquarters office space with renewal options.',
      type: 'Agreement',
      status: 'Expiring Soon',
      tags: ['Real Estate', 'Facilities'],
      lastUpdated: 'Updated 1 month ago',
    },
    {
      id: 5,
      name: 'Employee Handbook 2025',
      description: 'Company policies, procedures, and guidelines for all employees.',
      type: 'Policy',
      status: 'Draft',
      tags: ['HR', 'Internal'],
      lastUpdated: 'Updated 3 days ago',
    },
    {
      id: 6,
      name: 'Patent Application - Smart Contract System',
      description: 'Patent filing for proprietary smart contract validation and execution system.',
      type: 'Legal Brief',
      status: 'Active',
      tags: ['IP', 'Patents', 'Blockchain'],
      lastUpdated: 'Updated 2 months ago',
    },
  ];
  
  const documentTypes = ['All', 'Contract', 'Agreement', 'Policy', 'Legal Brief'];
  const statusOptions = ['All', 'Active', 'Draft', 'Expired', 'Under Review', 'Expiring Soon'];
  
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || doc.type === filterType;
    const matchesStatus = filterStatus === 'All' || doc.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#000000] text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f3cf1a]/10 rounded-full blur-xl"></div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white relative">
              Document Management
              <span className="block w-16 h-1 bg-[#f3cf1a] mt-2 rounded-full"></span>
            </h1>
            <p className="text-[#e0e0e0] mt-3 text-base">Upload, organize, and manage all your legal documents.</p>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-[#222222] rounded-2xl p-5 sm:p-6 border border-[#343535] shadow-lg mb-6 sm:mb-8">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-[#a0a0a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                type="text" 
                className="bg-[#2a2a2a] border border-[#343535] text-white text-sm rounded-xl focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent block w-full pl-10 p-3 placeholder-[#a0a0a0] transition-all duration-300" 
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <select 
                className="bg-[#2a2a2a] border border-[#343535] text-white text-sm rounded-xl focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent p-3 flex-1 sm:flex-none transition-all duration-300"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {documentTypes.map((type) => (
                  <option key={type} value={type} className="bg-[#2a2a2a] text-white">{type}</option>
                ))}
              </select>
              
              <select 
                className="bg-[#2a2a2a] border border-[#343535] text-white text-sm rounded-xl focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent p-3 flex-1 sm:flex-none transition-all duration-300"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status} className="bg-[#2a2a2a] text-white">{status}</option>
                ))}
              </select>
              
              <button className="px-4 py-3 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 flex items-center justify-center whitespace-nowrap">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span className="text-sm sm:text-base">Upload Document</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Documents Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))
          ) : (
            <div className="xl:col-span-2 bg-[#222222] rounded-2xl p-8 border border-[#343535] shadow-lg flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-[#2a2a2a] rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-[#a0a0a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">No documents found</h3>
              <p className="text-[#a0a0a0] max-w-md mb-6 px-4">We couldn't find any documents matching your search criteria. Try adjusting your filters or upload a new document.</p>
              <button className="px-4 py-3 bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#1a1a1a] font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#f3cf1a]/20 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Upload Document
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;