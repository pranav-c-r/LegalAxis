import React, { useState, useRef } from "react";
import { useUserAuth } from "../context/UserAuthContext";

const VoiceAssistant = () => {
  const { currentUser } = useUserAuth();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm your LegalAxis Voice Assistant. Tap the mic and ask me anything!" },
  ]);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const recognitionRef = useRef(null);

  // Function to call the Gemini API
  async function callGeminiApi(userInput) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("API key not found");
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: userInput
            }
          ]
        }
      ]
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the response text from the API response
    return data.candidates[0].content.parts[0].text;
  }

  // Text-to-Speech function
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
        // Call the Gemini API
        const botReply = await callGeminiApi(transcript);
        setMessages((msgs) => [...msgs, { sender: "bot", text: botReply }]);
        speak(botReply);
      } catch (err) {
        console.error("Error calling Gemini API:", err);
        setMessages((msgs) => [...msgs, { sender: "bot", text: "Sorry, something went wrong. Please try again." }]);
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
    <div className="flex flex-col h-full max-h-[80vh] w-full max-w-2xl mx-auto bg-[#222222] rounded-xl shadow-lg border border-[#343535] p-4 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-[#f3cf1a]">Voice Assistant</h2>
      <div className="flex-1 overflow-y-auto mb-4 space-y-2 bg-[#000000] rounded-lg p-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow-md ${
                msg.sender === "user"
                  ? "bg-[#343535] text-[#ffffff]"
                  : "bg-[#222222] text-[#f3cf1a] border border-[#343535]"
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
          className={`rounded-full p-4 bg-[#f3cf1a] text-[#000000] shadow-lg hover:bg-[#ffdf50] transition focus:outline-none ${recording ? "animate-pulse" : ""}`}
          aria-label="Start voice input"
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75v2.25m0 0h3m-3 0H9m6-2.25a6 6 0 10-12 0v.75a6 6 0 0012 0v-.75z" />
            <circle cx="12" cy="10" r="4" fill="#222222" />
          </svg>
        </button>
        <span className="text-[#f3cf1a] font-medium">{recording ? "Listening..." : loading ? "Thinking..." : "Tap mic to speak"}</span>
      </div>
    </div>
  );
};

export default VoiceAssistant;