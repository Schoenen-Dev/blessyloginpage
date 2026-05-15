import { useState } from "react";

const API_URL = "https://blessyloginpage.onrender.com";

function App() {
  const [page, setPage] = useState("signup");
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signup() {
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful");
        setPage("login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Signup error");
    }
  }

  async function login() {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful");
        setUser(data.user);
        setPage("dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Login error");
    }
  }

  function logout() {
    setUser(null);
    setEmail("");
    setPassword("");
    setPage("login");
  }

  if (page === "dashboard") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.success}>Login Successful ✅</h1>
          <h2>Welcome, {user?.username}</h2>
          <p>Email: {user?.email}</p>
          <button style={styles.button} onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>{page === "signup" ? "Create Account" : "Login"}</h1>

        {page === "signup" && (
          <>
            <input style={styles.input} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          </>
        )}

        <input style={styles.input} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

        <input style={styles.input} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        {page === "signup" ? (
          <>
            <button style={styles.button} onClick={signup}>Signup</button>
            <p>Already have account? <button style={styles.linkBtn} onClick={() => setPage("login")}>Login</button></p>
          </>
        ) : (
          <>
            <button style={styles.button} onClick={login}>Login</button>
            <p>New user? <button style={styles.linkBtn} onClick={() => setPage("signup")}>Signup</button></p>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial"
  },
  card: {
    background: "white",
    width: "360px",
    padding: "35px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)"
  },
  input: {
    width: "100%",
    padding: "14px",
    margin: "12px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px"
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px"
  },
  linkBtn: {
    border: "none",
    background: "none",
    color: "#667eea",
    fontSize: "16px",
    cursor: "pointer"
  },
  success: {
    color: "green"
  }
};

export default App;