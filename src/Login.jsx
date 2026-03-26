import React, {useState} from "react";

const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "joshua" && password === "password") {
            setMessage("Login successful! 🎉");
        } else {
            setMessage("Invalid credentials ❌");
        }
    }

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};


const styles = {
    container: {
        maxWidth: "400px",
        margin: "100px auto",
        padding: "30px",
        boxShadow: "0 0 10px #ccc",
        borderRadius: "8px",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },
    input: {
        padding: "10px",
        fontSize: "16px"
    },
    button: {
        padding: "10px",
        fontSize: "16px",
        background: "“#4CAF50",
        color: "#fff",
        border: "none",
        cursor: "pointer"
    }
};

export default LoginForm;

