



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://propy-0mma.onrender.com/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token); // Store JWT token
      localStorage.setItem("userEmail", email); // Store user email
      alert("Login successful");
      navigate("/");
      window.location.reload(); // Reload the page to reflect navbar changes
    } catch (err) {
      console.error(err.response); // Log the full error response
      setError(err.response.data.message || "Login failed");
    }
  };

  return (
    <div className="container shadow-lg mt-4 mb-5 p-4">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
        <p className="mt-3">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
