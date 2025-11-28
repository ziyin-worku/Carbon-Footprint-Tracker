export const FACTORS = {
  transportKgPerKm: 0.21,
  electricityKgPerKwh: 0.5,
  mealKgPerMeal: 2.5,
};

export function calculateFootprint(activity) {
  const transport = (activity.transportKm || 0) * FACTORS.transportKgPerKm;
  const electricity =
    (activity.electricityKwh || 0) * FACTORS.electricityKgPerKwh;
  const food = (activity.meals || 0) * FACTORS.mealKgPerMeal;
  const total = transport + electricity + food;
  return { total, breakdown: { transport, electricity, food } };
}
