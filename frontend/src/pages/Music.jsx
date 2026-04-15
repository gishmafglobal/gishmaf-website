// import { useEffect, useState, useRef } from "react";
// import logo from "../assets/logo.png";

// export default function Music() {
//   const [songs, setSongs] = useState([]);
//   const [term, setTerm] = useState("afrobeat");
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const [user, setUser] = useState(null);
//   const [showAuth, setShowAuth] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [authForm, setAuthForm] = useState({ email: "", password: "" });

//   const audioRef = useRef(new Audio());

//   // =========================
//   // CHECK SAVED USER
//   // =========================
//   useEffect(() => {
//     const savedUser = localStorage.getItem("gishmaf_user");
//     if (savedUser) setUser(JSON.parse(savedUser));
//   }, []);

//   // =========================
//   // MUSIC SEARCH
//   // =========================
//   const searchMusic = async (searchTerm) => {
//     if (!searchTerm.trim()) return;
//     const res = await fetch(
//       `https://itunes.apple.com/search?term=${encodeURIComponent(
//         searchTerm
//       )}&media=music&limit=20`
//     );
//     const data = await res.json();
//     setSongs(data.results || []);
//   };

//   useEffect(() => {
//     searchMusic(term);
//   }, []);

//   const playTrack = (song) => {
//     audioRef.current.pause();
//     audioRef.current.src = song.previewUrl;
//     audioRef.current.play();
//     setCurrentTrack(song);
//     setIsPlaying(true);
//   };

//   const togglePlayPause = () => {
//     if (audioRef.current.paused) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     } else {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   // =========================
//   // AUTH
//   // =========================
//   const handleAuth = () => {
//     if (!authForm.email || !authForm.password) return;
//     localStorage.setItem("gishmaf_user", JSON.stringify(authForm));
//     setUser(authForm);
//     setShowAuth(false);
//   };

//   const logout = () => {
//     localStorage.removeItem("gishmaf_user");
//     setUser(null);
//   };

//   // =========================
//   // PUBLIC DOMAIN MOVIES
//   // =========================
//   const movies = [
//     {
//       title: "The General (1926)",
//       description: "Classic silent comedy starring Buster Keaton.",
//       embed: "https://www.youtube.com/embed/1e5R1C9bK2M",
//     },
//     {
//       title: "His Girl Friday (1940)",
//       description: "Fast-paced romantic comedy film.",
//       embed: "https://www.youtube.com/embed/3n9i6c9M2lQ",
//     },
//     {
//       title: "Santa Claus (1959)",
//       description: "Vintage family holiday film.",
//       embed: "https://www.youtube.com/embed/5kR4k2pYqXQ",
//     },
//     {
//       title: "Betty Boop Cartoon Short",
//       description: "Classic 1930s public domain animation.",
//       embed: "https://www.youtube.com/embed/6x7uQzYQ3uE",
//     },
//   ];

//   return (
//     <div style={{ fontFamily: "Segoe UI", background: "#f4f6fb", minHeight: "100vh" }}>

//       {/* HEADER */}
//       <div style={{ textAlign: "center", padding: "40px 20px" }}>
//         <img src={logo} alt="logo" style={{ width: "80px" }} />
//         <h1 style={{ fontSize: "28px" }}>Gishmaf Streaming Platform</h1>

//         {user ? (
//           <div>
//             <span style={{ marginRight: "10px" }}>Welcome, {user.email}</span>
//             <button onClick={logout} style={btnPrimary}>Logout</button>
//           </div>
//         ) : (
//           <button onClick={() => setShowAuth(true)} style={btnPrimary}>
//             Sign In / Sign Up
//           </button>
//         )}
//       </div>

//       {/* MUSIC SECTION */}
//       <div style={{ padding: "20px 40px" }}>
//         <h2>🎵 Music Preview</h2>
//         <div style={grid}>
//           {songs.map((song) => (
//             <div key={song.trackId} style={card} onClick={() => playTrack(song)}>
//               <img
//                 src={song.artworkUrl100.replace("100x100bb", "300x300bb")}
//                 alt={song.trackName}
//                 style={{ width: "100%", borderRadius: "10px" }}
//               />
//               <h4>{song.trackName}</h4>
//               <p style={{ color: "#555" }}>{song.artistName}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* MOVIE SECTION */}
//       <div style={{ padding: "40px" }}>
//         <h2>🎬 Featured Public Domain Movies</h2>
//         <div style={grid}>
//           {movies.map((movie, i) => (
//             <div key={i} style={card}>
//               <h4>{movie.title}</h4>
//               <p style={{ fontSize: "14px", color: "#555" }}>
//                 {movie.description}
//               </p>

//               {!user ? (
//                 <div style={lockedBox}>
//                   <p>🔒 Please sign in to watch</p>
//                   <button onClick={() => setShowAuth(true)} style={btnPrimary}>
//                     Login to Watch
//                   </button>
//                 </div>
//               ) : (
//                 <iframe
//                   width="100%"
//                   height="200"
//                   src={movie.embed}
//                   allowFullScreen
//                   style={{ borderRadius: "10px", marginTop: "10px" }}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* AUTH MODAL */}
//       {showAuth && (
//         <div style={modalOverlay}>
//           <div style={modal}>
//             <h3>{isLogin ? "Login" : "Create Account"}</h3>

//             <input
//               placeholder="Email"
//               onChange={(e) =>
//                 setAuthForm({ ...authForm, email: e.target.value })
//               }
//               style={input}
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               onChange={(e) =>
//                 setAuthForm({ ...authForm, password: e.target.value })
//               }
//               style={input}
//             />

//             <button onClick={handleAuth} style={btnPrimary}>
//               {isLogin ? "Login" : "Sign Up"}
//             </button>

//             <p
//               style={{ marginTop: "10px", cursor: "pointer", color: "#1a73e8" }}
//               onClick={() => setIsLogin(!isLogin)}
//             >
//               {isLogin ? "Create an account" : "Already have an account?"}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ================== STYLES ==================

// const grid = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//   gap: "25px",
//   marginTop: "20px",
// };

// const card = {
//   background: "#fff",
//   padding: "20px",
//   borderRadius: "15px",
//   boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//   transition: "0.3s",
// };

// const btnPrimary = {
//   padding: "10px 18px",
//   background: "#1a73e8",
//   color: "#fff",
//   border: "none",
//   borderRadius: "25px",
//   cursor: "pointer",
// };

// const lockedBox = {
//   background: "#eee",
//   padding: "20px",
//   textAlign: "center",
//   borderRadius: "10px",
//   marginTop: "10px",
// };

// const modalOverlay = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   background: "rgba(0,0,0,0.5)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// };

// const modal = {
//   background: "#fff",
//   padding: "30px",
//   borderRadius: "15px",
//   width: "300px",
//   textAlign: "center",
// };

// const input = {
//   width: "100%",
//   padding: "10px",
//   marginBottom: "10px",
//   borderRadius: "8px",
//   border: "1px solid #ccc",
// };



import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function StreamingPage() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [songs, setSongs] = useState([]);

  // ================= CHECK USER =================
  useEffect(() => {
    const saved = localStorage.getItem("gishmaf_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // ================= MUSIC SEARCH =================
  useEffect(() => {
    fetch(
      "https://itunes.apple.com/search?term=afrobeats&media=music&limit=12"
    )
      .then((res) => res.json())
      .then((data) => setSongs(data.results));
  }, []);

  const handleAuth = () => {
    if (!authForm.email || !authForm.password) return;
    localStorage.setItem("gishmaf_user", JSON.stringify(authForm));
    setUser(authForm);
    setShowAuth(false);
  };

  // ================= MOVIES =================
  const movies = [
    {
      title: "Big Buck Bunny",
      poster:
        "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg",
      trailer: "https://www.youtube.com/embed/aqz-KE-bpKQ?rel=0",
      description:
        "An open-source animated short film loved worldwide."
    },
    {
      title: "Sintel",
      poster:
        "https://upload.wikimedia.org/wikipedia/commons/7/75/Sintel_poster.jpg",
      trailer: "https://www.youtube.com/embed/eRsGyueVLvQ?rel=0",
      description:
        "A fantasy adventure short film created by Blender Foundation."
    },
    {
      title: "The General (1926)",
      poster:
        "https://upload.wikimedia.org/wikipedia/commons/3/3e/The_General_%281926%29_poster.jpg",
      trailer: "https://www.youtube.com/embed/1e5R1C9bK2M?rel=0",
      description:
        "Classic silent comedy starring Buster Keaton."
    }
  ];

  return (
    <div style={pageStyle}>
      {/* HEADER */}
      <div style={header}>
        <img src={logo} alt="logo" style={{ width: 70 }} />
        <h1>Gishmaf Entertainment</h1>
      </div>

      {/* ================= MUSIC SECTION ================= */}
      <section style={{ padding: "40px" }}>
        <h2 style={sectionTitle}>🎵 Discover Music</h2>

        <p style={paragraph}>
          Explore diverse music genres including <strong>Afrobeats</strong>,
          <strong> Hip-Hop</strong>, <strong>R&B</strong>,
          <strong> Pop</strong>, <strong>Jazz</strong>, and
          <strong> Classical</strong>. Music connects cultures and emotions —
          from energetic dance rhythms to soulful melodies and orchestral
          masterpieces.
        </p>

        <div style={musicGrid}>
          {songs.map((song) => (
            <div key={song.trackId} style={musicCard}>
              <img
                src={song.artworkUrl100.replace("100x100bb", "300x300bb")}
                alt={song.trackName}
                style={musicImg}
              />
              <h4>{song.trackName}</h4>
              <p style={{ color: "#aaa" }}>{song.artistName}</p>
              <audio controls src={song.previewUrl} style={{ width: "100%" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ================= MOVIE SECTION ================= */}
      <section style={{ padding: "40px" }}>
        <h2 style={sectionTitle}>🎬 Featured Movies</h2>

        <div style={movieGrid}>
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              movie={movie}
              user={user}
              setShowAuth={setShowAuth}
            />
          ))}
        </div>
      </section>

      {/* AUTH MODAL */}
      {showAuth && (
        <div style={modalOverlay}>
          <div style={modal}>
            <h3>Sign In / Sign Up</h3>

            <input
              placeholder="Email"
              style={input}
              onChange={(e) =>
                setAuthForm({ ...authForm, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              style={input}
              onChange={(e) =>
                setAuthForm({ ...authForm, password: e.target.value })
              }
            />

            <button style={primaryBtn} onClick={handleAuth}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ================= MOVIE CARD =================
function MovieCard({ movie, user, setShowAuth }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={movieCard}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => !user && setShowAuth(true)}
    >
      {!hover ? (
        <img src={movie.poster} alt={movie.title} style={moviePoster} />
      ) : (
        <iframe
          src={`${movie.trailer}&autoplay=1&mute=1`}
          title={movie.title}
          allow="autoplay; encrypted-media"
          style={moviePoster}
        />
      )}

      <div style={{ padding: "15px" }}>
        <h4>{movie.title}</h4>
        <p style={{ color: "#bbb", fontSize: "14px" }}>
          {movie.description}
        </p>
      </div>
    </div>
  );
}

// ================= STYLES =================
const pageStyle = {
  background: "#0d0d18",
  color: "#fff",
  minHeight: "100vh",
  fontFamily: "Segoe UI"
};

const header = {
  textAlign: "center",
  padding: "40px 20px"
};

const sectionTitle = {
  fontSize: "26px",
  marginBottom: "15px"
};

const paragraph = {
  color: "#bbb",
  marginBottom: "30px",
  maxWidth: "800px"
};

const musicGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "25px"
};

const musicCard = {
  background: "#1a1a2b",
  padding: "15px",
  borderRadius: "15px"
};

const musicImg = {
  width: "100%",
  borderRadius: "10px",
  marginBottom: "10px"
};

const movieGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "30px"
};

const movieCard = {
  background: "#1a1a2b",
  borderRadius: "15px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
};

const moviePoster = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  border: "none"
};

const primaryBtn = {
  padding: "10px 20px",
  borderRadius: "25px",
  border: "none",
  background: "#ff3d00",
  color: "#fff",
  cursor: "pointer"
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "#1a1a2b",
  padding: "30px",
  borderRadius: "15px",
  width: "320px",
  textAlign: "center"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "none"
};