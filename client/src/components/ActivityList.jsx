export default function ActivityList({ activities }) {
  if (!activities?.length) {
    return <p className="small">No activities yet.</p>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: 8 }}>Date</th>
            <th style={{ textAlign: "right", padding: 8 }}>Transport (km)</th>
            <th style={{ textAlign: "right", padding: 8 }}>
              Electricity (kWh)
            </th>
            <th style={{ textAlign: "right", padding: 8 }}>Meals</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a) => (
            <tr key={a._id}>
              <td style={{ padding: 8 }}>
                {new Date(a.date).toLocaleDateString()}
              </td>
              <td style={{ padding: 8, textAlign: "right" }}>
                {a.transportKm ?? 0}
              </td>
              <td style={{ padding: 8, textAlign: "right" }}>
                {a.electricityKwh ?? 0}
              </td>
              <td style={{ padding: 8, textAlign: "right" }}>{a.meals ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
