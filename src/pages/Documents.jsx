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
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-quaternary">Document Management</h1>
        <p className="text-gray-600">Upload, organize, and manage all your legal documents.</p>
      </div>
      
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="text" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full pl-10 p-2.5" 
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <select 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block p-2.5"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {documentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block p-2.5"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            
            <button className="btn-primary flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Upload Document
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))
        ) : (
          <div className="col-span-2 card flex flex-col items-center justify-center py-12">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-500 text-center max-w-md mb-6">We couldn't find any documents matching your search criteria. Try adjusting your filters or upload a new document.</p>
            <button className="btn-primary">
              Upload Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;