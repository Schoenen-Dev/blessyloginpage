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
        } else {
            alert(data.message || "Signup failed");
        }

    } catch (err) {
        console.log(err);
        alert("Server error");
    }
}