import mongoose, { Schema } from "mongoose";

const playerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      message: "First name required",
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      message: "Last name required",
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      message: "Phone number required",
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      message: "Email required",
    },
    height: { type: String },
    captaincy: { type: String },
    jersey: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
    dateSigned: { type: String, required: true },
    avatar: { type: Schema.Types.ObjectId, ref: "files" }, //Ref to file model
    manager: { fullname: String, phone: String, DoB: String, email: String },
    performance: { type: Schema.Types.Array, default: () => [] },
    galleries: [{   }],
    isFit: { type: Boolean, default: () => true },
    card: { type: String, enum: ["yellow", "red"] },
    issues: { type: Schema.Types.Array, default: () => [] },
    medicals: { type: Schema.Types.Array, default: () => [] },
    isActive: { type: Schema.Types.Boolean, default: () => true },
    playRole: { type: String }, //revisit
    position: {
      type: String,

      enum: [
        "goalkeeper",
        "defender",
        "midfielder",
        "forward",
        "striker",
        "wingBack",
        "centerBack",
        "attackingMidfielder",
        "defensiveMidfielder",
        "winger",
        "sweeper",
      ],
    },
    training: { type: Schema.Types.Mixed, default: () => ({ team: "" }) },
  },
  { timestamps: true }
);

const PlayerModel =
  mongoose.models.players || mongoose.model("players", playerSchema);

export default PlayerModel;
