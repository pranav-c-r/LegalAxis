import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const COURTLISTENER_ENDPOINTS = {
  search: "https://www.courtlistener.com/api/rest/v4/search/",
  dockets: "https://www.courtlistener.com/api/rest/v4/dockets/",
  opinions: "https://www.courtlistener.com/api/rest/v4/opinions/",
  people: "https://www.courtlistener.com/api/rest/v4/people/",
  courts: "https://www.courtlistener.com/api/rest/v4/courts/",
  clusters: "https://www.courtlistener.com/api/rest/v4/clusters/",
  audio: "https://www.courtlistener.com/api/rest/v4/audio/",
};

const Research = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [apiType, setApiType] = useState('search');

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  // Sleep helper for rate limiting
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Gemini AI with error handling
  async function askGemini(prompt) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      return result.response?.text?.() || '';
    } catch (err) {
      console.error("Gemini error:", err.message);
      return '';
    }
  }

  // Fetch from CourtListener API
  async function fetchCourtListenerApi(type, q) {
    try {
      const endpoint = COURTLISTENER_ENDPOINTS[type];
      if (!endpoint) throw new Error('Invalid API type');
      
      const url = new URL(endpoint);
      url.searchParams.append('q', q);
      url.searchParams.append('limit', '5');
      
      const res = await fetch(url.toString(), {
        headers: { 
          'Authorization': `Token ${import.meta.env.VITE_COURTLISTENER_TOKEN}`
        }
      });
      
      if (!res.ok) throw new Error(`CourtListener API error: ${res.status}`);
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error("CourtListener fetch error:", err);
      throw err;
    }
  }

  // Extract title based on API type
  function extractTitle(item, apiType) {
    if (apiType === 'people') {
      return item.name || 'Untitled';
    }
    if (apiType === 'search' || apiType === 'opinions' || apiType === 'clusters') {
      return item.caseName || item.case_name || item.name || item.title || 'Untitled Case';
    }
    if (apiType === 'dockets') {
      return item.case_name || item.name || item.title || 'Untitled';
    }
    if (apiType === 'courts') {
      return item.full_name || item.name || 'Untitled';
    }
    if (apiType === 'audio') {
      return item.case_name || item.name || item.title || 'Untitled';
    }
    return item.name || item.title || item.caseName || 'Untitled';
  }

  // Extract proper CourtListener URL
  function extractUrl(item, apiType) {
    // Prefer absolute_url which should be full URL to CourtListener
    if (item.absolute_url) {
      // Make sure it's not a relative URL
      if (item.absolute_url.startsWith('http')) {
        return item.absolute_url;
      }
      // If relative, build full URL
      return 'https://www.courtlistener.com' + item.absolute_url;
    }
    // Fallback to url field
    if (item.url) {
      if (item.url.startsWith('http')) {
        return item.url;
      }
      return 'https://www.courtlistener.com' + item.url;
    }
    return null;
  }

  // Format results without Gemini
  async function formatResults(apiResults, type) {
    return apiResults.map(item => {
      let title = extractTitle(item, type);
      let summary = '';
      let citation = '';
      let court = '';
      let date = '';
      let url = '';

      if (type === 'search' || type === 'opinions' || type === 'clusters') {
        summary = item.summary || item.snippet || '';
        citation = item.citation || '';
        court = item.court_name || '';
        date = item.date_filed || item.date || '';
        url = extractUrl(item, type);
      } else if (type === 'people') {
        summary = item.title || `${item.position_title || 'Professional'} in ${item.school_name || 'Legal Field'}`;
        citation = item.id || '';
        url = extractUrl(item, type);
      } else if (type === 'dockets') {
        summary = item.docket_number || '';
        citation = item.id || '';
        court = item.court_name || '';
        date = item.date_filed || '';
        url = extractUrl(item, type);
      } else if (type === 'courts') {
        summary = item.full_name || '';
        citation = item.id || '';
        url = extractUrl(item, type);
      } else if (type === 'audio') {
        summary = item.description || '';
        citation = item.id || '';
        date = item.date_heard || '';
        url = extractUrl(item, type);
      }

      return {
        title,
        summary,
        citation,
        court,
        date,
        url,
        type,
        _raw: item,
        summarizing: false
      };
    });
  }

  // Main handler
  const handleResearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    
    try {
      if (!query.trim()) {
        setError('Please enter a search query');
        setLoading(false);
        return;
      }

      // Fetch from CourtListener
      const apiResults = await fetchCourtListenerApi(apiType, query);
      
      if (apiResults.length === 0) {
        setError('No results found. Try a different query or API type.');
        setLoading(false);
        return;
      }

      // Format results WITHOUT calling Gemini
      const formatted = await formatResults(apiResults, apiType);
      setResults(formatted);
    } catch (err) {
      setError(err.message || 'Search failed. Check your API keys and try again.');
    } finally {
      setLoading(false);
    }
  };

  // On-demand summarization with rate limiting
  async function handleSummarize(idx) {
    const item = results[idx];
    
    setResults(prev => prev.map((r, i) => 
      i === idx ? { ...r, summarizing: true } : r
    ));

    try {
      await sleep(500); // Rate limit: wait 500ms
      
      const prompt = `Summarize this legal information in 2-3 sentences:\n\nTitle: ${item.title}\n\nInfo: ${JSON.stringify(item._raw).slice(0, 1000)}`;
      const summary = await askGemini(prompt);
      
      setResults(prev => prev.map((r, i) => 
        i === idx ? { ...r, summary: summary || 'Could not generate summary', summarizing: false } : r
      ));
    } catch (err) {
      setResults(prev => prev.map((r, i) => 
        i === idx ? { ...r, summary: 'Summarization failed', summarizing: false } : r
      ));
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] p-4 sm:p-6 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white mb-4">Legal Research Agent</h1>
        
        <div className="bg-[#242424] p-6 rounded-lg mb-6">
          <div className="mb-4 flex flex-col sm:flex-row gap-3">
            <textarea
              className="flex-1 h-24 p-3 rounded-lg bg-[#2c2c2c] text-white border border-[#f3cf1a] focus:outline-none focus:border-[#ffe066]"
              placeholder="Enter case name, party name, or legal query..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <select
              className="bg-[#2c2c2c] text-white border border-[#f3cf1a] rounded-lg p-2 focus:outline-none"
              value={apiType}
              onChange={e => setApiType(e.target.value)}
            >
              {Object.keys(COURTLISTENER_ENDPOINTS).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          
          <button
            className="px-6 py-2 bg-[#f3cf1a] text-[#1a1a1a] font-medium rounded-lg hover:bg-[#ffe066] transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleResearch}
            disabled={loading || !query.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">Found {results.length} result(s)</p>
            {results.map((item, idx) => (
              <div key={idx} className="bg-[#242424] p-5 rounded-lg border border-white/10 hover:border-[#f3cf1a]/30 transition">
                <h3 className="font-bold text-lg text-[#f3cf1a] mb-3 line-clamp-2">
                  {item.title}
                </h3>
                
                <div className="text-sm text-gray-400 mb-4 space-y-1">
                  {item.citation && <p><span className="text-gray-500">ID:</span> {item.citation}</p>}
                  {item.court && <p><span className="text-gray-500">Court:</span> {item.court}</p>}
                  {item.date && <p><span className="text-gray-500">Date:</span> {item.date}</p>}
                </div>

                {item.summary ? (
                  <p className="text-gray-200 mb-4 text-sm leading-relaxed">{item.summary}</p>
                ) : (
                  <button
                    className="text-xs px-4 py-2 bg-[#f3cf1a] text-black rounded hover:bg-[#ffe066] mb-4 font-medium disabled:opacity-50"
                    onClick={() => handleSummarize(idx)}
                    disabled={item.summarizing}
                  >
                    {item.summarizing ? 'Summarizing...' : 'Summarize'}
                  </button>
                )}

                {item.url && (
                  <a
                    href={item.url}
                    className="text-xs text-[#f3cf1a] hover:text-[#ffe066] px-3 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Full Result →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && results.length === 0 && !error && (
          <div className="text-center text-gray-500 py-12">
            Enter a search query to begin legal research
          </div>
        )}
      </div>
    </div>
  );
};

export default Research;