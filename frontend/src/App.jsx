import { useState } from "react";

const API_URL = "https://blessyloginpage.onrender.com";

function App() {

    const [page, setPage] = useState("signup");

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

            console.log(data);

            if (res.ok) {

                alert("Signup successful");

                setPage("login");

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

            console.log(data);

            if (res.ok) {

                alert("Login successful");

            } else {

                alert(data.message || "Login failed");

            }

        } catch (err) {

            console.log(err);

            alert("Login error");

        }

    }

    return (

        <div style={{ textAlign: "center", marginTop: "100px" }}>

            <h1>Blessy Signup Page</h1>

            {
                page === "signup" ? (
                    <div>

                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <br /><br />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <br /><br />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <br /><br />

                        <button onClick={signup}>
                            Signup
                        </button>

                        <p>
                            Already have account?
                            <button onClick={() => setPage("login")}>
                                Login
                            </button>
                        </p>

                    </div>
                ) : (
                    <div>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <br /><br />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <br /><br />

                        <button onClick={login}>
                            Login
                        </button>

                        <p>
                            New user?
                            <button onClick={() => setPage("signup")}>
                                Signup
                            </button>
                        </p>

                    </div>
                )
            }

        </div>

    );

}

export default App;