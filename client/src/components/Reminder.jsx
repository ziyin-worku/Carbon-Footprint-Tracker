import { useEffect, useState } from "react";

export default function Reminder() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem("lastReminder");
    const now = Date.now();
    if (!last || now - Number(last) > 24 * 60 * 60 * 1000) {
      setShow(true);
      localStorage.setItem("lastReminder", String(now));
    }
  }, []);

  if (!show) return null;

  return (
    <div className="card" style={{ borderColor: "#22c55e", marginBottom: 16 }}>
      <strong>Friendly reminder:</strong> Log your activities today to keep your
      streak going.
      <div>
        <button onClick={() => setShow(false)} style={{ marginTop: 8 }}>
          Dismiss
        </button>
      </div>
    </div>
  );
}
