import React, { useState, useEffect } from "react";
import { setAuthToken } from "./api/apiClient";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserRenewals from "./pages/UserRenewals";
import Pricing from "./pages/Pricing";
import Reports from "./pages/Reports";
import AdminUsers from "./pages/AdminUsers";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [activeView, setActiveView] = useState("dashboard");
  const [currentEmail, setCurrentEmail] = useState(
    localStorage.getItem("email") || "admin@example.com"
  );

  const isAdmin = currentEmail === "admin@example.com";

  useEffect(() => {
    if (token) setAuthToken(token);
  }, [token]);

  const handleLoginSuccess = (tokenValue, email) => {
    setToken(tokenValue);
    setCurrentEmail(email);
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("email", email);
    setAuthToken(tokenValue);
  };

  const handleLogout = () => {
    setToken(null);
    setAuthToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  if (!token) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="layout">
      <Sidebar
        activeView={activeView}
        onChangeView={setActiveView}
        isAdmin={isAdmin}
      />
      <main className="content">
        <Navbar email={currentEmail} onLogout={handleLogout} />
        {activeView === "dashboard" && <Dashboard />}
        {activeView === "renewals" && <UserRenewals isAdmin={isAdmin} />}
        {activeView === "pricing" && isAdmin && <Pricing />}
        {activeView === "reports" && isAdmin && <Reports />}
        {activeView === "users" && isAdmin && <AdminUsers />}
      </main>
    </div>
  );
}

export default App;
