import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include",
    });

    if (res.ok) navigate("/admin");
    else alert("Wrong credentials");
  };

  return (
    <div style={{ padding: "80px" }}>
      <h2>Admin Login</h2>
      <input placeholder="Username" onChange={e=>setForm({...form,username:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <button onClick={login}>Login</button>
    </div>
  );
}
