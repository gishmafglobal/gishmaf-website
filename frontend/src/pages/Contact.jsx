
import { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.png";
import "./contact.css";

export default function Contact() {
  const [posts, setPosts] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can we assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Fetch contact posts from backend
  useEffect(() => {
    fetch("https://gishmaf-website-1.onrender.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.filter((p) => p.section === "contact")))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatOpen]);

  // Send user message to backend chatbot
  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage = { sender: "user", text: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Add temporary typing message
    const typingId = Date.now();
    setMessages((prev) => [...prev, { sender: "bot", text: "Typing...", id: typingId }]);

    try {
      const response = await fetch("https://gishmaf-website-1.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput }),
      });

      const data = await response.json();
      const botReply = data?.message || "Sorry, I couldn't respond. Please click the whatsapp chat button to reach gishmaf directly or smend a mail.";

      // Remove typing message
      setMessages((prev) => prev.filter((msg) => msg.id !== typingId));

      // Delay to simulate real typing
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      }, 800);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => prev.filter((msg) => msg.id !== typingId));
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <div className="contact-header">
        <img src={logo} alt="Gishmaf Logo" className="logo" />
        <h1>Contact Gishmaf Global Concept</h1>
        <p>
          Connecting people locally, nationally, and internationally through knowledge, creativity, and innovation.
        </p>
      </div>

      {/* Intro */}
      <div className="contact-content">
        <p>
          Gishmaf Global Concept is a vision-driven platform dedicated to empowering individuals and organizations worldwide.
        </p>
        <p>
          Communication is the first step toward opportunity and transformation. Our team is always ready to respond and assist you promptly.
        </p>
      </div>

      {/* Contact Buttons */}
      <div className="contact-buttons">
        <a href="mailto:gishmafglobal@gmail.com" className="contact-btn email-btn">📧 Email Us</a>
        <a href="https://wa.me/19378072552" target="_blank" rel="noopener noreferrer" className="contact-btn whatsapp-btn">💬 WhatsApp / Text</a>
      </div>

      {/* Admin Posts */}
      {posts.length > 0 && (
        <div className="contact-content posts">
          {posts.map((p) => (
            <div key={p._id} className="post-card">
              <h2>{p.title}</h2>
              <p>{p.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Chatbot Toggle Button */}
      <button className="chatbot-button" onClick={() => setChatOpen(!chatOpen)}>💬</button>

      {/* Chatbot Window */}
      {chatOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">Chat with Gishmaf</div>
          <div className="chatbot-messages">
            {messages.map((m, idx) => (
              <p
                key={idx}
                className={m.sender === "bot" ? "chatbot-message-bot" : "chatbot-message-user"}
              >
                {m.text}
              </p>
            ))}
            {loading && <p className="chatbot-loading">Typing...</p>}
            <div ref={chatEndRef}></div>
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
}