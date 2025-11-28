import { useEffect, useState } from "react";
import ActivityForm from "./components/ActivityForm.jsx";
import ActivityList from "./components/ActivityList.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import Pledges from "./components/Pledges.jsx";
import Reports from "./components/Reports.jsx";
import Reminder from "./components/Reminder.jsx";
import AdminPanel from "./components/AdminPanel.jsx";


import {
  listActivities,
  getFootprint,
  login,
  register,
  me,
  clearToken,
} from "./api.js";

export default function App() {
  const [auth, setAuth] = useState(me()); // { token, user }
  const [activities, setActivities] = useState([]);
  const [footprint, setFootprint] = useState(null);
  const [range, setRange] = useState({ from: "", to: "" });
  const [mode, setMode] = useState("login"); // 'login' or 'register'

  async function refresh() {
    if (!auth?.token) return;
    const acts = await listActivities(range);
    setActivities(acts);
    const fp = await getFootprint(range);
    setFootprint(fp);
  }

  useEffect(() => {
    refresh();
  }, [auth?.token, range.from, range.to]);

  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    try {
      await login({ email, password });
      setAuth(me());
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    try {
      await register({ name, email, password });
      setAuth(me());
    } catch (err) {
      alert(err.response?.data?.error || "Register failed");
    }
  }

  function logout() {
    clearToken();
    setAuth(null);
    setActivities([]);
    setFootprint(null);
  }

  if (!auth?.token) {
    return (
      <div className="container">
        <h1>Carbon Footprint Tracker</h1>
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => setMode("login")}
              style={{
                background: mode === "login" ? "#22c55e" : "#1f2937",
                color: "#fff",
              }}
            >
              Login
            </button>
            <button
              onClick={() => setMode("register")}
              style={{
                background: mode === "register" ? "#22c55e" : "#1f2937",
                color: "#fff",
              }}
            >
              Register
            </button>
          </div>

          {mode === "login" ? (
            <form onSubmit={handleLogin} style={{ marginTop: 16 }}>
              <label>Email</label>
              <input name="email" type="email" required />
              <label>Password</label>
              <input name="password" type="password" required />
              <button type="submit">Login</button>
            </form>
          ) : (
            <form onSubmit={handleRegister} style={{ marginTop: 16 }}>
              <label>Name</label>
              <input name="name" type="text" required />
              <label>Email</label>
              <input name="email" type="email" required />
              <label>Password</label>
              <input name="password" type="password" required />
              <button type="submit">Create account</button>
            </form>
          )}

          

        </div>

        <div className="card">
          <h2>About SDG 13</h2>
          <p className="small">
            Track activities, estimate emissions, and commit to eco‑friendly
            pledges. Create an account to get started.
          </p>
        </div>
      </div>
    );
  }

  const userRole = auth?.user?.role || "user";

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Carbon Footprint Tracker</h1>
        <div>
          <span className="small" style={{ marginRight: 8 }}>
            {auth?.user?.name} ({userRole})
          </span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <Reminder />

      <div className="card" style={{ marginBottom: 16 }}>
        <h2>Add activity</h2>
        <ActivityForm onSaved={refresh} />
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h2>Date range</h2>
        <div className="grid">
          <div>
            <label>From</label>
            <input
              type="date"
              value={range.from}
              onChange={(e) =>
                setRange((r) => ({ ...r, from: e.target.value }))
              }
            />
          </div>
          <div>
            <label>To</label>
            <input
              type="date"
              value={range.to}
              onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))}
            />
          </div>
        </div>
      </div>

      <div className="grid" style={{ marginBottom: 16 }}>
        <div className="card">
          <h2>Dashboard</h2>
          <Dashboard footprint={footprint} />
        </div>
        <div className="card">
          <h2>Activities</h2>
          <ActivityList activities={activities} />
        </div>
      </div>

      <div className="grid" style={{ marginBottom: 16 }}>
        <div className="card">
          <h2>Pledges</h2>
          <Pledges />
        </div>
        <div className="card">
          <h2>Leaderboard</h2>
          <Leaderboard />
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h2>Reports</h2>
        <Reports />
      </div>

      {userRole === "admin" && (
        <div className="card" style={{ marginBottom: 16 }}>
          <h2>Admin panel</h2>
          <AdminPanel />
        </div>
      )}
    </div>
  );
}
