import { useEffect, useState } from "react";
import { getLeaderboard } from "../api.js";

export default function Leaderboard() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getLeaderboard()
      .then(setRows)
      .catch((e) => console.error(e));
  }, []);

  if (!rows.length) return <p className="small">No data yet.</p>;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: 8 }}>User</th>
            <th style={{ textAlign: "right", padding: 8 }}>Total kg CO₂e</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.userId}>
              <td style={{ padding: 8 }}>{r.name}</td>
              <td style={{ padding: 8, textAlign: "right" }}>
                {r.total.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
