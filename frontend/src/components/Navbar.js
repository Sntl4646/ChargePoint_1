import React from "react";

function Navbar({ email, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-title">Subscription Renewal Center</div>
      <div className="navbar-right">
        <span className="navbar-user">{email}</span>
        <button className="navbar-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
