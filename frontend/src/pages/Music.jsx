// import { useEffect, useState, useRef } from "react";
// import logo from "../assets/logo.png";

// export default function Music() {
//   const [songs, setSongs] = useState([]);
//   const [term, setTerm] = useState("afrobeat");
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const audioRef = useRef(new Audio());

//   // ---------------------------
//   // SEARCH FUNCTION (Improved)
//   // ---------------------------
//   const searchMusic = async (searchTerm) => {
//     if (!searchTerm.trim()) return;

//     try {
//       const res = await fetch(
//         `https://itunes.apple.com/search?term=${encodeURIComponent(
//           searchTerm
//         )}&media=music&limit=20`
//       );

//       const data = await res.json();
//       setSongs(data.results || []);
//       setCurrentTrack(null);
//       setIsPlaying(false);
//     } catch (error) {
//       console.error("Search failed:", error);
//     }
//   };

//   useEffect(() => {
//     searchMusic(term);
//   }, []);

//   // ---------------------------
//   // PLAY TRACK (Single Player)
//   // ---------------------------
//   const playTrack = (song) => {
//     if (!song.previewUrl) return;

//     if (currentTrack?.trackId === song.trackId) {
//       togglePlayPause();
//       return;
//     }

//     audioRef.current.pause();
//     audioRef.current.src = song.previewUrl;
//     audioRef.current.load();

//     audioRef.current
//       .play()
//       .then(() => {
//         setCurrentTrack(song);
//         setIsPlaying(true);
//       })
//       .catch((err) => console.log("Playback blocked:", err));
//   };

//   const togglePlayPause = () => {
//     if (!audioRef.current.src) return;

//     if (audioRef.current.paused) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     } else {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   const playNext = () => {
//     if (!currentTrack) return;

//     const index = songs.findIndex(
//       (song) => song.trackId === currentTrack.trackId
//     );

//     if (index !== -1 && index < songs.length - 1) {
//       playTrack(songs[index + 1]);
//     }
//   };

//   const playPrev = () => {
//     if (!currentTrack) return;

//     const index = songs.findIndex(
//       (song) => song.trackId === currentTrack.trackId
//     );

//     if (index > 0) {
//       playTrack(songs[index - 1]);
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
//         fontFamily: "'Segoe UI', sans-serif",
//         backgroundColor: "#fafafa",
//         paddingBottom: "120px",
//       }}
//     >
//       {/* HEADER */}
//       <div style={{ textAlign: "center", marginBottom: "30px" }}>
//         <img src={logo} alt="logo" style={{ width: "80px" }} />
//         <h1>Gishmaf Music Workshop & Streaming</h1>
//         <p>Learn music. Understand music. Stream music.</p>
//       </div>

//       {/* GENRE OVERVIEW */}
//       <div
//         style={{
//           maxWidth: "800px",
//           margin: "0 auto 40px auto",
//           lineHeight: "1.6",
//           fontSize: "0.95rem",
//           color: "#444",
//         }}
//       >
//         <h3>🎵 Understanding Music Genres</h3>
//         <p>
//           Music comes in different styles known as genres. Each genre has its
//           own sound, rhythm and cultural background.
//         </p>
//         <p>
//           <strong>Afrobeat</strong> blends African rhythms with jazz and funk.
//           <br />
//           <strong>Jazz</strong> focuses on improvisation and smooth
//           instrumentals.
//           <br />
//           <strong>Gospel</strong> is rooted in Christian worship and powerful
//           vocals.
//           <br />
//           <strong>Hip-Hop</strong> combines rap, beats and lyrical storytelling.
//           <br />
//           <strong>Classical</strong> uses orchestral instruments and structured
//           compositions.
//         </p>
//         <p>
//           Use the search below to explore any music genre and start streaming.
//         </p>
//       </div>

//       {/* SEARCH */}
//       <div style={{ textAlign: "center", marginBottom: "40px" }}>
//         <input
//           type="text"
//           placeholder="Search genre e.g jazz, gospel, afrobeat"
//           value={term}
//           onChange={(e) => setTerm(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && searchMusic(term)}
//           style={{
//             padding: "12px",
//             width: "60%",
//             maxWidth: "400px",
//             borderRadius: "25px",
//             border: "1px solid #ccc",
//           }}
//         />
//         <button
//           onClick={() => searchMusic(term)}
//           style={{
//             padding: "12px 20px",
//             marginLeft: "10px",
//             borderRadius: "25px",
//             border: "none",
//             background: "#1a73e8",
//             color: "#fff",
//             cursor: "pointer",
//           }}
//         >
//           Search
//         </button>
//       </div>

//       {/* MUSIC GRID */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//           gap: "20px",
//         }}
//       >
//         {songs.map((song) => (
//           <div
//             key={song.trackId}
//             onClick={() => playTrack(song)}
//             style={{
//               background: "#fff",
//               padding: "15px",
//               borderRadius: "10px",
//               boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
//               cursor: "pointer",
//               border:
//                 currentTrack?.trackId === song.trackId
//                   ? "2px solid #1a73e8"
//                   : "1px solid #eee",
//             }}
//           >
//             <img
//               src={song.artworkUrl100.replace("100x100bb", "300x300bb")}
//               alt={song.trackName}
//               style={{ width: "100%", borderRadius: "8px" }}
//             />
//             <h4>{song.trackName}</h4>
//             <p>{song.artistName}</p>
//             <small>Duration: {formatTime(song.trackTimeMillis)}</small>
//           </div>
//         ))}
//       </div>

//       {/* NOW PLAYING BAR */}
//       {currentTrack && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             background: "#1a73e8",
//             color: "#fff",
//             padding: "12px 20px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <div>
//             <strong>{currentTrack.trackName}</strong> –{" "}
//             {currentTrack.artistName}
//           </div>
//           <div>
//             <button onClick={playPrev} style={btn}>⏮</button>
//             <button onClick={togglePlayPause} style={btn}>
//               {isPlaying ? "⏸" : "▶"}
//             </button>
//             <button onClick={playNext} style={btn}>⏭</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const btn = {
//   background: "transparent",
//   border: "none",
//   color: "#fff",
//   fontSize: "18px",
//   margin: "0 10px",
//   cursor: "pointer",
// };


import { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.png";

export default function Music() {
  const [songs, setSongs] = useState([]);
  const [term, setTerm] = useState("afrobeat");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // ---------------- MOVIE STATES ----------------
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const TMDB_API_KEY = "PASTE_YOUR_TMDB_API_KEY_HERE";

  const audioRef = useRef(new Audio());

  // ---------------- MUSIC SEARCH ----------------
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

  // ---------------- FETCH MOVIES (TMDB) ----------------
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Movie fetch error:", err);
      }
    };

    fetchMovies();
  }, []);

  // ---------------- TRAILER FETCH ----------------
  const openMovie = async (movie) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}`
      );
      const data = await res.json();

      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        setSelectedMovie({
          title: movie.title,
          key: trailer.key,
        });
      }
    } catch (err) {
      console.error("Trailer error:", err);
    }
  };

  // ---------------- MUSIC PLAYER ----------------
  const playTrack = (song) => {
    if (!song.previewUrl) return;

    if (currentTrack?.trackId === song.trackId) {
      togglePlayPause();
      return;
    }

    audioRef.current.pause();
    audioRef.current.src = song.previewUrl;
    audioRef.current.load();

    audioRef.current.play();
    setCurrentTrack(song);
    setIsPlaying(true);
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

  const formatTime = (ms) => {
    if (!ms) return "0:30";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ paddingBottom: "120px", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* ================= YOUR ORIGINAL MUSIC UI (UNCHANGED) ================= */}

      <div style={{ padding: "60px 20px", backgroundColor: "#fafafa" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <img src={logo} alt="logo" style={{ width: "80px" }} />
          <h1>Gishmaf Music Workshop & Streaming</h1>
          <p>Learn music. Understand music. Stream music.</p>
        </div>

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
      </div>

      {/* ================= MOVIE SECTION (NEW) ================= */}

      <section
        style={{
          padding: "60px 30px",
          background: "linear-gradient(to right, #0f0f1a, #1c1c2e)",
          color: "#fff",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "25px" }}>
          🎬 Trending Movies
        </h2>

        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => openMovie(movie)}
              style={{
                minWidth: "250px",
                cursor: "pointer",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "transform 0.3s ease",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", height: "350px", objectFit: "cover" }}
              />
              <div style={{ padding: "10px" }}>
                <h4 style={{ margin: 0 }}>{movie.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TRAILER MODAL ================= */}
      {selectedMovie && (
        <div
          onClick={() => setSelectedMovie(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "80%", maxWidth: "900px" }}
          >
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${selectedMovie.key}?autoplay=1`}
              title={selectedMovie.title}
              allow="autoplay; encrypted-media"
              style={{ borderRadius: "10px", border: "none" }}
            />
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
