// Documents.jsx
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
    <div className="space-y-6 sm:space-y-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-iconbg">
          Document Management
        </h1>
        <p className="text-textcolor/70 mt-2 text-sm sm:text-base">Upload, organize, and manage all your legal documents.</p>
      </div>
      
      <div className="card mb-6 sm:mb-8">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-textcolor/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="text" 
              className="bg-greybg border border-textcolor/10 text-textcolor text-sm rounded-xl focus:ring-2 focus:ring-iconbg focus:border-transparent block w-full pl-8 sm:pl-10 p-2.5 sm:p-3 placeholder-textcolor/40" 
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select 
              className="bg-greybg border border-textcolor/10 text-textcolor text-sm rounded-xl focus:ring-2 focus:ring-iconbg focus:border-transparent p-2.5 sm:p-3 flex-1 sm:flex-none"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {documentTypes.map((type) => (
                <option key={type} value={type} className="bg-greybg text-textcolor">{type}</option>
              ))}
            </select>
            
            <select 
              className="bg-greybg border border-textcolor/10 text-textcolor text-sm rounded-xl focus:ring-2 focus:ring-iconbg focus:border-transparent p-2.5 sm:p-3 flex-1 sm:flex-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status} className="bg-greybg text-textcolor">{status}</option>
              ))}
            </select>
            
            <button className="btn-primary flex items-center justify-center whitespace-nowrap p-2.5 sm:p-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span className="text-sm sm:text-base">Upload Document</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))
        ) : (
          <div className="xl:col-span-2 card flex flex-col items-center justify-center py-12 sm:py-16 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-greybg rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-textcolor/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-textcolor mb-2 sm:mb-3">No documents found</h3>
            <p className="text-textcolor/70 max-w-md mb-4 sm:mb-6 text-sm sm:text-base px-4">We couldn't find any documents matching your search criteria. Try adjusting your filters or upload a new document.</p>
            <button className="btn-primary flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Upload Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;