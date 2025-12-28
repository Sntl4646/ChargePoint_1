import React, { useEffect, useState } from "react";
import api from "../api/apiClient";

function Pricing() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    api.get("/pricing").then((res) => setPlans(res.data));
  }, []);

  return (
    <div>
      <h2>Pricing Plans</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Plan</th>
            <th>Renewal Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((p) => (
            <tr key={p.id}>
              <td>{p.plan_name}</td>
              <td>${p.renewal_price}</td>
              <td>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Pricing;
