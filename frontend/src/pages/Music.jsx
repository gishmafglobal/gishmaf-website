// import { useEffect, useState, useRef } from "react";
// import logo from "../assets/logo.png";

// // Chatbox Component
// function Chatbox() {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hi! I’m your music assistant 🎵" },
//   ]);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);

//   const addMessage = (sender, text) => {
//     setMessages((prev) => [...prev, { sender, text }]);
//   };

//   // Simulated AI typing animation
//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     addMessage("user", input);
//     setInput("");
//     setTyping(true);

//     // Fake delay for progressive bubble typing
//     let reply = `🎶 You asked: "${input}". Here's a suggestion: Try exploring Afrobeat or Jazz playlists!`;
//     let display = "";
//     for (let i = 0; i < reply.length; i++) {
//       display += reply[i];
//       setMessages((prev) => [
//         ...prev.slice(0, prev.length - 1),
//         { sender: "bot", text: display },
//       ]);
//       await new Promise((r) => setTimeout(r, 15)); // 15ms per char
//     }

//     setTyping(false);
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "380px",
//         width: "90%",
//         margin: "30px auto",
//         background: "#fff",
//         borderRadius: "12px",
//         boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
//         display: "flex",
//         flexDirection: "column",
//         padding: "15px",
//       }}
//     >
//       <div
//         style={{
//           flex: 1,
//           maxHeight: "400px",
//           overflowY: "auto",
//           display: "flex",
//           flexDirection: "column",
//           gap: "10px",
//         }}
//       >
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             style={{
//               alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
//               background: msg.sender === "user" ? "#4285f4" : "#e0e0e0",
//               color: msg.sender === "user" ? "#fff" : "#000",
//               padding: "8px 12px",
//               borderRadius: "20px",
//               maxWidth: "80%",
//               wordBreak: "break-word",
//             }}
//           >
//             {msg.text}
//           </div>
//         ))}
//         {typing && <div style={{ color: "#888" }}>Typing...</div>}
//       </div>
//       <div style={{ display: "flex", marginTop: "10px" }}>
//         <input
//           type="text"
//           placeholder="Ask me about music..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           style={{
//             flex: 1,
//             padding: "10px 15px",
//             borderRadius: "20px",
//             border: "1px solid #ccc",
//             outline: "none",
//           }}
//         />
//         <button
//           onClick={sendMessage}
//           style={{
//             marginLeft: "8px",
//             padding: "10px 18px",
//             borderRadius: "20px",
//             border: "none",
//             background: "#4285f4",
//             color: "#fff",
//             cursor: "pointer",
//             fontWeight: "bold",
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function Music() {
//   const [songs, setSongs] = useState([]);
//   const [term, setTerm] = useState("afrobeat");
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
//   const audioRef = useRef(null);

//   const searchMusic = async (searchTerm) => {
//     if (!searchTerm) return;
//     const res = await fetch(
//       `https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=20`
//     );
//     const data = await res.json();
//     setSongs(data.results);
//     setCurrentTrackIndex(null);
//   };

//   useEffect(() => {
//     searchMusic(term);
//   }, []);

//   const playTrack = (index) => {
//     setCurrentTrackIndex(index);
//     if (audioRef.current) {
//       audioRef.current.load();
//       audioRef.current.play();
//     }
//   };

//   const handleEnded = () => {
//     if (currentTrackIndex !== null && currentTrackIndex < songs.length - 1) {
//       playTrack(currentTrackIndex + 1);
//     } else {
//       // Loop current track
//       if (audioRef.current) {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play();
//       }
//     }
//   };

//   const togglePlayPause = () => {
//     if (!audioRef.current) return;
//     if (audioRef.current.paused) audioRef.current.play();
//     else audioRef.current.pause();
//   };

//   const playNext = () => {
//     if (currentTrackIndex !== null && currentTrackIndex < songs.length - 1) {
//       playTrack(currentTrackIndex + 1);
//     }
//   };

//   const playPrev = () => {
//     if (currentTrackIndex !== null && currentTrackIndex > 0) {
//       playTrack(currentTrackIndex - 1);
//     }
//   };

//   const formatTime = (ms) => {
//     if (!ms) return "0:30";
//     const minutes = Math.floor(ms / 60000);
//     const seconds = Math.floor((ms % 60000) / 1000);
//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div
//       style={{
//         padding: "60px 20px",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         backgroundColor: "#fafafa",
//         paddingBottom: "160px",
//       }}
//     >
//       {/* HEADER */}
//       <div style={{ textAlign: "center", marginBottom: "40px" }}>
//         <img src={logo} alt="logo" style={{ width: "90px", marginBottom: "15px" }} />
//         <h1 style={{ fontSize: "2.2rem", color: "#222", marginBottom: "8px" }}>
//           Gishmaf Music Workshop & Streaming
//         </h1>
//         <p style={{ color: "#555", fontSize: "1.1rem" }}>Learn music. Understand music. Stream music.</p>
//       </div>

//       {/* SEARCH BAR */}
//       <div style={{ textAlign: "center", marginBottom: "40px" }}>
//         <input
//           type="text"
//           placeholder="Search music style e.g jazz, gospel, afrobeat"
//           value={term}
//           onChange={(e) => setTerm(e.target.value)}
//           style={{
//             padding: "12px 15px",
//             width: "65%",
//             maxWidth: "400px",
//             borderRadius: "30px",
//             border: "1px solid #ccc",
//             outline: "none",
//             fontSize: "1rem",
//           }}
//           onKeyDown={(e) => e.key === "Enter" && searchMusic(term)}
//         />
//         <button
//           onClick={() => searchMusic(term)}
//           style={{
//             padding: "12px 25px",
//             marginLeft: "10px",
//             borderRadius: "30px",
//             border: "none",
//             background: "#4285f4",
//             color: "#fff",
//             fontWeight: "bold",
//             cursor: "pointer",
//           }}
//         >
//           Search & Stream
//         </button>
//       </div>

//       {/* MUSIC GRID */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
//           gap: "25px",
//           marginTop: "20px",
//           padding: "0 10px",
//         }}
//       >
//         {songs.map((song, index) => (
//           <div
//             key={song.trackId}
//             style={{
//               border: currentTrackIndex === index ? "2px solid #1a73e8" : "1px solid #e0e0e0",
//               borderRadius: "12px",
//               padding: "15px",
//               textAlign: "center",
//               backgroundColor: "#fff",
//               boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
//               cursor: "pointer",
//             }}
//             onClick={() => playTrack(index)}
//           >
//             <img
//               src={song.artworkUrl100.replace("100x100bb", "300x300bb")}
//               alt={song.trackName}
//               style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
//             />
//             <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "4px" }}>{song.trackName}</h4>
//             <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "4px" }}>{song.artistName}</p>
//             <p style={{ fontSize: "0.8rem", color: "#888", marginBottom: "6px" }}>Duration: {formatTime(song.trackTimeMillis)}</p>
//             <audio ref={currentTrackIndex === index ? audioRef : null} style={{ display: "none" }} onEnded={handleEnded}>
//               <source src={song.previewUrl} type="audio/mpeg" />
//             </audio>
//           </div>
//         ))}
//       </div>

//       {/* CHATBOX */}
//       <Chatbox />

//       {/* NOW PLAYING BAR */}
//       {currentTrackIndex !== null && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             background: "#1a73e8",
//             color: "#fff",
//             display: "flex",
//             alignItems: "center",
//             padding: "10px 20px",
//             boxShadow: "0 -4px 10px rgba(0,0,0,0.2)",
//             zIndex: 1000,
//           }}
//         >
//           <div style={{ flex: 1 }}>
//             <strong>{songs[currentTrackIndex].trackName}</strong> – {songs[currentTrackIndex].artistName}
//           </div>
//           <div style={{ display: "flex", gap: "15px" }}>
//             <button onClick={playPrev} style={controlBtnStyle}>⏮️</button>
//             <button onClick={togglePlayPause} style={controlBtnStyle}>{audioRef.current && !audioRef.current.paused ? "⏸️" : "▶️"}</button>
//             <button onClick={playNext} style={controlBtnStyle}>⏭️</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Button style for now playing controls
// const controlBtnStyle = {
//   background: "transparent",
//   border: "none",
//   color: "#fff",
//   fontSize: "1.5rem",
//   cursor: "pointer",
//   outline: "none",
// };



import { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.png";

export default function Music() {
  const [songs, setSongs] = useState([]);
  const [term, setTerm] = useState("afrobeat");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(new Audio());

  // ---------------------------
  // SEARCH FUNCTION (Improved)
  // ---------------------------
  const searchMusic = async (searchTerm) => {
    if (!searchTerm.trim()) return;

    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          searchTerm
        )}&media=music&limit=20`
      );

      const data = await res.json();
      setSongs(data.results || []);
      setCurrentTrack(null);
      setIsPlaying(false);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  useEffect(() => {
    searchMusic(term);
  }, []);

  // ---------------------------
  // PLAY TRACK (Single Player)
  // ---------------------------
  const playTrack = (song) => {
    if (!song.previewUrl) return;

    if (currentTrack?.trackId === song.trackId) {
      togglePlayPause();
      return;
    }

    audioRef.current.pause();
    audioRef.current.src = song.previewUrl;
    audioRef.current.load();

    audioRef.current
      .play()
      .then(() => {
        setCurrentTrack(song);
        setIsPlaying(true);
      })
      .catch((err) => console.log("Playback blocked:", err));
  };

  const togglePlayPause = () => {
    if (!audioRef.current.src) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const playNext = () => {
    if (!currentTrack) return;

    const index = songs.findIndex(
      (song) => song.trackId === currentTrack.trackId
    );

    if (index !== -1 && index < songs.length - 1) {
      playTrack(songs[index + 1]);
    }
  };

  const playPrev = () => {
    if (!currentTrack) return;

    const index = songs.findIndex(
      (song) => song.trackId === currentTrack.trackId
    );

    if (index > 0) {
      playTrack(songs[index - 1]);
    }
  };

  const formatTime = (ms) => {
    if (!ms) return "0:30";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        padding: "60px 20px",
        fontFamily: "'Segoe UI', sans-serif",
        backgroundColor: "#fafafa",
        paddingBottom: "120px",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <img src={logo} alt="logo" style={{ width: "80px" }} />
        <h1>Gishmaf Music Workshop & Streaming</h1>
        <p>Learn music. Understand music. Stream music.</p>
      </div>

      {/* GENRE OVERVIEW */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto 40px auto",
          lineHeight: "1.6",
          fontSize: "0.95rem",
          color: "#444",
        }}
      >
        <h3>🎵 Understanding Music Genres</h3>
        <p>
          Music comes in different styles known as genres. Each genre has its
          own sound, rhythm and cultural background.
        </p>
        <p>
          <strong>Afrobeat</strong> blends African rhythms with jazz and funk.
          <br />
          <strong>Jazz</strong> focuses on improvisation and smooth
          instrumentals.
          <br />
          <strong>Gospel</strong> is rooted in Christian worship and powerful
          vocals.
          <br />
          <strong>Hip-Hop</strong> combines rap, beats and lyrical storytelling.
          <br />
          <strong>Classical</strong> uses orchestral instruments and structured
          compositions.
        </p>
        <p>
          Use the search below to explore any music genre and start streaming.
        </p>
      </div>

      {/* SEARCH */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <input
          type="text"
          placeholder="Search genre e.g jazz, gospel, afrobeat"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMusic(term)}
          style={{
            padding: "12px",
            width: "60%",
            maxWidth: "400px",
            borderRadius: "25px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={() => searchMusic(term)}
          style={{
            padding: "12px 20px",
            marginLeft: "10px",
            borderRadius: "25px",
            border: "none",
            background: "#1a73e8",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* MUSIC GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {songs.map((song) => (
          <div
            key={song.trackId}
            onClick={() => playTrack(song)}
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
              cursor: "pointer",
              border:
                currentTrack?.trackId === song.trackId
                  ? "2px solid #1a73e8"
                  : "1px solid #eee",
            }}
          >
            <img
              src={song.artworkUrl100.replace("100x100bb", "300x300bb")}
              alt={song.trackName}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h4>{song.trackName}</h4>
            <p>{song.artistName}</p>
            <small>Duration: {formatTime(song.trackTimeMillis)}</small>
          </div>
        ))}
      </div>

      {/* NOW PLAYING BAR */}
      {currentTrack && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#1a73e8",
            color: "#fff",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <strong>{currentTrack.trackName}</strong> –{" "}
            {currentTrack.artistName}
          </div>
          <div>
            <button onClick={playPrev} style={btn}>⏮</button>
            <button onClick={togglePlayPause} style={btn}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button onClick={playNext} style={btn}>⏭</button>
          </div>
        </div>
      )}
    </div>
  );
}

const btn = {
  background: "transparent",
  border: "none",
  color: "#fff",
  fontSize: "18px",
  margin: "0 10px",
  cursor: "pointer",
};