import React, {useState, useEffect} from "react";
import {AppProvider} from "./Context/Context.jsx";
import {BrowserRouter, Link, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import App from "./App.jsx";
import Product from "./components/Product.jsx";
import axios from "./axios.jsx";

const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const [formData, setFormData] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/login", {
                username: username,
                password: password}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            console.log(response.data);
            if (response.data === true) {
                setMessage("Login successful! 🎉");
                setFormData("login successful.")
            } else {
                setMessage("Invalid credentials ❌");
            }
        } catch (e) {
            console.error("Login failed", e)
        }
    }


    useEffect(() => {
        if (formData) {
            navigate("/home")
        }
    }, [formData, navigate])

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
}

/*return (
    <AppProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<App />} />
            </Routes>
        </BrowserRouter>
    </AppProvider>
);*/

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
//export default Login;

