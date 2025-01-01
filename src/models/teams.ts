import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    alias: String,
    community: { type: String },
    logo: {},
    isHome: Boolean,
  },
  { timestamps: true }
);

const TeamModel =
  mongoose.models.teams || mongoose.model("teams", teamSchema);

export default TeamModel;

 
