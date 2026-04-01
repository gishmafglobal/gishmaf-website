// import { useEffect, useState } from "react";
// import logo from "../assets/logo.png";

// export default function Music() {
//   const [songs, setSongs] = useState([]);
//   const [term, setTerm] = useState("afrobeat");

//   // Fetch music from iTunes API
//   const searchMusic = async (searchTerm) => {
//     const res = await fetch(
//       `https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=12`
//     );
//     const data = await res.json();
//     setSongs(data.results);
//   };

//   useEffect(() => {
//     searchMusic(term);
//   }, []);

//   return (
//     <div style={{ padding: "60px 30px", fontFamily: "Arial" }}>
//       {/* HEADER */}
//       <div style={{ textAlign: "center" }}>
//         <img src={logo} alt="logo" style={{ width: "80px" }} />
//         <h1>Gishmaf Music Workshop & Streaming</h1>
//         <p style={{ color: "gray" }}>
//           Learn music. Understand music. Stream music.
//         </p>
//       </div>

//       {/* MUSIC WORKSHOP INTRO */}
//       <div style={{ maxWidth: "900px", margin: "30px auto", lineHeight: "1.8" }}>
//         <h2>Quick Music Workshop</h2>
//         <p>
//           Music is a universal language that connects cultures and generations.
//           At Gishmaf Global Concept, we teach the foundations of music, instruments,
//           rhythm, melody, and expression across different music styles around the world.
//         </p>
//       </div>

//       {/* MUSIC CLASSES */}
//       <div style={{ maxWidth: "900px", margin: "20px auto" }}>
//         <h2>Music Styles You Can Learn</h2>
//         <ul>
//           <li><b>Afrobeat</b> – African rhythm, drums, groove and cultural sound.</li>
//           <li><b>Gospel</b> – Spiritual harmony, choir arrangements and instruments.</li>
//           <li><b>Jazz</b> – Improvisation, saxophone, piano, and creativity.</li>
//           <li><b>Classical</b> – Orchestra, notation, violin, piano and structure.</li>
//           <li><b>Hip Hop</b> – Beats, rap, digital production and rhythm.</li>
//         </ul>
//       </div>

//       {/* SEARCH BAR */}
//       <div style={{ textAlign: "center", margin: "30px" }}>
//         <input
//           type="text"
//           placeholder="Search music style e.g jazz, gospel, afrobeat"
//           value={term}
//           onChange={(e) => setTerm(e.target.value)}
//           style={{ padding: "10px", width: "60%" }}
//         />
//         <button
//           onClick={() => searchMusic(term)}
//           style={{
//             padding: "10px 20px",
//             marginLeft: "10px",
//             cursor: "pointer"
//           }}
//         >
//           Search & Stream
//         </button>
//       </div>

//       {/* STREAM MUSIC */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//           gap: "20px",
//           marginTop: "30px",
//         }}
//       >
//         {songs.map((song) => (
//           <div
//             key={song.trackId}
//             style={{
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//               padding: "15px",
//               textAlign: "center",
//             }}
//           >
//             <img
//               src={song.artworkUrl100}
//               alt={song.trackName}
//               style={{ width: "100%", borderRadius: "6px" }}
//             />
//             <h4>{song.trackName}</h4>
//             <p style={{ fontSize: "14px", color: "gray" }}>
//               {song.artistName}
//             </p>
//             <audio controls style={{ width: "100%" }}>
//               <source src={song.previewUrl} type="audio/mpeg" />
//             </audio>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.png";

export default function Music() {
  const [songs, setSongs] = useState([]);
  const [term, setTerm] = useState("afrobeat");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const audioRef = useRef(null);

  // Fetch music from iTunes API
  const searchMusic = async (searchTerm) => {
    if (!searchTerm) return;
    const res = await fetch(
      `https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=20`
    );
    const data = await res.json();
    setSongs(data.results);
    setCurrentTrackIndex(null);
  };

  useEffect(() => {
    searchMusic(term);
  }, []);

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  const handleEnded = () => {
    if (currentTrackIndex !== null && currentTrackIndex < songs.length - 1) {
      playTrack(currentTrackIndex + 1);
    } else {
      // Loop current track if last track reached
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) audioRef.current.play();
    else audioRef.current.pause();
  };

  const playNext = () => {
    if (currentTrackIndex !== null && currentTrackIndex < songs.length - 1) {
      playTrack(currentTrackIndex + 1);
    }
  };

  const playPrev = () => {
    if (currentTrackIndex !== null && currentTrackIndex > 0) {
      playTrack(currentTrackIndex - 1);
    }
  };

  const formatTime = (ms) => {
    if (!ms) return "0:30"; // fallback
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ padding: "60px 20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#fafafa", paddingBottom: "120px" }}>
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <img src={logo} alt="logo" style={{ width: "90px", marginBottom: "15px" }} />
        <h1 style={{ fontSize: "2.2rem", color: "#222", marginBottom: "8px" }}>Gishmaf Music Workshop & Streaming</h1>
        <p style={{ color: "#555", fontSize: "1.1rem" }}>Learn music. Understand music. Stream music.</p>
      </div>

      {/* SEARCH BAR */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <input
          type="text"
          placeholder="Search music style e.g jazz, gospel, afrobeat"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{
            padding: "12px 15px",
            width: "65%",
            maxWidth: "400px",
            borderRadius: "30px",
            border: "1px solid #ccc",
            outline: "none",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            fontSize: "1rem",
            transition: "all 0.3s",
          }}
          onKeyDown={(e) => e.key === "Enter" && searchMusic(term)}
        />
        <button
          onClick={() => searchMusic(term)}
          style={{
            padding: "12px 25px",
            marginLeft: "10px",
            borderRadius: "30px",
            border: "none",
            background: "linear-gradient(90deg, #1a73e8, #4285f4)",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Search & Stream
        </button>
      </div>

      {/* MUSIC GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "25px",
          marginTop: "20px",
          padding: "0 10px",
        }}
      >
        {songs.map((song, index) => (
          <div
            key={song.trackId}
            style={{
              border: currentTrackIndex === index ? "2px solid #1a73e8" : "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "15px",
              textAlign: "center",
              backgroundColor: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              transition: "transform 0.2s, border 0.2s",
              cursor: "pointer",
            }}
            onClick={() => playTrack(index)}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <img
              src={song.artworkUrl100.replace("100x100bb", "300x300bb")}
              alt={song.trackName}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "4px" }}>{song.trackName}</h4>
            <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "4px" }}>{song.artistName}</p>
            <p style={{ fontSize: "0.8rem", color: "#888", marginBottom: "6px" }}>Duration: {formatTime(song.trackTimeMillis)}</p>
            <audio ref={currentTrackIndex === index ? audioRef : null} style={{ display: "none" }} onEnded={handleEnded}>
              <source src={song.previewUrl} type="audio/mpeg" />
            </audio>
          </div>
        ))}
      </div>

      {/* NOW PLAYING BAR */}
      {currentTrackIndex !== null && (
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#1a73e8",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "10px 20px",
          boxShadow: "0 -4px 10px rgba(0,0,0,0.2)",
          zIndex: 1000,
        }}>
          <div style={{ flex: 1 }}>
            <strong>{songs[currentTrackIndex].trackName}</strong> – {songs[currentTrackIndex].artistName}
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            <button onClick={playPrev} style={controlBtnStyle}>⏮️</button>
            <button onClick={togglePlayPause} style={controlBtnStyle}>{audioRef.current && !audioRef.current.paused ? "⏸️" : "▶️"}</button>
            <button onClick={playNext} style={controlBtnStyle}>⏭️</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Button style for now playing controls
const controlBtnStyle = {
  background: "transparent",
  border: "none",
  color: "#fff",
  fontSize: "1.5rem",
  cursor: "pointer",
  outline: "none",
};