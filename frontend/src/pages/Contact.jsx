import { useEffect, useState, useRef } from "react";
import "./pages/Contact.css";
import logo from "../assets/logo.png";

export default function Contact() {
  const [posts, setPosts] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can we assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Fetch contact posts from backend
  useEffect(() => {
    fetch("http://gishmaf-website-1.onrender.com/posts")
      .then(res => res.json())
      .then(data => setPosts(data.filter(p => p.section === "contact")))
      .catch(err => console.error("Failed to fetch posts:", err));
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatOpen]);

  // Send message to backend
  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage = { sender: "user", text: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const openAIMessages = [
        { role: "system", content: "You are a professional assistant for Gishmaf Global Concept." },
        ...messages.map(m => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text
        })),
        { role: "user", content: trimmedInput }
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: openAIMessages })
      });

      const data = await response.json();
      const botReply = data?.message || data?.error || "Sorry, the AI didn't respond. Try again.";

      setMessages(prev => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Chatbot fetch error:", error);
      setMessages(prev => [...prev, { sender: "bot", text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* HEADER */}
      <div className="contact-header">
        <img src={logo} alt="Gishmaf Logo" className="logo" />
        <h1>Contact Gishmaf Global Concept</h1>
        <p>Connecting people locally, nationally, and internationally through knowledge, creativity, and innovation.</p>
      </div>

      {/* INTRO */}
      <div className="contact-content">
        <p>
          Gishmaf Global Concept is a vision-driven platform dedicated to empowering individuals and organizations worldwide.
          We are here to support your journey through learning, collaboration, consultancy, and guidance.
        </p>
        <p>
          Communication is the first step toward opportunity and transformation. Our team is always ready to respond and assist you promptly.
        </p>
      </div>

      {/* CONTACT BUTTONS */}
      <div className="contact-email">
        <h2>Reach Us Directly</h2>
        <a href="mailto:gishmafglobal@gmail.com">📧 Email Us</a>
        <br />
        <a href="https://wa.me/19378072552" target="_blank" rel="noopener noreferrer">💬 WhatsApp / Text</a>
      </div>

      {/* ADMIN POSTS */}
      {posts.length > 0 && (
        <div className="contact-content">
          {posts.map(p => (
            <div key={p._id} className="contact-post">
              <h2>{p.title}</h2>
              <p>{p.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* CHATBOT */}
      <div className="chatbot-wrapper">
        <button className="chatbot-toggle" onClick={() => setChatOpen(!chatOpen)}>💬</button>

        {chatOpen && (
          <div className="chatbot-window">
            <div className="chatbot-header">Chat with Gishmaf</div>
            <div className="chatbot-messages">
              {messages.map((m, idx) => (
                <p key={idx} className={m.sender === "bot" ? "chatbot-bot" : "chatbot-user"}>{m.text}</p>
              ))}
              {loading && <p className="chatbot-typing">Typing...</p>}
              <div ref={chatEndRef}></div>
            </div>
            <div className="chatbot-input-area">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
              />
              <button onClick={sendMessage}>➤</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}