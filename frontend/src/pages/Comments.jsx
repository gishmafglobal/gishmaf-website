// import { useEffect, useState } from "react";

// const API = "https://gishmaf-website-1.onrender.com";

// export default function Comments() {
//   const [comments, setComments] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [chatOpen, setChatOpen] = useState(false);
//   const [chatMessages, setChatMessages] = useState([
//     { sender: "bot", text: "Hi 👋 Ask me anything about Gishmaf!" }
//   ]);
//   const [chatInput, setChatInput] = useState("");

//   // ✅ MASK EMAIL FUNCTION
//   const maskEmail = (email) => {
//     if (!email) return "";
//     const [name, domain] = email.split("@");
//     return name.slice(0, 2) + "****@" + domain;
//   };

//   // ✅ LOAD COMMENTS FAST
//   const loadComments = async () => {
//     try {
//       const res = await fetch(`${API}/api/comments`);
//       const data = await res.json();
//       setComments(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.log("Load error:", err);
//     }
//   };

//   useEffect(() => {
//     loadComments();
//   }, []);

//   // ✅ FORM HANDLING
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.email || !form.message) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       await fetch(`${API}/api/comments`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       alert("✅ Comment posted successfully!");

//       setForm({ name: "", email: "", message: "" });

//       // reload instantly
//       loadComments();
//     } catch (err) {
//       console.log("Post error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // 🤖 SIMPLE AI CHAT LOGIC
//   // =========================
//   const getBotReply = (msg) => {
//     msg = msg.toLowerCase();

//     if (msg.includes("course") || msg.includes("skill"))
//       return "We offer tech, music, business and more. Check the Skills page!";

//     if (msg.includes("price"))
//       return "Prices vary by course. Want to speak to a human? Click below 👇";

//     if (msg.includes("help"))
//       return "You can contact support via WhatsApp or email below 👇";

//     return "I'm here to help 😊 Ask about skills, courses, or support!";
//   };

//   const sendChat = () => {
//     if (!chatInput.trim()) return;

//     const userMsg = { sender: "user", text: chatInput };
//     const botMsg = { sender: "bot", text: getBotReply(chatInput) };

//     setChatMessages([...chatMessages, userMsg, botMsg]);
//     setChatInput("");
//   };

//   return (
//     <div style={{ padding: "30px", maxWidth: "700px", margin: "auto" }}>
//       <h2>Community Comments</h2>

//       {/* FORM */}
//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           placeholder="Your Name"
//           value={form.name}
//           onChange={handleChange}
//           style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
//         />

//         <input
//           name="email"
//           placeholder="Your Email"
//           value={form.email}
//           onChange={handleChange}
//           style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
//         />

//         <textarea
//           name="message"
//           placeholder="Your Comment"
//           value={form.message}
//           onChange={handleChange}
//           style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Posting..." : "Post Comment"}
//         </button>
//       </form>

//       <hr style={{ margin: "30px 0" }} />

//       {/* COMMENTS */}
//       <h3>All Comments</h3>

//       {comments.length === 0 && (
//   <p style={{ color: "#888", textAlign: "center", marginTop: "20px" }}>
//     Kindly share your feedback here and join the conversation.
//   </p>
// )}

//       {comments.map((c) => (
//         <div
//           key={c._id}
//           style={{
//             border: "1px solid #ddd",
//             padding: "15px",
//             marginBottom: "15px",
//             borderRadius: "8px",
//           }}
//         >
//           <strong>{c.name}</strong> ({maskEmail(c.email)})
//           <p>{c.message}</p>
//         </div>
//       ))}

//       {/* ========================= */}
//       {/* 🤖 AI CHATBOT UI */}
//       {/* ========================= */}
//       <div
//         onClick={() => setChatOpen(!chatOpen)}
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           background: "#111",
//           color: "#fff",
//           padding: "15px",
//           borderRadius: "50%",
//           cursor: "pointer",
//         }}
//       >
//         💬
//       </div>

//       {chatOpen && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "80px",
//             right: "20px",
//             width: "300px",
//             height: "400px",
//             background: "#fff",
//             border: "1px solid #ddd",
//             borderRadius: "10px",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div style={{ padding: "10px", background: "#111", color: "#fff" }}>
//             Gishmaf AI Assistant
//           </div>

//           <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
//             {chatMessages.map((m, i) => (
//               <div key={i} style={{ marginBottom: "10px" }}>
//                 <b>{m.sender === "bot" ? "AI" : "You"}:</b> {m.text}
//               </div>
//             ))}
//           </div>

//           <div style={{ display: "flex" }}>
//             <input
//               value={chatInput}
//               onChange={(e) => setChatInput(e.target.value)}
//               style={{ flex: 1, padding: "8px" }}
//               placeholder="Ask something..."
//             />
//             <button onClick={sendChat}>Send</button>
//           </div>

//           {/* CONTACT SUPPORT */}
//           <div style={{ padding: "10px", fontSize: "12px" }}>
//             Need human help?  
//             <br />
//             <a href="https://wa.me/19378072552" target="_blank">
//               WhatsApp Support
//             </a>
//             <br />
//             <a href="mailto:gishmafglobal@gmail.com">
//               Email Support
//             </a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";

const API = "https://gishmaf-website-1.onrender.com";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [replyBox, setReplyBox] = useState({});
  const [replyText, setReplyText] = useState({});

  // ✅ MASK EMAIL (better version)
  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    return name.slice(0, 2) + "***@" + domain;
  };

  // ✅ LOAD COMMENTS
  const loadComments = async () => {
    const res = await fetch(`${API}/api/comments`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, []);

  // ✅ POST COMMENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${API}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", email: "", message: "" });
    loadComments();
  };

  // ✅ LIKE COMMENT
  const likeComment = async (id) => {
    await fetch(`${API}/api/comments/${id}/like`, { method: "PUT" });
    loadComments();
  };

  // ✅ REPLY
  const sendReply = async (parentId) => {
    await fetch(`${API}/api/comments/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parentId,
        message: replyText[parentId],
      }),
    });

    setReplyText({ ...replyText, [parentId]: "" });
    setReplyBox({ ...replyBox, [parentId]: false });
    loadComments();
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>💬 Community</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />
        <textarea
          placeholder="Write something..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={inputStyle}
        />
        <button style={btnStyle}>Post</button>
      </form>

      {/* COMMENTS */}
      {comments.map((c) => (
        <div key={c._id} style={card}>
          <b>{c.name}</b>{" "}
          <span style={{ color: "#888" }}>({maskEmail(c.email)})</span>

          <p>{c.message}</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => likeComment(c._id)}>👍 {c.likes || 0}</button>

            <button
              onClick={() =>
                setReplyBox({ ...replyBox, [c._id]: !replyBox[c._id] })
              }
            >
              Reply
            </button>
          </div>

          {/* REPLY BOX */}
          {replyBox[c._id] && (
            <div style={{ marginTop: "10px" }}>
              <input
                placeholder="Write reply..."
                value={replyText[c._id] || ""}
                onChange={(e) =>
                  setReplyText({ ...replyText, [c._id]: e.target.value })
                }
                style={inputStyle}
              />
              <button onClick={() => sendReply(c._id)} style={btnStyle}>
                Send
              </button>
            </div>
          )}

          {/* REPLIES */}
          {c.replies?.map((r, i) => (
            <div key={i} style={replyStyle}>
              <b>Anonymous</b>
              <p>{r.message}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// 🎨 STYLES
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const btnStyle = {
  padding: "10px",
  borderRadius: "8px",
  background: "#111",
  color: "#fff",
  border: "none",
};

const card = {
  border: "1px solid #eee",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
};

const replyStyle = {
  marginLeft: "20px",
  marginTop: "10px",
  padding: "10px",
  background: "#f9f9f9",
  borderRadius: "8px",
};