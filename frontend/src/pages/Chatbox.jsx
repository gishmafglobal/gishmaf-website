import { useState, useRef, useEffect } from "react";

export default function Chatbox() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can we assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Typing bubble
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

  // Inline styles
  const styles = {
    container: { position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 },
    toggleButton: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      background: "#007BFF",
      color: "#fff",
      border: "none",
      fontSize: "28px",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    },
    window: {
      width: "320px",
      height: "420px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
      display: "flex",
      flexDirection: "column",
      marginTop: "10px",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
    },
    header: { padding: "10px", background: "#007BFF", color: "#fff", fontWeight: "bold" },
    messages: { flex: 1, padding: "10px", overflowY: "auto", background: "#f9f9f9" },
    message: (isUser) => ({
      marginBottom: "8px",
      textAlign: isUser ? "right" : "left",
    }),
    bubble: (isUser) => ({
      display: "inline-block",
      padding: "8px 12px",
      borderRadius: "12px",
      background: isUser ? "#DCF8C6" : "#f1f1f1",
      maxWidth: "80%",
      wordWrap: "break-word",
    }),
    inputArea: {
      display: "flex",
      borderTop: "1px solid #eee",
      padding: "5px",
    },
    input: { flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "6px" },
    sendButton: {
      marginLeft: "5px",
      padding: "0 15px",
      border: "none",
      background: "#007BFF",
      color: "#fff",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.toggleButton} onClick={() => setChatOpen(!chatOpen)}>💬</button>

      {chatOpen && (
        <div style={styles.window}>
          <div style={styles.header}>Chat with Gishmaf</div>
          <div style={styles.messages}>
            {messages.map((msg, idx) => (
              <div key={idx} style={styles.message(msg.sender === "user")}>
                <span style={styles.bubble(msg.sender === "user")}>{msg.text}</span>
              </div>
            ))}
            {loading && (
              <div style={styles.message(false)}>
                <span style={styles.bubble(false)}>Typing...</span>
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>
          <div style={styles.inputArea}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.sendButton}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
}