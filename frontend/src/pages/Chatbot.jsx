import { useState, useRef, useEffect } from "react";
// import "./chatbox.css"; 


export default function Chatbox() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can we assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Add temporary bot typing bubble
    const typingId = Date.now();
    setMessages((prev) => [...prev, { sender: "bot", text: "Typing...", id: typingId }]);

    try {
      const response = await fetch("https://gishmaf-website-1.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a professional assistant for Gishmaf Global Concept." },
            ...messages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: input },
          ],
        }),
      });

      const data = await response.json();
      const botReply = data?.message || "Sorry, I couldn't respond.";

      // Remove typing bubble
      setMessages((prev) => prev.filter((m) => m.id !== typingId));

      // Add bot reply with slight delay
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => prev.filter((m) => m.id !== typingId));
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, something went wrong." }]);
      setLoading(false);
    }
  };

  return (
    <div className="chatbox-container">
      <button className="chatbox-toggle" onClick={() => setChatOpen(!chatOpen)}>💬</button>

      {chatOpen && (
        <div className="chatbox-window">
          <div className="chatbox-header">Chat with Gishmaf</div>
          <div className="chatbox-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbox-msg ${msg.sender === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="chatbox-msg bot">Typing...</div>}
            <div ref={chatEndRef}></div>
          </div>
          <div className="chatbox-input-area">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
}