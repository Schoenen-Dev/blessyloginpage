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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      const data = await res.json();

      if (res.ok) {

        alert("Signup successful ✅");

        setPage("login");

        setUsername("");
        setEmail("");
        setPassword("");

      } else {

        alert(data.message || "Signup failed");

      }

    } catch (err) {

      console.log(err);
      alert("Signup error");

    }
  }

  async function login() {

    try {

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (res.ok) {

        alert("Login successful ✅");

        setUser(data.user);

        setPage("dashboard");

      } else {

        alert(data.message || "Login failed");

      }

    } catch (err) {

      console.log(err);
      alert("Login error");

    }
  }

  function logout() {

    setUser(null);

    setEmail("");
    setPassword("");

    setPage("login");
  }

  // DASHBOARD PAGE

  if (page === "dashboard") {

    return (

      <div style={styles.page}>

        <div style={styles.dashboardCard}>

          <h1 style={styles.successTitle}>
            Welcome 🎉
          </h1>

          <h2 style={styles.dashboardText}>
            {user?.username}
          </h2>

          <p style={styles.dashboardEmail}>
            {user?.email}
          </p>

          <button
            style={styles.button}
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>
    );
  }

  // LOGIN + SIGNUP PAGE

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          {page === "signup"
            ? "Create Account"
            : "Login"}
        </h1>

        {page === "signup" && (

          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

        )}

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {page === "signup" ? (

          <>
            <button
              style={styles.button}
              onClick={signup}
            >
              Signup
            </button>

            <p style={styles.text}>
              Already have account?

              <button
                style={styles.linkBtn}
                onClick={() => setPage("login")}
              >
                Login
              </button>

            </p>
          </>

        ) : (

          <>
            <button
              style={styles.button}
              onClick={login}
            >
              Login
            </button>

            <p style={styles.text}>
              New user?

              <button
                style={styles.linkBtn}
                onClick={() => setPage("signup")}
              >
                Signup
              </button>

            </p>
          </>

        )}

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #4facfe 0%, #8e44ad 100%)",
    fontFamily: "Arial"
  },

  card: {
    width: "380px",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    textAlign: "center"
  },

  title: {
    fontSize: "36px",
    marginBottom: "30px",
    color: "#222",
    fontWeight: "bold",
    lineHeight: "1.2"
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box"
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#5b6ee1",
    color: "#fff",
    fontSize: "17px",
    cursor: "pointer",
    marginTop: "5px"
  },

  text: {
    marginTop: "18px",
    fontSize: "16px"
  },

  linkBtn: {
    border: "none",
    background: "none",
    color: "#5b6ee1",
    fontSize: "16px",
    cursor: "pointer",
    marginLeft: "5px"
  },

  dashboardCard: {
    width: "420px",
    background: "#fff",
    padding: "50px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)"
  },

  successTitle: {
    color: "green",
    fontSize: "40px",
    marginBottom: "20px"
  },

  dashboardText: {
    fontSize: "30px",
    marginBottom: "10px"
  },

  dashboardEmail: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "25px"
  }

};

export default App;