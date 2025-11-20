import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#f3cf1a]/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#f3cf1a]/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#f3cf1a]/5 rounded-full blur-3xl animate-pulse-slow animation-delay-3000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 z-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(243, 207, 26, 0.1) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <svg className="w-8 h-8 mr-3 text-[#f3cf1a]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10L70 30H30L50 10Z" fill="#f3cf1a"/>
              <rect x="30" y="30" width="40" height="50" rx="5" stroke="#f3cf1a" strokeWidth="5"/>
              <path d="M40 45H60M40 55H60M40 65H60" stroke="#f3cf1a" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <span className="text-2xl font-bold text-[#f3cf1a]">LegalAxis</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-[#e0e0e0] hover:text-[#f3cf1a] transition-colors duration-300">Features</a>
            <a href="#pricing" className="text-[#e0e0e0] hover:text-[#f3cf1a] transition-colors duration-300">Pricing</a>
            <a href="#contact" className="text-[#e0e0e0] hover:text-[#f3cf1a] transition-colors duration-300">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-[#e0e0e0] hover:text-[#f3cf1a] transition-colors duration-300">Login</Link>
            <Link to="/signup" className="bg-[#f3cf1a] text-[#0a0a0a] px-4 py-2 rounded-lg font-medium hover:bg-[#f3cf1a]/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero section */}
        <section className="flex flex-col items-center justify-center min-h-[80vh] text-center mb-24">
          <div className={`bg-gradient-to-br from-[#1a1a1a] to-[#242424] rounded-3xl p-8 md:p-12 max-w-4xl ring-1 ring-white/5 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} shadow-2xl shadow-black/50`}>
            <div className="mb-8 animate-float">
              <div className="relative mx-auto w-32 h-32">
                <div className="absolute inset-0 bg-[#f3cf1a]/10 rounded-full blur-xl"></div>
                <svg className="relative w-32 h-32 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10L70 30H30L50 10Z" fill="#f3cf1a"/>
                  <rect x="30" y="30" width="40" height="50" rx="5" stroke="#f3cf1a" strokeWidth="5"/>
                  <path d="M40 45H60M40 55H60M40 65H60" stroke="#f3cf1a" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#f3cf1a] to-[#d4af37] bg-clip-text text-transparent transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Welcome to LegalAxis
            </h1>
            
            <p className={`mb-8 text-xl md:text-2xl text-[#e0e0e0] max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Your <span className="text-[#f3cf1a] font-semibold">agentic AI legal co-pilot</span> that doesn't just summarize contracts — it enforces compliance, tracks obligations, simulates disputes, negotiates terms, and prevents risks.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link to="/login" className="bg-[#f3cf1a] text-[#0a0a0a] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#f3cf1a]/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center">
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </Link>
              <Link to="/demo" className="bg-transparent border-2 border-[#f3cf1a] text-[#f3cf1a] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#f3cf1a] hover:text-[#0a0a0a] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
                Watch Demo
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[
            { value: '10K+', label: 'Active Users' },
            { value: '95%', label: 'Satisfaction Rate' },
            { value: '50M+', label: 'Documents Analyzed' },
            { value: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <div key={index} className={`bg-gradient-to-br from-[#1a1a1a] to-[#242424] rounded-2xl p-6 ring-1 ring-white/5 text-center transition-all duration-500 delay-${index * 100} ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-3xl font-bold text-[#f3cf1a] mb-2">{stat.value}</div>
              <div className="text-[#a0a0a0]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Agent features section */}
        <section id="features" className="my-24">
          <h2 className={`text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#f3cf1a] to-[#d4af37] bg-clip-text text-transparent transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            Your Digital Legal Department
          </h2>
          <p className={`text-xl text-center text-[#e0e0e0] mb-16 max-w-3xl mx-auto transition-all duration-700 delay-100 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            Powered by advanced AI, LegalAxis transforms how legal professionals work with contracts and compliance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Agent Card 1 */}
            <div className={`agent-card bg-gradient-to-br from-[#1a1a1a] to-[#242424] rounded-2xl p-8 ring-1 ring-white/5 transition-all duration-500 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 rounded-full bg-[#f3cf1a]/20 flex items-center justify-center mb-6 group-hover:bg-[#f3cf1a]/30 transition-colors duration-300">
                <svg className="w-8 h-8 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#f3cf1a]">Compliance Guardian</h3>
              <p className="text-[#a0a0a0]">Continuously validates clauses against real-time legal databases & new regulations.</p>
            </div>
            
            {/* Agent Card 2 */}
            <div className={`agent-card bg-gradient-to-br from-[#1a1a1a] to-[#242424] rounded-2xl p-8 ring-1 ring-white/5 transition-all duration-500 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 rounded-full bg-[#f3cf1a]/20 flex items-center justify-center mb-6 group-hover:bg-[#f3cf1a]/30 transition-colors duration-300">
                <svg className="w-8 h-8 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#f3cf1a]">Deadline Tracker</h3>
              <p className="text-[#a0a0a0]">Extracts commitments from contracts and auto-creates reminders before deadlines.</p>
            </div>
            
            {/* Agent Card 3 */}
            <div className={`agent-card bg-gradient-to-br from-[#1a1a1a] to-[#242424] rounded-2xl p-8 ring-1 ring-white/5 transition-all duration-500 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 rounded-full bg-[#f3cf1a]/20 flex items-center justify-center mb-6 group-hover:bg-[#f3cf1a]/30 transition-colors duration-300">
                <svg className="w-8 h-8 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#f3cf1a]">Risk Analyzer</h3>
              <p className="text-[#a0a0a0]">Scores each clause for risk, fairness, and unusual terms with visual heatmaps.</p>
            </div>
            
            {/* Agent Card 4 */}
            <div className={`agent-card bg-gradient-to-br from-[#1a1a1a] to-[#242424] rounded-2xl p-8 ring-1 ring-white/5 transition-all duration-500 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 rounded-full bg-[#f3cf1a]/20 flex items-center justify-center mb-6 group-hover:bg-[#f3cf1a]/30 transition-colors duration-300">
                <svg className="w-8 h-8 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#f3cf1a]">Negotiation Strategist</h3>
              <p className="text-[#a0a0a0]">Detects negotiable clauses and generates counter-proposals with balanced alternatives.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="my-24 text-center">
          <div className={`bg-gradient-to-br from-[#1a1a1a] to-[#242424] rounded-3xl p-12 ring-1 ring-white/5 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} shadow-2xl shadow-black/50`}>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#f3cf1a] to-[#d4af37] bg-clip-text text-transparent">Ready to Transform Your Legal Workflow?</h2>
            <p className="mb-10 text-xl text-[#e0e0e0] max-w-2xl mx-auto">Join thousands of professionals who trust LegalAxis to manage their legal documents and compliance.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/signup" className="bg-[#f3cf1a] text-[#0a0a0a] px-10 py-5 rounded-xl font-semibold text-lg hover:bg-[#f3cf1a]/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Start Free Trial
              </Link>
              <Link to="/demo" className="bg-transparent border-2 border-[#f3cf1a] text-[#f3cf1a] px-10 py-5 rounded-xl font-semibold text-lg hover:bg-[#f3cf1a] hover:text-[#0a0a0a] transition-all duration-300 transform hover:-translate-y-1">
                Schedule a Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <svg className="w-8 h-8 mr-3 text-[#f3cf1a]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10L70 30H30L50 10Z" fill="#f3cf1a"/>
                  <rect x="30" y="30" width="40" height="50" rx="5" stroke="#f3cf1a" strokeWidth="5"/>
                  <path d="M40 45H60M40 55H60M40 65H60" stroke="#f3cf1a" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <span className="text-2xl font-bold text-[#f3cf1a]">LegalAxis</span>
              </div>
              <p className="text-[#a0a0a0] mb-6">Your AI-powered legal co-pilot for contract management and compliance.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a href="#" className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors duration-300">Features</a></li>
                <li><a href="#" className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors duration-300">Pricing</a></li>
                <li><a href="#" className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors duration-300">Case Studies</a></li>
                <li><a href="#" className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors duration-300">Reviews</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors duration-300">API Documentation</a></li>
                <li><a href="#" className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors duration-300">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors duration-300">About</a></li>
                <li><a href="#" className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors duration-300">Contact</a></li>
                <li><a href="#" className="text-[#a0a0a0] hover:text-[#f3cf1a] transition-colors duration-300">Partners</a></li>
              </ul>
            </div>
          </div>
          <div className="py-6 border-t border-white/5 text-center text-[#a0a0a0]">
            <p>© 2023 LegalAxis. All rights reserved.</p>
          </div>
        </footer>
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
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .agent-card {
          transition: all 0.3s ease;
        }
        
        .agent-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(243, 207, 26, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Landing;
