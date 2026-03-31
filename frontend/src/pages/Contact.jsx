// import { useEffect, useState, useRef } from "react";
// import logo from "../assets/logo.png";
// import "./contact.css"; // ✅ Correct relative path

// export default function Contact() {
//   const [posts, setPosts] = useState([]);
//   const [chatOpen, setChatOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hi! How can we assist you today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   // Fetch contact posts
//   useEffect(() => {
//     fetch("http://gishmaf-website.onrender.com/posts")
//       .then((res) => res.json())
//       .then((data) =>
//         setPosts(data.filter((p) => p.section === "contact"))
//       )
//       .catch((err) => console.error("Failed to fetch posts:", err));
//   }, []);

//   // Scroll to bottom
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, chatOpen]);

//   // Send message
//   const sendMessage = async () => {
//     const trimmedInput = input.trim();
//     if (!trimmedInput) return;

//     const userMessage = { sender: "user", text: trimmedInput };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const openAIMessages = [
//         { role: "system", content: "You are a professional assistant for Gishmaf Global Concept." },
//         ...messages.map((m) => ({
//           role: m.sender === "user" ? "user" : "assistant",
//           content: m.text,
//         })),
//         { role: "user", content: trimmedInput },
//       ];

//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: openAIMessages }),
//       });

//       const data = await response.json();
//       const botReply =
//         data?.message || data?.error || "Sorry, the AI didn't respond. Try again.";
//       setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
//     } catch (error) {
//       console.error("Chatbot fetch error:", error);
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "Sorry, something went wrong. Please try again." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="contact-page">
//       {/* Header */}
//       <div className="contact-header">
//         <img src={logo} alt="Gishmaf Logo" className="logo" />
//         <h1>Contact Gishmaf Global Concept</h1>
//         <p>
//           Connecting people locally, nationally, and internationally through knowledge, creativity, and innovation.
//         </p>
//       </div>

//       {/* Intro */}
//       <div className="contact-content">
//         <p>
//           Gishmaf Global Concept is a vision-driven platform dedicated to empowering individuals and organizations worldwide.
//         </p>
//         <p>
//           Communication is the first step toward opportunity and transformation. Our team is always ready to respond and assist you promptly.
//         </p>
//       </div>

//       {/* Contact Buttons */}
//       <div className="contact-email">
//         <h2>Get in Touch</h2>
//         <a href="mailto:gishmafglobal@gmail.com">📧 Email Us</a>
//         <br />
//         <a href="https://wa.me/19378072552" target="_blank" rel="noopener noreferrer">💬 WhatsApp / Text</a>
//       </div>

//       {/* Admin Posts */}
//       {posts.length > 0 && (
//         <div className="contact-content">
//           {posts.map((p) => (
//             <div key={p._id} style={{ marginBottom: "30px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
//               <h2 style={{ marginBottom: "10px", color: "#222" }}>{p.title}</h2>
//               <p style={{ lineHeight: "1.6", color: "#555" }}>{p.content}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Chatbot */}
//       <button className="chatbot-button" onClick={() => setChatOpen(!chatOpen)}>💬</button>

//       {chatOpen && (
//         <div className="chatbot-window">
//           <div className="chatbot-header">Chat with Gishmaf</div>
//           <div className="chatbot-messages">
//             {messages.map((m, idx) => (
//               <p
//                 key={idx}
//                 className={m.sender === "bot" ? "chatbot-message-bot" : "chatbot-message-user"}
//               >
//                 {m.text}
//               </p>
//             ))}
//             {loading && <p style={{ color: "#999" }}>Typing...</p>}
//             <div ref={chatEndRef}></div>
//           </div>
//           <div className="chatbot-input">
//             <input
//               type="text"
//               placeholder="Type your message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
//             />
//             <button onClick={sendMessage}>➤</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


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

  // Fetch contact posts
  useEffect(() => {
    fetch("https://gishmaf-website.onrender.com/posts")
      .then((res) => res.json())
      .then((data) =>
        setPosts(data.filter((p) => p.section === "contact"))
      )
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatOpen]);

  // Send message
  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage = { sender: "user", text: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput }),
      });

      const data = await response.json();
      const botReply = data?.message || "Sorry, the AI didn't respond. Try again.";
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Chatbot fetch error:", error);
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

      {/* Chatbot */}
      <button className="chatbot-button" onClick={() => setChatOpen(!chatOpen)}>💬</button>

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