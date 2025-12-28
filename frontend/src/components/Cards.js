import React from "react";

export function StatCard({ label, value, subtitle }) {
  return (
    <div className="card">
      <div className="card-label">{label}</div>
      <div className="card-value">{value}</div>
      {subtitle && <div className="card-sub">{subtitle}</div>}
    </div>
  );
}
