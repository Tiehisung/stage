import mongoose, { Schema } from "mongoose";

const fixtureSchema = new Schema(
  {
    host: { type: String, required: true },
    visitors: { type: String, required: true },
    date: String,
  },
  { timestamps: true }
);

const FixtureModel =
  mongoose.models.fixtures || mongoose.model("fixtures", fixtureSchema);

export default FixtureModel;
