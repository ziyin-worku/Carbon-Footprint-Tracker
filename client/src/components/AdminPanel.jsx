import { useEffect, useState } from "react";
import {
  adminListUsers,
  adminSetRole,
  adminListActivities,
  adminDeleteActivity,
} from "../api.js";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [acts, setActs] = useState([]);
  const [filter, setFilter] = useState({ userId: "", from: "", to: "" });

  async function refreshUsers() {
    const u = await adminListUsers();
    setUsers(u);
  }
  async function refreshActivities() {
    const a = await adminListActivities(filter);
    setActs(a);
  }

  useEffect(() => {
    refreshUsers();
  }, []);

  useEffect(() => {
    refreshActivities();
  }, [filter.userId, filter.from, filter.to]);

  return (
    <div className="grid">
      <div className="card">
        <h3>Users</h3>
        {!users.length ? (
          <p className="small">No users yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: 8 }}>Name</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Email</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Role</th>
                  <th style={{ textAlign: "center", padding: 8 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td style={{ padding: 8 }}>{u.name}</td>
                    <td style={{ padding: 8 }}>{u.email}</td>
                    <td style={{ padding: 8 }}>{u.role}</td>
                    <td style={{ padding: 8, textAlign: "center" }}>
                      <button
                        onClick={async () => {
                          await adminSetRole(u._id, "user");
                          refreshUsers();
                        }}
                      >
                        Set user
                      </button>{" "}
                      <button
                        onClick={async () => {
                          await adminSetRole(u._id, "admin");
                          refreshUsers();
                        }}
                      >
                        Set admin
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Activities moderation</h3>
        <div className="grid" style={{ marginBottom: 12 }}>
          <div>
            <label>User ID</label>
            <input
              value={filter.userId}
              onChange={(e) =>
                setFilter((f) => ({ ...f, userId: e.target.value }))
              }
            />
          </div>
          <div>
            <label>From</label>
            <input
              type="date"
              value={filter.from}
              onChange={(e) =>
                setFilter((f) => ({ ...f, from: e.target.value }))
              }
            />
          </div>
          <div>
            <label>To</label>
            <input
              type="date"
              value={filter.to}
              onChange={(e) => setFilter((f) => ({ ...f, to: e.target.value }))}
            />
          </div>
        </div>

        {!acts.length ? (
          <p className="small">No activities found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: 8 }}>ID</th>
                  <th style={{ textAlign: "left", padding: 8 }}>User</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Date</th>
                  <th style={{ textAlign: "right", padding: 8 }}>Km</th>
                  <th style={{ textAlign: "right", padding: 8 }}>kWh</th>
                  <th style={{ textAlign: "right", padding: 8 }}>Meals</th>
                  <th style={{ textAlign: "center", padding: 8 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {acts.map((a) => (
                  <tr key={a._id}>
                    <td style={{ padding: 8 }}>{a._id}</td>
                    <td style={{ padding: 8 }}>{a.userId}</td>
                    <td style={{ padding: 8 }}>
                      {new Date(a.date).toLocaleString()}
                    </td>
                    <td style={{ padding: 8, textAlign: "right" }}>
                      {a.transportKm}
                    </td>
                    <td style={{ padding: 8, textAlign: "right" }}>
                      {a.electricityKwh}
                    </td>
                    <td style={{ padding: 8, textAlign: "right" }}>
                      {a.meals}
                    </td>
                    <td style={{ padding: 8, textAlign: "center" }}>
                      <button
                        onClick={async () => {
                          await adminDeleteActivity(a._id);
                          setActs((prev) =>
                            prev.filter((x) => x._id !== a._id)
                          );
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
