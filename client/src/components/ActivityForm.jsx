import { useState } from "react";
import { createActivity } from "../api.js";

export default function ActivityForm({ onSaved }) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [transportKm, setTransportKm] = useState("");
  const [electricityKwh, setElectricityKwh] = useState("");
  const [meals, setMeals] = useState("");

  async function submit(e) {
    e.preventDefault();
    const payload = {
      date: new Date(date),
      transportKm: Number(transportKm) || 0,
      electricityKwh: Number(electricityKwh) || 0,
      meals: Number(meals) || 0,
    };
    await createActivity(payload);
    setTransportKm("");
    setElectricityKwh("");
    setMeals("");
    onSaved?.();
  }

  return (
    <form onSubmit={submit}>
      <label>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label>Transport (km)</label>
      <input
        type="number"
        min="0"
        step="0.1"
        placeholder="e.g., 12.5"
        value={transportKm}
        onChange={(e) => setTransportKm(e.target.value)}
      />

      <label>Electricity (kWh)</label>
      <input
        type="number"
        min="0"
        step="0.1"
        placeholder="e.g., 3.2"
        value={electricityKwh}
        onChange={(e) => setElectricityKwh(e.target.value)}
      />

      <label>Meals (count)</label>
      <input
        type="number"
        min="0"
        step="1"
        placeholder="e.g., 3"
        value={meals}
        onChange={(e) => setMeals(e.target.value)}
      />

      <button type="submit">Save activity</button>
    </form>
  );
}
