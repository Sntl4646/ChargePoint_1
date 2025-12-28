import React, { useEffect, useState } from "react";
import api from "../api/apiClient";
import RenewButton from "../components/RenewButton";
import PaymentPopup from "../components/PaymentPopup";

function UserRenewals({ isAdmin }) {
  const [renewals, setRenewals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState("");
  const [selectedRenewal, setSelectedRenewal] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const load = () => {
    setLoading(true);
    // For users: pass owner_only=true; for admin we fetch all
    const params = isAdmin ? {} : { owner_only: true };
    api
      .get("/renewals", { params })
      .then((res) => setRenewals(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const openPaymentPopup = (item) => {
    setSelectedRenewal(item);
    setPopupOpen(true);
  };

  const handleConfirmPayment = async () => {
    if (!selectedRenewal) return;
    try {
      const id = selectedRenewal.id;
      // Step 1: mark payment-pending
      await api.post(`/renewals/renew/${id}`);
      // Step 2: fake complete payment
      const payRes = await api.post(`/payments/fake-complete/${id}`);
      setBanner(payRes.data.message || "Payment simulated successfully");
      setPopupOpen(false);
      setSelectedRenewal(null);
      load();
    } catch (err) {
      setBanner("Unable to process renewal.");
      setPopupOpen(false);
    }
  };

  if (loading) return <div>Loading renewals...</div>;

  return (
    <div>
      <h2>{isAdmin ? "All Renewals" : "My Renewals"}</h2>
      {banner && <div className="banner">{banner}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Contract</th>
            <th>Value</th>
            <th>Status</th>
            <th>Expiry</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {renewals.map((r) => (
            <tr key={r.id}>
              <td>{r.customer_name}</td>
              <td>{r.contract_id}</td>
              <td>${r.value}</td>
              <td>{r.status}</td>
              <td>{r.subscription_end}</td>
              <td>
                <RenewButton
                  expiry={r.subscription_end}
                  status={r.status}
                  onClick={() => openPaymentPopup(r)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaymentPopup
        open={popupOpen}
        renewal={selectedRenewal}
        onClose={() => setPopupOpen(false)}
        onConfirm={handleConfirmPayment}
      />
    </div>
  );
}

export default UserRenewals;
