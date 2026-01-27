// import { useEffect, useState } from "react";

// export default function Music() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/posts")
//       .then(res => res.json())
//       .then(data => {
//         setPosts(data.filter(p => p.section === "music"));
//       });
//   }, []);

//   return (
//     <div style={{ padding: "80px" }}>
//       <h1>Music</h1>
//       {posts.map(p => (
//         <div key={p._id} style={{ marginTop: "20px" }}>
//           <h2>{p.title}</h2>
//           <p>{p.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Music() {
  const [songs, setSongs] = useState([]);
  const [term, setTerm] = useState("afrobeat");

  // Fetch music from iTunes API
  const searchMusic = async (searchTerm) => {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=12`
    );
    const data = await res.json();
    setSongs(data.results);
  };

  useEffect(() => {
    searchMusic(term);
  }, []);

  return (
    <div style={{ padding: "60px 30px", fontFamily: "Arial" }}>
      {/* HEADER */}
      <div style={{ textAlign: "center" }}>
        <img src={logo} alt="logo" style={{ width: "80px" }} />
        <h1>Gishmaf Music Workshop & Streaming</h1>
        <p style={{ color: "gray" }}>
          Learn music. Understand music. Stream music.
        </p>
      </div>

      {/* MUSIC WORKSHOP INTRO */}
      <div style={{ maxWidth: "900px", margin: "30px auto", lineHeight: "1.8" }}>
        <h2>Quick Music Workshop</h2>
        <p>
          Music is a universal language that connects cultures and generations.
          At Gishmaf Global Concept, we teach the foundations of music, instruments,
          rhythm, melody, and expression across different music styles around the world.
        </p>
      </div>

      {/* MUSIC CLASSES */}
      <div style={{ maxWidth: "900px", margin: "20px auto" }}>
        <h2>Music Styles You Can Learn</h2>
        <ul>
          <li><b>Afrobeat</b> – African rhythm, drums, groove and cultural sound.</li>
          <li><b>Gospel</b> – Spiritual harmony, choir arrangements and instruments.</li>
          <li><b>Jazz</b> – Improvisation, saxophone, piano, and creativity.</li>
          <li><b>Classical</b> – Orchestra, notation, violin, piano and structure.</li>
          <li><b>Hip Hop</b> – Beats, rap, digital production and rhythm.</li>
        </ul>
      </div>

      {/* SEARCH BAR */}
      <div style={{ textAlign: "center", margin: "30px" }}>
        <input
          type="text"
          placeholder="Search music style e.g jazz, gospel, afrobeat"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{ padding: "10px", width: "60%" }}
        />
        <button
          onClick={() => searchMusic(term)}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            cursor: "pointer"
          }}
        >
          Search & Stream
        </button>
      </div>

      {/* STREAM MUSIC */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {songs.map((song) => (
          <div
            key={song.trackId}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
            }}
          >
            <img
              src={song.artworkUrl100}
              alt={song.trackName}
              style={{ width: "100%", borderRadius: "6px" }}
            />
            <h4>{song.trackName}</h4>
            <p style={{ fontSize: "14px", color: "gray" }}>
              {song.artistName}
            </p>
            <audio controls style={{ width: "100%" }}>
              <source src={song.previewUrl} type="audio/mpeg" />
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
}
