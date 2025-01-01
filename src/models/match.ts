import mongoose, { Schema } from "mongoose";

const matchSchema = new Schema(
  {
    opponent: { type: Schema.Types.ObjectId, ref: "teams", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    title: { type: String },
    status: {
      type: String,
      enum: ["FT", "HT", "LIVE", "SCHEDULED", "POSTPONED", "CANCELED"],
      default: () => "SCHEDULED",
    },
    sponsor: { type: Schema.Types.ObjectId, ref: "sponsors" },
    scores: {
      kfc: [{ type: Schema.Types.ObjectId, ref: "goals" }],
      oponent: [{ type: Schema.Types.ObjectId, ref: "goals" }],
    },
    broadcaster: {},
    venue: { name: String, files: [{}] },
    isHome: Boolean,
  },
  { timestamps: true }
);

const MatchModel =
  mongoose.models.matches || mongoose.model("matches", matchSchema);

export default MatchModel;
