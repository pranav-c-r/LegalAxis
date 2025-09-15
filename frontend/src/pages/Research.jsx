import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../context/UserAuthContext';

const Research = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const db = getFirestore();

  // Function to analyze text and find relevant case law
  const analyzeLegalText = async (text) => {
    setLoading(true);
    setError(null);
    
    try {
      // Split text into clauses (simple split by periods for demo)
      const clauses = text.split('.').filter(clause => clause.trim().length > 0);
      
      // Process each clause
      const processedClauses = await Promise.all(clauses.map(async (clause, index) => {
        // Call CAPAPI to search for relevant cases
        const searchQuery = encodeURIComponent(clause);
        const response = await fetch(
          `https://api.case.law/v1/cases/?search=${searchQuery}&full_case=true`,
          {
            headers: {
              'Authorization': 'Token ' + import.meta.env.VITE_CAPAPI_TOKEN
            }
          }
        );

        if (!response.ok) throw new Error('Failed to fetch from Case Law API');
        
        const data = await response.json();
        
        // Calculate confidence score based on number of citations and relevance
        const citations = data.results.slice(0, 5).map(result => ({
          case_name: result.name_abbreviation,
          citation: result.citations[0]?.cite || 'No citation available',
          year: result.decision_date?.slice(0, 4) || 'Year unknown',
          url: result.url,
          snippet: result.preview,  // Preview text showing relevance
          relevance_score: calculateRelevanceScore(clause, result.preview || '')
        }));

        const confidenceScore = calculateConfidenceScore(citations);

        return {
          clause: clause.trim(),
          citations,
          confidenceScore
        };
      }));

      // Save analysis to Firestore
      if (currentUser) {
        await addDoc(collection(db, 'legal_research'), {
          userId: currentUser.uid,
          timestamp: new Date(),
          originalText: text,
          analysis: processedClauses
        });
      }

      setResults(processedClauses);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate relevance score between clause and case preview
  const calculateRelevanceScore = (clause, preview) => {
    const clauseWords = new Set(clause.toLowerCase().split(' '));
    const previewWords = preview.toLowerCase().split(' ');
    let matchCount = 0;
    
    previewWords.forEach(word => {
      if (clauseWords.has(word)) matchCount++;
    });
    
    return (matchCount / clauseWords.size) * 100;
  };

  // Calculate overall confidence score based on citations
  const calculateConfidenceScore = (citations) => {
    if (citations.length === 0) return 0;
    
    const avgRelevance = citations.reduce((sum, citation) => 
      sum + citation.relevance_score, 0) / citations.length;
    
    // Weight based on number of citations and average relevance
    return Math.min(
      ((citations.length / 5) * 0.5 + (avgRelevance / 100) * 0.5) * 100,
      100
    );
  };

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">Legal Research Assistant</h1>
        
        {/* Input Section */}
        <div className="mb-8">
          <textarea
            className="w-full h-48 p-4 bg-box text-text border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your legal text or contract clause here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-yellow-400 transition"
            onClick={() => analyzeLegalText(text)}
            disabled={loading || !text.trim()}
          >
            {loading ? 'Analyzing...' : 'Analyze Text'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Results Section */}
        {results && (
          <div className="space-y-8">
            {results.map((result, index) => (
              <div key={index} className="bg-box p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-primary">Clause {index + 1}:</h3>
                  <p className="text-text">{result.clause}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-primary">Confidence Score:</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${result.confidenceScore}%` }}
                      />
                    </div>
                    <span className="text-sm text-text">
                      {Math.round(result.confidenceScore)}%
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-primary mb-2">Relevant Cases:</h4>
                  <div className="space-y-4">
                    {result.citations.map((citation, citIndex) => (
                      <div key={citIndex} className="border-l-4 border-primary pl-4">
                        <h5 className="font-medium">{citation.case_name} ({citation.year})</h5>
                        <p className="text-sm text-gray-600">{citation.citation}</p>
                        <p className="text-sm mt-1">{citation.snippet}</p>
                        <div className="mt-1 text-sm">
                          <span className="text-primary">Relevance: </span>
                          {Math.round(citation.relevance_score)}%
                        </div>
                        <a
                          href={citation.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          View Case
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Research;