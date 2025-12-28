import React from "react";

function PaymentPopup({ open, onClose, onConfirm, renewal }) {
  if (!open || !renewal) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Confirm Renewal</h3>
        <p>
          You are about to renew{" "}
          <strong>{renewal.customer_name}</strong> (
          {renewal.contract_id}).
        </p>
        <p>
          Amount: <strong>${renewal.value}</strong>
        </p>
        <p className="modal-note">
          This is a <strong>fake payment</strong> for demo only. We’ll mark it
          as <strong>Paid</strong> after you confirm.
        </p>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-primary">
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPopup;
