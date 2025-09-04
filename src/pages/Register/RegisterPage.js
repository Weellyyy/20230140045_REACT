import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        // Coba ambil pesan error spesifik dari server
        setError(data.message || data.error || 'Registration failed');
        return;
      }
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  // Color palette sama seperti homepage
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#282c34",
    color: "white",
    fontFamily: "sans-serif",
  };

  const formStyle = {
    backgroundColor: "#3a3f47",
    padding: "40px 50px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "1.1em",
    color: "#cccccc",
    textAlign: "left",
  };

  const inputStyle = {
    width: "calc(100% - 24px)",
    padding: "12px",
    border: "1px solid #555",
    borderRadius: "5px",
    backgroundColor: "#454a52",
    color: "white",
    fontSize: "1em",
    marginBottom: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#61dafb",
    color: "#282c34",
    padding: "12px 25px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.1em",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    width: "100%",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '2.5em', marginBottom: 20, color: 'white' }}>Register</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={{ marginBottom: 20, textAlign: 'left' }}>
          <label style={labelStyle}>Name:</label>
          <input
            style={inputStyle}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: 20, textAlign: 'left' }}>
          <label style={labelStyle}>Email:</label>
          <input
            style={inputStyle}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: 20, textAlign: 'left' }}>
          <label style={labelStyle}>Password:</label>
          <input
            style={inputStyle}
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
      <div style={{ marginTop: 20 }}>
        <span>wes ndue akun kang? </span>
        <Link to="/login" style={{ color: '#61dafb', textDecoration: 'underline' }}>Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
