import React from "react";

function Sidebar({ activeView, onChangeView, isAdmin }) {
  const navItem = (id, label) => (
    <button
      className={
        "sidebar-item" + (activeView === id ? " sidebar-item-active" : "")
      }
      onClick={() => onChangeView(id)}
    >
      {label}
    </button>
  );

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="icon">⚡</div>
        <div>
          <div className="logo-title">ChargePoint</div>
          <div className="logo-sub">Renewal Management</div>
        </div>
      </div>
      <nav>
        {navItem("dashboard", "Dashboard")}
        {navItem("renewals", "My Renewals")}
        {isAdmin && navItem("pricing", "Pricing")}
        {isAdmin && navItem("reports", "Reports")}
        {isAdmin && navItem("users", "Users")}
      </nav>
    </aside>
  );
}

export default Sidebar;
