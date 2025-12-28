import React from "react";

function RenewButton({ expiry, status, onClick }) {
  const today = new Date();
  const expDate = new Date(expiry);
  const diffDays = (expDate - today) / (1000 * 60 * 60 * 24);
  const canShow = diffDays <= 30 && status !== "expired";

  if (!canShow) return null;

  return (
    <button className="btn-renew" onClick={onClick}>
      Renew Now
    </button>
  );
}

export default RenewButton;
