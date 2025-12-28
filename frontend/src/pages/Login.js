import React, { useState } from "react";
import { login } from "../api/auth";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Welcome@123");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(email, password);
      onLoginSuccess(data.access_token, email);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>ChargePoint</h1>
        <p>Renewal Management Portal</p>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="error">{error}</div>}
          <button type="submit">Sign In</button>
        </form>
        <div className="login-hint">
          admin@example.com / Welcome@123
        </div>
      </div>
    </div>
  );
}

export default Login;
