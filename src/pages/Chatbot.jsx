import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm your LegalAxis AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    setIsTyping(true);
    
    try {
      // Call Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are LegalAxis AI, an advanced legal intelligence assistant. Provide helpful, accurate legal information while reminding users you are not a substitute for professional legal advice. Be concise but thorough in your responses.
                    
                    Current conversation context:
                    ${messages.map(msg => `${msg.sender}: ${msg.text}`).join('\n')}
                    
                    User's question: ${input}`
                  }
                ]
              }
            ]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const botText = data.candidates[0].content.parts[0].text;
      
      setMessages((msgs) => [...msgs, { sender: "bot", text: botText }]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((msgs) => [...msgs, { 
        sender: "bot", 
        text: "Sorry, I'm having trouble connecting to the legal database. Please try again later or contact support if the issue persists." 
      }]);
    }
    setLoading(false);
    setIsTyping(false);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[90vh] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-[#f3cf1a] rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-[#f3cf1a] rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#f3cf1a] rounded-full mix-blend-screen filter blur-xl opacity-10 animate-ping" style={{animationDuration: '4s'}}></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 h-full backdrop-blur-sm bg-[#000000]/95 rounded-3xl shadow-2xl ring-1 ring-white/5/50 overflow-hidden">
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#f3cf1a] rounded-full animate-pulse opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Header with Glitch Effect */}
        <div className="relative bg-gradient-to-r from-[#222222] via-[#1a1a1a] to-[#222222] px-8 py-6 ring-1 ring-white/5 rounded-xl bg-[#1a1a1a] p-1/70">
          <div className="flex items-center gap-4">
            {/* Animated Logo */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#f3cf1a] to-[#ffdf50] flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#f3cf1a] rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="absolute inset-0 w-12 h-12 rounded-full bg-[#f3cf1a] animate-ping opacity-25"></div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#f3cf1a] to-[#ffdf50] bg-clip-text text-transparent animate-pulse">
                LegalAxis AI
              </h2>
              <p className="text-[#A9CEF4] text-sm font-medium tracking-wide">
                Advanced Legal Intelligence System
              </p>
            </div>
          </div>
          
          {/* Status Indicators */}
          <div className="absolute top-4 right-8 flex gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <div className="w-3 h-3 bg-[#f3cf1a] rounded-full animate-pulse shadow-lg shadow-[#f3cf1a]/50" style={{animationDelay: '0.5s'}}></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
        
        {/* Chat Container */}
        <div className="flex-1 flex flex-col h-[calc(100%-120px)]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-gradient-to-b from-[#0a0a0a]/50 to-[#111111]/80">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div
                  className={`group relative max-w-[75%] ${
                    msg.sender === "user" ? "order-1" : "order-2"
                  }`}
                >
                  {/* Message Bubble */}
                  <div
                    className={`relative rounded-3xl p-6 shadow-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-[#222222] to-[#1a1a1a] text-white ring-white/10 ml-4"
                        : "bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#f3cf1a]/30 text-[#f3cf1a] mr-4"
                    }`}
                  >
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-3xl blur-xl opacity-20 ${
                      msg.sender === "user" ? "bg-white" : "bg-[#f3cf1a]"
                    }`}></div>
                    
                    <div className="relative z-10">
                      <p className="leading-relaxed text-base">{msg.text}</p>
                    </div>
                    
                    {/* Message Timestamp */}
                    <div className="absolute -bottom-6 right-4 text-xs text-[#666] opacity-0 group-hover:opacity-100 transition-opacity">
                      {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                  
                  {/* Avatar */}
                  <div className={`flex items-end ${msg.sender === "user" ? "order-2 ml-3" : "order-1 mr-3"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 ${
                      msg.sender === "user" 
                        ? "bg-gradient-to-r from-[#343535] to-[#222222]"
                        : "bg-gradient-to-r from-[#f3cf1a] to-[#ffdf50]"
                    }`}>
                      {msg.sender === "user" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f3cf1a" className="w-5 h-5">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      ) : (
                        <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-[#f3cf1a] rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Enhanced Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="group relative max-w-[75%] order-2">
                  <div className="relative rounded-3xl p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#f3cf1a]/30 mr-4 shadow-2xl">
                    <div className="absolute inset-0 rounded-3xl bg-[#f3cf1a] blur-xl opacity-10 animate-pulse"></div>
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded-full bg-[#f3cf1a] animate-bounce shadow-lg shadow-[#f3cf1a]/50"></div>
                        <div className="w-3 h-3 rounded-full bg-[#f3cf1a] animate-bounce shadow-lg shadow-[#f3cf1a]/50" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-3 h-3 rounded-full bg-[#f3cf1a] animate-bounce shadow-lg shadow-[#f3cf1a]/50" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      <span className="text-[#f3cf1a] text-sm animate-pulse">AI is thinking...</span>
                    </div>
                  </div>
                  
                  <div className="flex items-end order-1 mr-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#f3cf1a] to-[#ffdf50] flex items-center justify-center shadow-lg animate-spin" style={{animationDuration: '2s'}}>
                      <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#f3cf1a] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>
          
          {/* Enhanced Input Area */}
          <div className="relative p-6 bg-gradient-to-r from-[#222222] via-[#1a1a1a] to-[#222222] border-t border-white/5/70">
            <div className="relative">
              <div className="flex gap-4">
                {/* Input Field with Glow Effect */}
                <div className="flex-1 relative group">
                  <input
                    type="text"
                    className="w-full rounded-2xl px-6 py-4 bg-[#000000]/80 backdrop-blur-sm text-white ring-2 ring-white/10 focus:border-[#f3cf1a] focus:outline-none transition-all duration-300 text-lg placeholder-[#666] shadow-inner"
                    placeholder="Ask me anything about legal matters..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-[#f3cf1a] blur-xl opacity-0 group-focus-within:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
                  
                  {/* Input Enhancement Icons */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#f3cf1a] animate-pulse opacity-50"></div>
                    <div className="w-2 h-2 rounded-full bg-[#f3cf1a] animate-pulse opacity-30" style={{animationDelay: '0.5s'}}></div>
                  </div>
                </div>
                
                {/* Enhanced Send Button */}
                <button
                  type="submit"
                  className="group relative bg-gradient-to-r from-[#f3cf1a] to-[#ffdf50] text-black font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-[#f3cf1a]/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 overflow-hidden"
                  disabled={loading || !input.trim()}
                  onClick={sendMessage}
                >
                  {/* Button Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f3cf1a] to-[#ffdf50] blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  
                  <div className="relative z-10 flex items-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        <span className="font-semibold">Processing</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                        <span className="font-semibold">Send</span>
                      </>
                    )}
                  </div>
                  
                  {/* Ripple Effect */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {["Contract Review", "Legal Advice", "Case Research", "Document Analysis"].map((action, idx) => (
                <button
                  key={action}
                  className="group flex-shrink-0 px-4 py-2 bg-[#1a1a1a] ring-1 ring-white/5 rounded-xl text-[#f3cf1a] text-sm hover:bg-gradient-to-b from-[#1f1f1f] to-[#151515] hover:border-[#f3cf1a] transition-all duration-300 hover:scale-105"
                  onClick={() => setInput(action)}
                >
                  <span className="group-hover:text-white transition-colors">{action}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #111111;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #f3cf1a;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #ffdf50;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
