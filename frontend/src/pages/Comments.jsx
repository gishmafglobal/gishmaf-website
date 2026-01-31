import { useEffect, useState } from "react";

const API = "https://gishmaf-website-1.onrender.com";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Load comments safely
  const loadComments = async () => {
    try {
      const res = await fetch(`${API}/api/comments`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setComments(data);
      }
    } catch (err) {
      console.log("Load error:", err);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await fetch(`${API}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert(
        "✅ Thanks for your comment! If urgent, contact us by mail. Also check our Learning Hub if you can teach any skills there,then reachout to us by mail for further progression. Cheers!"
      );

      setForm({ name: "", email: "", message: "" });
      loadComments();
    } catch (err) {
      console.log("Post error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "auto" }}>
      <h2>Community Comments</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <textarea
          name="message"
          placeholder="Your Comment"
          value={form.message}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h3>All Comments</h3>

      {comments.length === 0 && <p>No comments yet. Be the first!</p>}

      {comments.map((c) => (
        <div
          key={c._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <strong>{c.name}</strong> ({c.email})
          <p>{c.message}</p>
        </div>
      ))}
    </div>
  );
}
