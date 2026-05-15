import { useState } from "react";

const API_URL = "https://blessyloginpage.onrender.com";

function App() {
  const [page, setPage] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signup() {
    const res = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) setPage("login");
  }

  async function login() {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setPage("dashboard");
    }
  }

  if (page === "dashboard") {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Dashboard</h1>
        <h2>Welcome {user?.username}</h2>
        <p>{user?.email}</p>
        <button onClick={() => {
          localStorage.removeItem("user");
          setPage("login");
        }}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>{page === "login" ? "Blessy Login Page" : "Blessy Signup Page"}</h1>

      {page === "signup" && (
        <>
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br /><br />
        </>
      )}

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      {page === "login" ? (
        <>
          <button onClick={login}>Login</button>
          <p>
            New user?{" "}
            <button onClick={() => setPage("signup")}>Signup</button>
          </p>
        </>
      ) : (
        <>
          <button onClick={signup}>Signup</button>
          <p>
            Already have account?{" "}
            <button onClick={() => setPage("login")}>Login</button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;