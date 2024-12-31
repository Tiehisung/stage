import mongoose, { Schema } from "mongoose";

const matchResultsSchema = new Schema(
  {
    host: { type: String, required: true },
    visitors: { type: String, required: true },
    date: String,
    hostScore: {
      type: String,
      required: true,
      default: () => 0,
    },
    visitorsScore: {
      type: String,
      required: true,
      default: () => 0,
    },
    comments: {},
  },
  { timestamps: true }
);

const MatchResultsModel =
  mongoose.models.matchresults ||
  mongoose.model("matchresults", matchResultsSchema);

export default MatchResultsModel;
