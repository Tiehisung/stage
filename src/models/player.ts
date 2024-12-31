import mongoose, { Schema } from "mongoose";

const playerSchema = new Schema(
  {
    firstName: { type: String, required: true, message: "First name required" },
    lastName: { type: String, required: true, message: "Last name required" },
    phone: { type: String, required: true, message: "Phone number required" },
    email: { type: String, required: true, message: "Email required" },
    height: { type: String },
    jersey: { type: String, required: true },
    dob: { type: String, required: true },
    dateSigned: { type: String, required: true },
    image: { type: Schema.Types.Mixed, required: true },
    manager: { fullname: String, phone: String, dob: String, email: String },
    performance: { type: Schema.Types.Array, default: () => [] },
    galleries: { type: Schema.Types.Array, default: () => [] },
    isFit: { type: Boolean, default: () => true },
    card: { type: String, default: () => "" },
    issues: { type: Schema.Types.Array, default: () => [] },
    medicals: { type: Schema.Types.Array, default: () => [] },
    isActive: { type: Schema.Types.Boolean, default: () => true },
    playRole: { type: String, default: () => "" }, //GK RW F
    captaincy: { type: String, default: () => "" }, //1 main | 2 first assist | 3 second assist | ""
    training: { type: Schema.Types.Mixed, default: () => ({ team: "" }) },
  },
  { timestamps: true }
);

const PlayerModel =
  mongoose.models.players || mongoose.model("players", playerSchema);

export default PlayerModel;
