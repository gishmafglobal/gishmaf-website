import { useState } from "react";
import "./chatbot.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 Welcome to Gishmaf! What skill are you interested in?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    // SIMPLE AI RESPONSE (you can upgrade later)
    const botReply = {
      sender: "bot",
      text: getBotResponse(input)
    };

    setMessages([...messages, userMessage, botReply]);
    setInput("");
  };

  const getBotResponse = (text) => {
    text = text.toLowerCase();

    if (text.includes("tech")) return "Great choice! Our Tech Skills program covers coding, AI, and web development.";
    if (text.includes("music")) return "Awesome 🎵 We offer piano, guitar, drums and more.";
    if (text.includes("business")) return "Our entrepreneurship program helps you build real income streams.";
    if (text.includes("price")) return "Pricing depends on the course. Would you like me to connect you with an advisor?";
    
    return "That’s interesting! Tell me more or click a skill above to get started.";
  };

  return (
    <>
      {/* CHAT BUTTON */}
      <div className="chat-button" onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* CHAT WINDOW */}
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            Gishmaf AI Assistant
          </div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}