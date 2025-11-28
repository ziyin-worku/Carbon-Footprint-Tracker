import ChartBreakdown from "./ChartBreakdown.jsx";
import ChartTrend from "./ChartTrend.jsx";

export default function Dashboard({ footprint }) {
  if (!footprint) return <p className="small">Loading...</p>;

  const { totals, points, factors, badges, streak } = footprint;

  return (
    <div>
      <p className="small">
        Emission factors: Transport {factors.transportKgPerKm} kg/km,
        Electricity {factors.electricityKgPerKwh} kg/kWh, Food{" "}
        {factors.mealKgPerMeal} kg/meal.
      </p>

      <div className="grid">
        <div className="card">
          <h3>Total (kg CO₂e)</h3>
          <p style={{ fontSize: "1.8rem", margin: 0 }}>
            {totals.total.toFixed(2)}
          </p>
          <p className="small">Sum over selected period</p>
        </div>

        <div className="card">
          <h3>Breakdown</h3>
          <ChartBreakdown totals={totals} />
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Trend</h3>
        <ChartTrend points={points} />
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Badges & Streak</h3>
        <ul>
          <li>
            {badges.lowTransport
              ? "🏅 Low Transport"
              : "— Low Transport (keep going!)"}
          </li>
          <li>
            {badges.energySaver
              ? "🏅 Energy Saver"
              : "— Energy Saver (reduce kWh)"}
          </li>
          <li>
            {badges.greenFood
              ? "🏅 Green Food"
              : "— Green Food (opt for lower‑impact meals)"}
          </li>
        </ul>
        <p className="small">Current streak: {streak} day(s)</p>
      </div>
    </div>
  );
}
