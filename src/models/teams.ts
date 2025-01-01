import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    alias: String,
    community: { type: String },
    logo: {},
    isHome: Boolean,
    currentPlayers: [{ type: Schema.Types.ObjectId, ref: "players" }],
  },
  { timestamps: true }
);

const TeamModel =
  mongoose.models.teams || mongoose.model("teams", teamSchema);

export default TeamModel;

 
