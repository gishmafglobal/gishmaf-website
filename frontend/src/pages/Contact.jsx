import { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.png";
import "./Contact.css";

export default function Contact() {
  const [posts, setPosts] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can we assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // ✅ FETCH CONTACT POSTS (FIXED URL)
  useEffect(() => {
    fetch("https://gishmaf-website-1.onrender.com/posts")
      .then(res => res.json())
      .then(data => setPosts(data.filter(p => p.section === "contact")))
      .catch(err => console.error("Failed to fetch posts:", err));
  }, []);

  // ✅ AUTO SCROLL CHAT
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ SEND MESSAGE FUNCTION (FIXED COMPLETELY)
  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage = { sender: "user", text: trimmedInput };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const formattedMessages = [
        {
          role: "system",
          content: "You are a professional assistant for Gishmaf Global Concept."
        },
        ...updatedMessages.map(msg => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text
        }))
      ];

      const response = await fetch(
        "https://gishmaf-website-1.onrender.com/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ messages: formattedMessages })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Server error");
      }

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: data.message }
      ]);

    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again later."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <img src={logo} alt="Gishmaf Logo" style={{ width: "80px", marginBottom: "10px" }} />
        <h1>Contact Gishmaf Global Concept</h1>
      </div>

      {/* CONTACT BUTTONS */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginBottom: "40px" }}>
        <a href="mailto:gishmafglobal@gmail.com" style={buttonStyle("#007BFF")}>
          📧 Email Us
        </a>
        <a href="https://wa.me/19378072552" target="_blank" rel="noopener noreferrer" style={buttonStyle("#25D366")}>
          💬 WhatsApp / Text
        </a>
      </div>

      {/* CHATBOT */}
      <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
        
        <button
          onClick={() => setChatOpen(!chatOpen)}
          style={chatButtonStyle}
        >
          💬
        </button>

        {chatOpen && (
          <div style={chatBoxStyle}>
            
            <div style={chatHeaderStyle}>
              Chat with Gishmaf
            </div>

            <div style={chatMessagesStyle}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    textAlign: m.sender === "user" ? "right" : "left",
                    marginBottom: "8px"
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: m.sender === "user" ? "#DCF8C6" : "#f1f1f1"
                    }}
                  >
                    {m.text}
                  </span>
                </div>
              ))}

              {loading && <p style={{ color: "#999" }}>Typing...</p>}

              <div ref={chatEndRef}></div>
            </div>

            <div style={{ display: "flex", borderTop: "1px solid #eee" }}>
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                style={{ flex: 1, border: "none", padding: "10px" }}
              />
              <button
                onClick={sendMessage}
                style={{ background: "#007BFF", color: "#fff", border: "none", padding: "0 15px", cursor: "pointer" }}
              >
                ➤
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const buttonStyle = (color) => ({
  display: "inline-block",
  backgroundColor: color,
  color: "#fff",
  padding: "12px 25px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
  width: "250px",
  textAlign: "center"
});

const chatButtonStyle = {
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: "60px",
  height: "60px",
  fontSize: "24px",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
};

const chatBoxStyle = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  bottom: "70px",
  right: "0",
  width: "320px",
  height: "420px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  overflow: "hidden"
};

const chatHeaderStyle = {
  backgroundColor: "#007BFF",
  color: "#fff",
  padding: "10px",
  fontWeight: "bold"
};

const chatMessagesStyle = {
  flex: 1,
  padding: "10px",
  overflowY: "auto",
  fontSize: "14px"
};