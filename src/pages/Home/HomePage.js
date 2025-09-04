// src/pages/HomePage.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
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

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "1.2em",
    marginTop: "20px",
    backgroundColor: "#61dafb",
    color: "#282c34",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none",
  };

  let userName = null;
  if (isLoggedIn) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      userName = user?.name ? user.name : (user?.email ? user.email.split("@")[0] : null);
    } catch {}
  }

  return (
    <div style={containerStyle}>
      <h1>Selamat Datang di Aplikasi Todo List</h1>
      {userName && (
        <h2 style={{ margin: 0, marginBottom: 20 }}>Selamat Datang, {userName}!</h2>
      )}
      <p>Kelola semua tugas Anda dengan mudah dan efisien.</p>
      <Link to="/todos" style={buttonStyle}>
        Lihat Daftar Todo
      </Link>
      {isLoggedIn ? (
        <button style={buttonStyle} onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" style={buttonStyle}>
            Login
          </Link>
          <Link to="/register" style={{ ...buttonStyle, marginTop: 10 }}>
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default HomePage;