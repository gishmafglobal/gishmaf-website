// // import { useEffect, useState } from "react";

// // export default function Admin() {
// //   const [posts, setPosts] = useState([]);
// //   const [form, setForm] = useState({
// //     title: "",
// //     content: "",
// //     section: "",
// //   });

// //   const fetchPosts = async () => {
// //     const res = await fetch("http://localhost:5000/posts");
// //     const data = await res.json();
// //     setPosts(data);
// //   };

// //   useEffect(() => {
// //     fetchPosts();
// //   }, []);

// //   const createPost = async () => {
// //     await fetch("http://localhost:5000/posts", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(form),
// //     });
// //     fetchPosts();
// //   };

// //   const deletePost = async (id) => {
// //     await fetch(`http://localhost:5000/posts/${id}`, {
// //       method: "DELETE",
// //     });
// //     fetchPosts();
// //   };

// //   return (
// //     <div style={{ padding: "60px" }}>
// //       <h2>Admin Panel</h2>

// //       <input placeholder="Title" onChange={(e)=>setForm({...form,title:e.target.value})}/>
// //       <input placeholder="Section (books, skills...)" onChange={(e)=>setForm({...form,section:e.target.value})}/>
// //       <textarea placeholder="Content" onChange={(e)=>setForm({...form,content:e.target.value})}/>
// //       <button onClick={createPost}>Create</button>

// //       <hr />

// //       {posts.map(p => (
// //         <div key={p._id}>
// //           <h3>{p.title}</h3>
// //           <p>{p.section}</p>
// //           <button onClick={()=>deletePost(p._id)}>Delete</button>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// import { useState } from "react";

// export default function Admin() {
//   const [form, setForm] = useState({});

//   const submit = async () => {
//     const data = new FormData();
//     Object.keys(form).forEach(key => data.append(key, form[key]));

//     await fetch("http://localhost:5000/posts", {
//       method: "POST",
//       body: data,
//     });

//     alert("Content Uploaded!");
//   };

//   return (
//     <div style={{ padding: "60px" }}>
//       <h2>Upload Content</h2>

//       <input placeholder="Page (books, music, skills...)" onChange={e=>setForm({...form,page:e.target.value})} />
//       <input placeholder="Block (shelf, hero, section1...)" onChange={e=>setForm({...form,block:e.target.value})} />
//       <input placeholder="Title" onChange={e=>setForm({...form,title:e.target.value})} />
//       <textarea placeholder="Writeup" onChange={e=>setForm({...form,content:e.target.value})} />
//       <input type="number" placeholder="Order" onChange={e=>setForm({...form,order_no:e.target.value})} />

//       <p>Cover Image</p>
//       <input type="file" onChange={e=>setForm({...form,image:e.target.files[0]})} />

//       <p>PDF / File / Audio</p>
//       <input type="file" onChange={e=>setForm({...form,file:e.target.files[0]})} />

//       <button onClick={submit}>Upload</button>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { locations } from "../utils/locations";

// export default function Admin() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({});
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/check", { credentials: "include" })
//       .then(res => {
//         if (!res.ok) navigate("/admin-login");
//       });
//   }, []);

//   const handleLocation = (e) => {
//     const loc = locations[e.target.value];
//     setSelected(loc);
//     setForm({ ...form, page: loc.page, block: loc.block });
//   };

//   const submit = async () => {
//     const data = new FormData();
//     Object.keys(form).forEach(key => data.append(key, form[key]));

//     await fetch("http://localhost:5000/posts", {
//       method: "POST",
//       body: data,
//       credentials: "include",
//     });

//     alert("Uploaded to " + selected.label);
//   };

//   return (
//     <div style={{ padding: "60px" }}>
//       <h2>Content Manager</h2>

//       <label>Select Location</label>
//       <select onChange={handleLocation}>
//         <option>Select where this should appear</option>
//         {locations.map((loc, i) => (
//           <option key={i} value={i}>{loc.label}</option>
//         ))}
//       </select>

//       <input placeholder="Title" onChange={e=>setForm({...form,title:e.target.value})}/>
//       <textarea placeholder="Content" onChange={e=>setForm({...form,content:e.target.value})}/>
//       <input type="number" placeholder="Order" onChange={e=>setForm({...form,order_no:e.target.value})}/>

//       <p>Image</p>
//       <input type="file" onChange={e=>setForm({...form,image:e.target.files[0]})}/>

//       <p>File (PDF/Audio)</p>
//       <input type="file" onChange={e=>setForm({...form,file:e.target.files[0]})}/>

//       <button onClick={submit}>Upload</button>
//     </div>
//   );
// }
