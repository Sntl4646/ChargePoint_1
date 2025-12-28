import React, { useEffect, useState } from "react";
import api from "../api/apiClient";
import { StatCard } from "../components/Cards";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("/dashboard/summary")
      .then((res) => setData(res.data))
      .catch(() => {});
  }, []);

  if (!data) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="grid">
        <StatCard label="Total Renewals" value={data.total_renewals} />
        <StatCard label="Pending" value={data.pending_renewals} />
        <StatCard label="In Progress" value={data.in_progress_renewals} />
        <StatCard label="Closed" value={data.closed_renewals} />
        <StatCard label="Expired" value={data.expired_renewals} />
        <StatCard
          label="Revenue Pipeline"
          value={`$${data.revenue_pipeline.toFixed(0)}`}
        />
        <StatCard
          label="Renewals in 30 Days"
          value={data.upcoming_30_days}
        />
      </div>
    </div>
  );
}

export default Dashboard;
