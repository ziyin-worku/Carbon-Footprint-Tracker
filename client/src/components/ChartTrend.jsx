import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export default function ChartTrend({ points }) {
  const labels = points.map((p) => new Date(p.date).toLocaleDateString());
  const data = {
    labels,
    datasets: [
      {
        label: "Total kg CO₂e",
        data: points.map((p) => p.total),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.25)",
      },
    ],
  };

  const options = {
    plugins: { legend: { position: "bottom" } },
    scales: { y: { beginAtZero: true } },
  };

  return <Line data={data} options={options} />;
}
