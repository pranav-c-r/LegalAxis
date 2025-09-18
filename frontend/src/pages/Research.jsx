import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const CAPAPI_TOKEN = import.meta.env.VITE_CAPAPI_TOKEN;
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const Research = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // Gemini AI: get intent and summary using SDK
  async function askGemini(prompt) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: { responseMimeType: "text/plain" },
      });
      const raw = result?.response ? await result.response.text() : JSON.stringify(result);
      return raw;
    } catch (err) {
      throw new Error("Gemini SDK error: " + err.message);
    }
  }

  // CourtListener API v4
  async function searchCourtListener(intent) {
    const url = `https://www.courtlistener.com/api/rest/v4/search/?q=${encodeURIComponent(intent)}`;
    const res = await fetch(url, {
      headers: { 'Authorization': 'Token ' + import.meta.env.VITE_COURTLISTENER_TOKEN }
    });
    if (!res.ok) throw new Error('CourtListener API error');
    const data = await res.json();
    return data.results || [];
  }

  // CourtListener People API v4
  async function searchCourtListenerPeople(personQuery) {
    const url = `https://www.courtlistener.com/api/rest/v4/people/?q=${encodeURIComponent(personQuery)}`;
    const res = await fetch(url, {
      headers: { 'Authorization': 'Token ' + import.meta.env.VITE_COURTLISTENER_TOKEN }
    });
    if (!res.ok) throw new Error('CourtListener People API error');
    const data = await res.json();
    return data.results || [];
  }

  // CAPAPI (disabled due to CORS)
  // async function searchCAPAPI(intent) {
  //   const url = `https://api.case.law/v1/cases/?search=${encodeURIComponent(intent)}&page_size=3`;
  //   const res = await fetch(url, {
  //     headers: { 'Authorization': 'Token ' + CAPAPI_TOKEN }
  //   });
  //   if (!res.ok) throw new Error('CAPAPI error');
  //   const data = await res.json();
  //   return data.results || [];
  // }

  // Main handler
  const handleResearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      // 1. Get AI intent
      const intentPrompt = `Extract the legal research intent from this query: ${query}`;
      const intent = await askGemini(intentPrompt);
      // 2. Search CourtListener opinions
      const courtListenerResults = await searchCourtListener(intent);
      // 3. Search CourtListener people (using raw query)
      const peopleResults = await searchCourtListenerPeople(query);
      // 4. Summarize and cite using Gemini SDK
      const allCases = [
        ...courtListenerResults.map(r => ({
          caseName: r.caseName || r.caseNameFull || r.name || 'Unknown',
          summary: r.casebody?.data?.opinions?.[0]?.text?.slice(0, 300) || r.cite || '',
          citation: r.cite || r.citations?.[0]?.cite || '',
          confidence: 90,
          url: r.absolute_url ? `https://www.courtlistener.com${r.absolute_url}` : '#',
          type: 'opinion'
        })),
        ...peopleResults.map(p => ({
          caseName: p.name || p.display_name || 'Unknown Person',
          summary: p.bio || '',
          citation: p.position || '',
          confidence: 90,
          url: p.resource_uri ? `https://www.courtlistener.com${p.resource_uri}` : '#',
          type: 'person'
        }))
      ];
      // Use Gemini SDK to summarize each case/person
      const summarized = await Promise.all(allCases.map(async (item) => {
        const summaryPrompt = item.type === 'person'
          ? `Summarize this legal person in plain English and cite their role: ${item.caseName}. Details: ${item.summary}`
          : `Summarize this case in plain English and cite it: ${item.caseName}. Details: ${item.summary}`;
        let aiSummary = '';
        try {
          aiSummary = await askGemini(summaryPrompt);
        } catch {
          aiSummary = item.summary;
        }
        return { ...item, summary: aiSummary };
      }));
      setResults(summarized);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] p-4 sm:p-6 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white mb-4">Legal Research Agent</h1>
        <div className="bg-[#242424] p-6 rounded-lg mb-6">
          <textarea
            className="w-full h-24 p-3 rounded-lg bg-[#2c2c2c] text-white border border-[#f3cf1a] mb-4"
            placeholder="Type a case name or scenario..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-[#f3cf1a] text-[#1a1a1a] font-medium rounded-lg hover:bg-[#f3cf1a]/90 transition"
            onClick={handleResearch}
            disabled={loading || !query.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{error}</div>
        )}
        {results.length > 0 && (
          <div className="space-y-6">
            {results.map((item, idx) => (
              <div key={idx} className="bg-[#242424] p-5 rounded-lg ring-1 ring-white/5">
                <h3 className="font-bold text-lg text-[#f3cf1a] mb-2">{item.caseName}</h3>
                <p className="text-gray-300 mb-2">{item.summary}</p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-xs text-gray-400">Cited in: {item.citation}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#f3cf1a]/20 text-[#f3cf1a]">{item.confidence}% Confidence</span>
                  <a href={item.url} className="text-xs text-[#f3cf1a] hover:underline" target="_blank" rel="noopener noreferrer">View Case</a>
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
