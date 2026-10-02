import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";

const cards = [
  { label: "Total Inquiries", get: (s) => s.total, accent: "text-ink" },
  { label: "New", get: (s) => s.byStatus.New, accent: "text-blue-600" },
  { label: "In Progress", get: (s) => s.byStatus["In Progress"], accent: "text-amber-600" },
  { label: "Follow-up Required", get: (s) => s.byStatus["Follow-up Required"], accent: "text-orange-600" },
  { label: "Converted", get: (s) => s.byStatus.Converted, accent: "text-emerald-600" },
  { label: "Closed", get: (s) => s.byStatus.Closed, accent: "text-slate-500" },
];

// `refreshKey` changes whenever the list reloads, so the counts stay in step with the data
function InquiryStatCards({ refreshKey = 0 }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;
    axios
      .get(serverUrl + "/api/inquiries/stats", { withCredentials: true })
      .then((result) => !cancelled && setStats(result.data))
      .catch((error) => console.log(error));
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl border border-mist-line bg-white px-4 py-3.5">
          <p className="text-xs font-semibold text-slate-500">{card.label}</p>
          <p className={`mt-1 text-2xl font-bold tabular-nums ${card.accent}`}>
            {stats ? card.get(stats) : "–"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default InquiryStatCards;
