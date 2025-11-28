import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, default: Date.now },
    transportKm: { type: Number, default: 0 },
    electricityKwh: { type: Number, default: 0 },
    meals: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
