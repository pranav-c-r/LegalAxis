import React, { useState, useRef } from "react";
import { useUserAuth } from "../context/UserAuthContext";
// import Gemini API utility here (to be implemented)

const VoiceAssistant = () => {
  const { currentUser } = useUserAuth();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm your LegalAxis Voice Assistant. Tap the mic and ask me anything!" },
  ]);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const recognitionRef = useRef(null);

  // Placeholder for Gemini API integration
  async function fakeGeminiApi(userInput) {
    return `Echo: ${userInput}`;
  }

  // Placeholder for TTS
  function speak(text) {
    if (window.speechSynthesis) {
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.rate = 1.05;
      window.speechSynthesis.speak(utter);
    }
  }

  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser.');
      return;
    }
    if (recording) {
      recognitionRef.current.stop();
      setRecording(false);
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setMessages((msgs) => [...msgs, { sender: "user", text: transcript }]);
      setRecording(false);
      setLoading(true);
      try {
        // TODO: Replace with Gemini API call
        const botReply = await fakeGeminiApi(transcript);
        setMessages((msgs) => [...msgs, { sender: "bot", text: botReply }]);
        speak(botReply);
      } catch (err) {
        setMessages((msgs) => [...msgs, { sender: "bot", text: "Sorry, something went wrong." }]);
      }
      setLoading(false);
    };
    recognition.onerror = () => setRecording(false);
    recognition.onend = () => setRecording(false);
    recognitionRef.current = recognition;
    setRecording(true);
    recognition.start();
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh] w-full max-w-2xl mx-auto bg-[#181818] rounded-xl shadow-lg border border-[#232323] p-4 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-[#f5f5f5]">Voice Assistant</h2>
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
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleMicClick}
          className={`rounded-full p-4 bg-[#b5e853] text-[#181818] shadow-lg hover:bg-[#d0ff7e] transition focus:outline-none ${recording ? "animate-pulse" : ""}`}
          aria-label="Start voice input"
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75v2.25m0 0h3m-3 0H9m6-2.25a6 6 0 10-12 0v.75a6 6 0 0012 0v-.75z" />
            <circle cx="12" cy="10" r="4" fill="#232323" />
          </svg>
        </button>
        <span className="text-[#b5e853] font-medium">{recording ? "Listening..." : loading ? "Thinking..." : "Tap mic to speak"}</span>
      </div>
    </div>
  );
};

export default VoiceAssistant;
