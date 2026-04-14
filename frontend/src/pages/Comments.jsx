import { useEffect, useState } from "react";

const API = "https://gishmaf-website-1.onrender.com";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [replyBox, setReplyBox] = useState({});
  const [replyText, setReplyText] = useState({});

  // ✅ MASK EMAIL
  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    return name.slice(0, 2) + "***@" + domain;
  };

  // ✅ LOAD COMMENTS
  const loadComments = async () => {
    try {
      const res = await fetch(`${API}/api/comments`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  // ✅ POST COMMENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) return;

    await fetch(`${API}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", email: "", message: "" });
    loadComments();
  };

  // ✅ LIKE
  const likeComment = async (id) => {
    await fetch(`${API}/api/comments/${id}/like`, { method: "PUT" });
    loadComments();
  };

  // ✅ REPLY
  const sendReply = async (parentId) => {
    if (!replyText[parentId]) return;

    await fetch(`${API}/api/comments/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        💬 Community Comments
      </h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
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
        <button style={btnStyle}>Post Comment</button>
      </form>

      {/* COMMENTS */}
      {comments.map((c) => (
        <div key={c._id} style={cardStyle}>
          <div style={{ marginBottom: "8px" }}>
            <strong>{c.name}</strong>{" "}
            <span style={{ color: "#777", fontSize: "13px" }}>
              ({maskEmail(c.email)})
            </span>
          </div>

          <p style={{ marginBottom: "10px" }}>{c.message}</p>

          <div style={{ display: "flex", gap: "15px" }}>
            <button style={actionBtn} onClick={() => likeComment(c._id)}>
              👍 {c.likes || 0}
            </button>

            <button
              style={actionBtn}
              onClick={() =>
                setReplyBox({ ...replyBox, [c._id]: !replyBox[c._id] })
              }
            >
              Reply
            </button>
          </div>

          {/* REPLY INPUT */}
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
              <button
                style={{ ...btnStyle, marginTop: "5px" }}
                onClick={() => sendReply(c._id)}
              >
                Send Reply
              </button>
            </div>
          )}

          {/* REPLIES */}
          {c.replies?.map((r, i) => (
            <div key={i} style={replyStyle}>
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                Anonymous
              </div>
              <div style={{ fontSize: "14px", color: "#333" }}>
                {r.message}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// --------------------
// 🎨 STYLES
// --------------------

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const btnStyle = {
  padding: "10px 15px",
  borderRadius: "6px",
  background: "#111",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const actionBtn = {
  background: "none",
  border: "none",
  color: "#1a73e8",
  cursor: "pointer",
  fontSize: "14px",
};

const cardStyle = {
  border: "1px solid #e6e6e6",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "20px",
  background: "#ffffff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const replyStyle = {
  marginTop: "12px",
  marginLeft: "25px",
  padding: "12px",
  background: "#eef3ff",  // 👈 better visible background
  borderLeft: "4px solid #1a73e8",  // 👈 visual reply indicator
  borderRadius: "8px",
};