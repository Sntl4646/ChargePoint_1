import React from "react";
import api from "../api/apiClient";

function Reports() {
  const downloadCSV = async () => {
    const res = await api.get("/reports/renewals.csv", {
      responseType: "blob"
    });
    const blobUrl = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", "renewals.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div>
      <h2>Reports & Exports</h2>
      <p>Download renewals as CSV (openable in Excel).</p>
      <button className="btn-primary" onClick={downloadCSV}>
        Download Renewals (CSV/Excel)
      </button>
    </div>
  );
}

export default Reports;
