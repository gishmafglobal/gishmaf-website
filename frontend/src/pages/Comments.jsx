import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetch(`${API}/api/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Please enter your name and email before commenting.");
      return;
    }

    await fetch(`${API}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setReply(
      "✅ Thanks for your comment! If this is urgent, please reach us via mail. Also check our Learning Hub if you can teach any skills and contact us for further progression. Cheers!"
    );

    setForm({ name: "", email: "", message: "" });

    // reload comments
    const res = await fetch(`${API}/api/comments`);
    const data = await res.json();
    setComments(data);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Community Comments</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br /><br />

        <textarea
          placeholder="Write your comment..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <br /><br />

        <button type="submit">Post Comment</button>
      </form>

      {reply && <p style={{ color: "green" }}>{reply}</p>}

      <hr />

      <h3>What people are saying:</h3>

      {comments.map((c, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <strong>{c.name}</strong> ({c.email})
          <p>{c.message}</p>
          <small>{new Date(c.date).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
