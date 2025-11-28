import { useEffect, useState } from "react";
import {
  listPledges,
  createPledge,
  completePledge,
  togglePledge,
} from "../api.js";

export default function Pledges() {
  const [pledges, setPledges] = useState([]);
  const [title, setTitle] = useState("");
  const [targetPerWeek, setTargetPerWeek] = useState(1);

  async function refresh() {
    const data = await listPledges();
    setPledges(data);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function addPledge(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await createPledge({ title, targetPerWeek: Number(targetPerWeek) || 1 });
    setTitle("");
    setTargetPerWeek(1);
    refresh();
  }

  return (
    <>
      <form onSubmit={addPledge} style={{ marginBottom: 12 }}>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Bike to work"
        />
        <label>Target per week</label>
        <input
          type="number"
          min="1"
          value={targetPerWeek}
          onChange={(e) => setTargetPerWeek(e.target.value)}
        />
        <button type="submit">Add pledge</button>
      </form>

      {!pledges.length ? (
        <p className="small">No pledges yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: 8 }}>Title</th>
                <th style={{ textAlign: "right", padding: 8 }}>Target/week</th>
                <th style={{ textAlign: "right", padding: 8 }}>Completed</th>
                <th style={{ textAlign: "center", padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pledges.map((p) => (
                <tr key={p._id}>
                  <td style={{ padding: 8 }}>{p.title}</td>
                  <td style={{ padding: 8, textAlign: "right" }}>
                    {p.targetPerWeek}
                  </td>
                  <td style={{ padding: 8, textAlign: "right" }}>
                    {p.completedCount}
                  </td>
                  <td style={{ padding: 8, textAlign: "center" }}>
                    <button
                      onClick={async () => {
                        await completePledge(p._id);
                        refresh();
                      }}
                    >
                      Complete
                    </button>{" "}
                    <button
                      onClick={async () => {
                        await togglePledge(p._id);
                        refresh();
                      }}
                    >
                      {p.active ? "Deactivate" : "Activate"}
                    </button>
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
