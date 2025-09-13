import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setLoaded(true);
  }, []);

  return (
  <div className="min-h-screen bg-[#010101] text-[#FFFFFF] font-sans overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#f3cf1a]/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#f3cf1a]/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(52, 53, 53, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(52, 53, 53, 0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero section */}
        <section className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <div className={`bg-[#222222] rounded-2xl p-8 md:p-12 max-w-4xl border border-[#343535] transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} shadow-xl`}>
            <div className="mb-8 animate-float">
              <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10L70 30H30L50 10Z" fill="#f3cf1a"/>
                <rect x="30" y="30" width="40" height="50" rx="5" stroke="#f3cf1a" strokeWidth="5"/>
                <path d="M40 45H60M40 55H60M40 65H60" stroke="#f3cf1a" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-[#f3cf1a] transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Welcome to LegalAxis
            </h1>
            
            <p className={`mb-8 text-lg md:text-xl text-[#e0e0e0] max-w-2xl mx-auto transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Your <span className="text-primary font-semibold">agentic AI legal co-pilot</span> that doesn't just summarize contracts — it enforces compliance, tracks obligations, simulates disputes, negotiates terms, and prevents risks.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link to="/login" className="bg-[#f3cf1a] text-[#010101] px-6 py-3 rounded-lg font-semibold hover:bg-[#f3cf1a]/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Login
              </Link>
              <Link to="/signup" className="bg-[#222222] border border-[#f3cf1a] text-[#f3cf1a] px-6 py-3 rounded-lg font-semibold hover:bg-[#f3cf1a] hover:text-[#010101] transition-all duration-300 transform hover:-translate-y-1">
                Sign Up
              </Link>
            </div>
          </div>
        </section>

        {/* Agent features section */}
        <section className="my-24">
          <h2 className={`text-3xl font-bold text-center mb-16 text-[#f3cf1a] transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            Your Digital Legal Department
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Agent Card 1 */}
            <div className={`agent-card bg-[#222222] rounded-xl p-6 border border-[#343535] transition-all duration-500 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-12 h-12 rounded-full bg-[#f3cf1a]/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#f3cf1a]">Compliance Guardian</h3>
              <p className="text-[#a0a0a0]">Continuously validates clauses against real-time legal databases & new regulations.</p>
            </div>
            
            {/* Agent Card 2 */}
            <div className={`agent-card bg-[#222222] rounded-xl p-6 border border-[#343535] transition-all duration-500 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-12 h-12 rounded-full bg-[#f3cf1a]/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#f3cf1a]">Deadline Tracker</h3>
              <p className="text-[#a0a0a0]">Extracts commitments from contracts and auto-creates reminders before deadlines.</p>
            </div>
            
            {/* Agent Card 3 */}
            <div className={`agent-card bg-[#222222] rounded-xl p-6 border border-[#343535] transition-all duration-500 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-12 h-12 rounded-full bg-[#f3cf1a]/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#f3cf1a]">Risk Analyzer</h3>
              <p className="text-[#a0a0a0]">Scores each clause for risk, fairness, and unusual terms with visual heatmaps.</p>
            </div>
            
            {/* Agent Card 4 */}
            <div className={`agent-card bg-[#222222] rounded-xl p-6 border border-[#343535] transition-all duration-500 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-12 h-12 rounded-full bg-[#f3cf1a]/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#f3cf1a]">Negotiation Strategist</h3>
              <p className="text-[#a0a0a0]">Detects negotiable clauses and generates counter-proposals with balanced alternatives.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="my-24 text-center">
          <div className={`bg-[#222222] rounded-2xl p-8 md:p-10 border border-[#343535] transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} shadow-xl`}>
            <h2 className="text-3xl font-bold mb-6 text-[#f3cf1a]">Ready to Transform Your Legal Workflow?</h2>
            <p className="mb-8 text-xl text-[#e0e0e0] max-w-2xl mx-auto">Join thousands of professionals who trust LegalAxis to manage their legal documents and compliance.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="bg-[#f3cf1a] text-[#010101] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#f3cf1a]/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Start Free Trial
              </Link>
              <Link to="/demo" className="bg-[#222222] border border-[#f3cf1a] text-[#f3cf1a] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#f3cf1a] hover:text-[#010101] transition-all duration-300 transform hover:-translate-y-1">
                Schedule a Demo
              </Link>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .agent-card {
          transition: all 0.3s ease;
        }
        
        .agent-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Landing;