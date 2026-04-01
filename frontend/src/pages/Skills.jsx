import { useState } from "react";
import logo from "../assets/logo.png";
import "./skills.css";
import Chatbox from "./Chatbox"; // ✅ Corrected import: matches Chatbox.jsx

const skills = [
  {
    title: "Musical Instruments",
    desc: "Master instruments with guided lessons.",
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
  },
  {
    title: "Tech Skills",
    desc: "Learn coding, AI, and digital tools.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    title: "Hair & Beauty",
    desc: "Professional styling and beauty skills.",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
  },
  {
    title: "Fashion",
    desc: "Design and create your own clothing.",
    img: "https://images.unsplash.com/photo-1521334884684-d80222895322"
  },
  {
    title: "Media",
    desc: "Content creation, video editing, storytelling.",
    img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
  },
  {
    title: "Business",
    desc: "Start and scale profitable ventures.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978"
  }
];

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const trackEvent = (action, skill) => {
    console.log(`[TRACKING]: ${action} - ${skill}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSkill) return;

    const message = `Hello, my name is ${formData.name}. I am interested in ${selectedSkill.title}. ${formData.message}`;
    trackEvent("Form Submitted", selectedSkill.title);

    window.open(
      `https://wa.me/19378072552?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setFormData({ name: "", email: "", message: "" });
    setSelectedSkill(null);
  };

  return (
    <div className="hub">
      {/* HEADER */}
      <div className="hub-header">
        <img src={logo} alt="logo" />
        <h1>Gishmaf Learning Hub</h1>
        <p>Build real skills. Create real income. Transform your future.</p>
      </div>

      {/* SKILLS GRID */}
      <div className="skills-grid">
        {skills.map((skill, i) => (
          <div
            key={i}
            className="skill-card"
            onClick={() => {
              setSelectedSkill(skill);
              trackEvent("Skill Click", skill.title);
            }}
          >
            <img src={skill.img} alt={skill.title} />
            <div className="skill-content">
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL FORM */}
      {selectedSkill && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedSkill.title}</h2>
            <p>
              Start your journey today. Fill in your details and we’ll connect
              you instantly.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <textarea
                placeholder="What would you like to achieve?"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />

              <button type="submit">Continue →</button>
            </form>

            <button
              className="close-btn"
              onClick={() => setSelectedSkill(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ✅ CHATBOT / CHATBOX COMPONENT */}
      <Chatbox />
    </div>
  );
}