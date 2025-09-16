import React, { useState, useRef, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";
// import Gemini API utility here (to be implemented)

const Chatbot = () => {
  const { user } = useUserAuth();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm your LegalAxis AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
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
    try {
      // TODO: Replace with Gemini API call
      const botReply = await fakeGeminiApi(input);
      setMessages((msgs) => [...msgs, { sender: "bot", text: botReply }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { sender: "bot", text: "Sorry, something went wrong." }]);
    }
    setLoading(false);
  };

  // Placeholder for Gemini API integration
  async function fakeGeminiApi(userInput) {
    return `Echo: ${userInput}`;
  }

  return (
    <div className="flex flex-col h-full max-h-[80vh] w-full max-w-2xl mx-auto bg-[#181818] rounded-xl shadow-lg border border-[#232323] p-4 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-[#f5f5f5]">AI Chatbot</h2>
      <div className="flex-1 overflow-y-auto mb-4 space-y-2 bg-[#202020] rounded-lg p-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow-md ${
                msg.sender === "user"
                  ? "bg-[#3a3a3a] text-[#f5f5f5]"
                  : "bg-[#232323] text-[#b5e853]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          className="flex-1 rounded-lg px-4 py-2 bg-[#232323] text-[#f5f5f5] border border-[#343535] focus:outline-none focus:ring-2 focus:ring-[#b5e853]"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-[#b5e853] text-[#181818] font-semibold px-6 py-2 rounded-lg shadow hover:bg-[#d0ff7e] transition disabled:opacity-60"
          disabled={loading || !input.trim()}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
