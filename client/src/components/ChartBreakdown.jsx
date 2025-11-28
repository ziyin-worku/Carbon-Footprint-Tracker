import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartBreakdown({ totals }) {
  const data = {
    labels: ["Transport", "Electricity", "Food"],
    datasets: [
      {
        data: [totals.transport, totals.electricity, totals.food],
        backgroundColor: ["#60a5fa", "#f59e0b", "#22c55e"],
      },
    ],
  };

  const options = { plugins: { legend: { position: "bottom" } } };

  return <Pie data={data} options={options} />;
}
