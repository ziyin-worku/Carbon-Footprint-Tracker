
import { useEffect, useState } from 'react';
import api from '../api';

export default function Dashboard() {
  const [pledges, setPledges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const p = await api.get('/api/pledges');
        setPledges(p.data);
        const lb = await api.get('/api/leaderboard');
        setLeaderboard(lb.data);
      } catch (e) {
        console.error(e);
        setError(e?.response?.data?.message || 'Failed to load data');
      }
    }
    load();
  }, []);

  return (
    <div>
      <h2>Pledges</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {pledges.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>

      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((r, idx) => (
          <li key={idx}>{r.user}: {r.score}</li>
        ))}
      </ul>
    </div>
  );
}
