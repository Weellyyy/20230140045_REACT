import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Objek untuk menampung semua gaya CSS
const styles = {
    loginPageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#282c34', // Warna latar belakang gelap
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
        boxSizing: 'border-box',
    },
    h2: {
        fontSize: '2.5em',
        marginBottom: '20px',
        color: 'white',
    },
    form: {
        backgroundColor: '#3a3f47',
        padding: '40px 50px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '400px',
    },
    formDiv: {
        marginBottom: '20px',
        textAlign: 'left',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '1.1em',
        color: '#cccccc',
    },
    input: {
        width: 'calc(100% - 24px)',
        padding: '12px',
        border: '1px solid #555',
        borderRadius: '5px',
        backgroundColor: '#454a52',
        color: 'white',
        fontSize: '1em',
    },
    button: {
        backgroundColor: '#61dafb',
        color: '#282c34',
        padding: '12px 25px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1.1em',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        width: '100%',
    },
    buttonHover: {
        backgroundColor: '#4fa3d7',
    }
};


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isHovered, setIsHovered] = useState(false); // State untuk hover effect
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password }
            );
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            alert("Login successful!");
            navigate("/");
        } catch (error) {
            console.error("login gagal:", error.response?.data || "Server error");
            alert("login gagal. periksa kembali password anda");
        }
    };

    // Gabungkan style dasar tombol dengan style hover jika isHovered true
    const buttonStyle = {
        ...styles.button,
        ...(isHovered ? styles.buttonHover : null)
    };

    return (
        <div style={styles.loginPageContainer}>
            <h2 style={styles.h2}>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formDiv}>
                    <label style={styles.label}>Email:</label>
                    <input
                        style={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={styles.formDiv}>
                    <label style={styles.label}>Password:</label>
                    <input
                        style={styles.input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Login
                </button>
            </form>
        </div>
    );
}
export default LoginPage;