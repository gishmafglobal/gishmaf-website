
// import { useEffect, useState } from "react";
// import logo from "../assets/logo.png";

// // Make sure you have REACT_APP_OPENAI_API_KEY in your .env
// const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// export default function Contact() {
//   const [posts, setPosts] = useState([]);
//   const [chatOpen, setChatOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hi! How can we assist you today?" }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetch("http://gishmaf-website.onrender.com/posts")
//       .then(res => res.json())
//       .then(data => setPosts(data.filter(p => p.section === "contact")));
//   }, []);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages(prev => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: [
//             { role: "system", content: "You are a professional customer support assistant for Gishmaf Global Concept." },
//             ...messages.map(m => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text })),
//             { role: "user", content: input }
//           ],
//           temperature: 0.7,
//           max_tokens: 300
//         })
//       });

//       const data = await response.json();
//       const botMessage = { sender: "bot", text: data.choices[0].message.content };
//       setMessages(prev => [...prev, botMessage]);
//     } catch (error) {
//       const botMessage = { sender: "bot", text: "Sorry, something went wrong. Please try again." };
//       setMessages(prev => [...prev, botMessage]);
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ fontFamily: "Arial, Helvetica, sans-serif", padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      
//       {/* HEADER */}
//       <div style={{ textAlign: "center", marginBottom: "40px" }}>
//         <img src={logo} alt="Gishmaf Logo" style={{ width: "80px", marginBottom: "10px" }} />
//         <h1 style={{ fontSize: "2em", marginBottom: "10px" }}>Contact Gishmaf Global Concept</h1>
//         <p style={{ color: "#555", maxWidth: "600px", margin: "auto" }}>
//           Connecting people locally, nationally, and internationally through knowledge,
//           creativity, and innovation.
//         </p>
//       </div>

//       {/* INTRO */}
//       <div style={{ lineHeight: "1.7", fontSize: "16px", marginBottom: "30px", padding: "0 10px" }}>
//         <p>
//           Gishmaf Global Concept is a vision-driven platform dedicated to empowering
//           individuals and organizations worldwide. Wherever you are, we are here to 
//           support your journey through learning, collaboration, consultancy, and guidance.
//         </p>
//         <p>
//           Communication is the first step toward opportunity and transformation. Our 
//           team is always ready to respond and assist you promptly.
//         </p>
//       </div>

//       {/* CONTACT BUTTONS */}
//       <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginBottom: "40px" }}>
//         <a 
//           href="mailto:gishmafglobal@gmail.com" 
//           style={{
//             display: "inline-block",
//             backgroundColor: "#007BFF",
//             color: "#fff",
//             padding: "12px 25px",
//             borderRadius: "8px",
//             textDecoration: "none",
//             fontWeight: "bold",
//             width: "250px",
//             textAlign: "center"
//           }}
//         >
//           📧 Email Us
//         </a>
//         <a 
//           href="https://wa.me/19378072552" 
//           target="_blank" 
//           rel="noopener noreferrer"
//           style={{
//             display: "inline-block",
//             backgroundColor: "#25D366",
//             color: "#fff",
//             padding: "12px 25px",
//             borderRadius: "8px",
//             textDecoration: "none",
//             fontWeight: "bold",
//             width: "250px",
//             textAlign: "center"
//           }}
//         >
//           💬 WhatsApp / Text
//         </a>
//       </div>

//       {/* ADMIN POSTS */}
//       {posts.length > 0 && (
//         <div style={{ marginBottom: "50px", padding: "0 10px" }}>
//           {posts.map(p => (
//             <div key={p._id} style={{ marginBottom: "30px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
//               <h2 style={{ marginBottom: "10px", color: "#222" }}>{p.title}</h2>
//               <p style={{ lineHeight: "1.6", color: "#555" }}>{p.content}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* CHATBOT */}
//       <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
//         <button 
//           onClick={() => setChatOpen(!chatOpen)}
//           style={{
//             backgroundColor: "#007BFF",
//             color: "#fff",
//             border: "none",
//             borderRadius: "50%",
//             width: "60px",
//             height: "60px",
//             fontSize: "30px",
//             cursor: "pointer",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
//           }}
//         >
//           💬
//         </button>

//         {chatOpen && (
//           <div style={{
//             display: "flex",
//             flexDirection: "column",
//             position: "absolute",
//             bottom: "70px",
//             right: "0",
//             width: "320px",
//             maxHeight: "400px",
//             backgroundColor: "#fff",
//             borderRadius: "10px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//             overflow: "hidden"
//           }}>
//             <div style={{ backgroundColor: "#007BFF", color: "#fff", padding: "10px", fontWeight: "bold" }}>
//               Chat with Gishmaf
//             </div>
//             <div style={{ flex: "1", padding: "10px", overflowY: "auto", fontSize: "14px", color: "#555" }}>
//               {messages.map((m, idx) => (
//                 <p key={idx} style={{ color: m.sender === "bot" ? "#222" : "#007BFF", margin: "5px 0" }}>
//                   {m.text}
//                 </p>
//               ))}
//               {loading && <p style={{ color: "#999" }}>Typing...</p>}
//             </div>
//             <div style={{ borderTop: "1px solid #eee", display: "flex" }}>
//               <input 
//                 type="text"
//                 placeholder="Type your message..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
//                 style={{ border: "none", padding: "10px", flex: 1, outline: "none" }}
//               />
//               <button 
//                 onClick={sendMessage}
//                 style={{ border: "none", backgroundColor: "#007BFF", color: "#fff", padding: "0 15px", cursor: "pointer" }}
//               >
//                 ➤
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }


import { useEffect, useState, useRef } from "react";
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

  useEffect(() => {
    fetch("http://gishmaf-website.onrender.com/posts")
      .then(res => res.json())
      .then(data => setPosts(data.filter(p => p.section === "contact")));
  }, []);

  // Scroll chat to bottom when messages update
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a professional assistant for Gishmaf Global Concept." },
            ...messages.map(m => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text })),
            { role: "user", content: input }
          ]
        })
      });

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.choices[0].message.content };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: "bot", text: "Sorry, something went wrong. Please try again." }]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", padding: "20px", maxWidth: "1200px", margin: "auto" }}>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <img src={logo} alt="Gishmaf Logo" style={{ width: "80px", marginBottom: "10px" }} />
        <h1 style={{ fontSize: "2em", marginBottom: "10px" }}>Contact Gishmaf Global Concept</h1>
        <p style={{ color: "#555", maxWidth: "600px", margin: "auto" }}>
          Connecting people locally, nationally, and internationally through knowledge,
          creativity, and innovation.
        </p>
      </div>

      {/* INTRODUCTION */}
      <div style={{ lineHeight: "1.7", fontSize: "16px", marginBottom: "30px", padding: "0 10px" }}>
        <p>
          Gishmaf Global Concept is a vision-driven platform dedicated to empowering
          individuals and organizations worldwide. Wherever you are, we are here to 
          support your journey through learning, collaboration, consultancy, and guidance.
        </p>
        <p>
          Communication is the first step toward opportunity and transformation. Our 
          team is always ready to respond and assist you promptly.
        </p>
      </div>

      {/* CONTACT BUTTONS */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        marginBottom: "40px"
      }}>
        <a 
          href="mailto:gishmafglobal@gmail.com" 
          style={{
            display: "inline-block",
            backgroundColor: "#007BFF",
            color: "#fff",
            padding: "12px 25px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            width: "250px",
            textAlign: "center"
          }}
        >
          📧 Email Us
        </a>
        <a 
          href="https://wa.me/19378072552" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            backgroundColor: "#25D366",
            color: "#fff",
            padding: "12px 25px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            width: "250px",
            textAlign: "center"
          }}
        >
          💬 WhatsApp / Text
        </a>
      </div>

      {/* ADMIN POSTS */}
      {posts.length > 0 && (
        <div style={{ marginBottom: "50px", padding: "0 10px" }}>
          {posts.map(p => (
            <div key={p._id} style={{
              marginBottom: "30px",
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}>
              <h2 style={{ marginBottom: "10px", color: "#222" }}>{p.title}</h2>
              <p style={{ lineHeight: "1.6", color: "#555" }}>{p.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* CHATBOT */}
      <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            fontSize: "30px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}
        >
          💬
        </button>

        {chatOpen && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            bottom: "70px",
            right: "0",
            width: "320px",
            maxHeight: "400px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            overflow: "hidden"
          }}>
            <div style={{ backgroundColor: "#007BFF", color: "#fff", padding: "10px", fontWeight: "bold" }}>
              Chat with Gishmaf
            </div>
            <div style={{ flex: "1", padding: "10px", overflowY: "auto", fontSize: "14px", color: "#555" }}>
              {messages.map((m, idx) => (
                <p key={idx} style={{ 
                  color: m.sender === "bot" ? "#222" : "#007BFF", 
                  margin: "5px 0",
                  backgroundColor: m.sender === "bot" ? "#f1f1f1" : "#DCF8C6",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  alignSelf: m.sender === "bot" ? "flex-start" : "flex-end",
                  maxWidth: "80%"
                }}>
                  {m.text}
                </p>
              ))}
              {loading && <p style={{ color: "#999" }}>Typing...</p>}
              <div ref={chatEndRef}></div>
            </div>
            <div style={{ borderTop: "1px solid #eee", display: "flex" }}>
              <input 
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                style={{ border: "none", padding: "10px", flex: 1, outline: "none" }}
              />
              <button 
                onClick={sendMessage}
                style={{ border: "none", backgroundColor: "#007BFF", color: "#fff", padding: "0 15px", cursor: "pointer" }}
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