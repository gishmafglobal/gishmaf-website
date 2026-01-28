

// import { useEffect, useState } from "react";

// export default function About() {
//   const [blocks, setBlocks] = useState([]);

//   useEffect(() => {
//     fetch("http://https://gishmaf-website.onrender.com//posts/about")
//       .then(res => res.json())
//       .then(data => setBlocks(data));
//   }, []);

//   return (
//     <div style={{ padding: "80px" }}>
//       {blocks.map(b => (
//         <div key={b.id} style={{ marginBottom: "40px" }}>
//           <h2>{b.title}</h2>
//           {b.image && <img src={b.image} width="300" />}
//           <p>{b.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

import AboutDisplay from "../components/AboutDisplay";

export default function About() {
  return (
    <div>
      <AboutDisplay />
    </div>
  );
}
