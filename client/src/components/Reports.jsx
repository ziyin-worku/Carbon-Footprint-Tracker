import { useEffect, useState } from "react";
import { getReports } from "../api.js";

export default function Reports() {
  const [period, setPeriod] = useState("month");
  const [rows, setRows] = useState([]);

  async function refresh() {
    const data = await getReports(period);
    setRows(data.rows);
  }

  useEffect(() => {
    refresh();
  }, [period]);

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <label>Period</label>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
        </select>
      </div>

      {!rows.length ? (
        <p className="small">No report data yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: 8 }}>
                  {period === "week" ? "Week" : "Month"}
                </th>
                <th style={{ textAlign: "right", padding: 8 }}>Total</th>
                <th style={{ textAlign: "right", padding: 8 }}>Transport</th>
                <th style={{ textAlign: "right", padding: 8 }}>Electricity</th>
                <th style={{ textAlign: "right", padding: 8 }}>Food</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r._id}>
                  <td style={{ padding: 8 }}>{r._id}</td>
                  <td style={{ padding: 8, textAlign: "right" }}>
                    {r.total.toFixed(2)}
                  </td>
                  <td style={{ padding: 8, textAlign: "right" }}>
                    {r.transport.toFixed(2)}
                  </td>
                  <td style={{ padding: 8, textAlign: "right" }}>
                    {r.electricity.toFixed(2)}
                  </td>
                  <td style={{ padding: 8, textAlign: "right" }}>
                    {r.food.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
