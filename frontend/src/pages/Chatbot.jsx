import { useState, useRef, useEffect } from "react";

export default function Chatbox() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can we assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, newUserMessage];

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

      const response = await fetch("https://your-backend-url.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: formattedMessages })
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: data.message }
      ]);

    } catch (error) {
      console.error("Chat error:", error);

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong. Please try again." }
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      <button
        onClick={() => setChatOpen(!chatOpen)}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#007BFF",
          color: "#fff",
          border: "none",
          fontSize: "24px",
          cursor: "pointer"
        }}
      >
        💬
      </button>

      {chatOpen && (
        <div
          style={{
            width: "320px",
            height: "420px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            marginTop: "10px"
          }}
        >
          <div style={{ padding: "10px", background: "#007BFF", color: "#fff" }}>
            Chat with Gishmaf
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "8px",
                  textAlign: msg.sender === "user" ? "right" : "left"
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background:
                      msg.sender === "user" ? "#DCF8C6" : "#f1f1f1"
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {loading && <p>Typing...</p>}

            <div ref={chatEndRef}></div>
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #eee" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              style={{ flex: 1, border: "none", padding: "10px" }}
            />

            <button
              onClick={sendMessage}
              style={{
                background: "#007BFF",
                color: "#fff",
                border: "none",
                padding: "0 15px",
                cursor: "pointer"
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}