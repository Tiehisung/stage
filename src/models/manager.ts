import mongoose, { Schema } from "mongoose";

const managerSchema = new Schema(
  {
    fullname: { type: String, required: true },
    phone: { type: String, required: true, message: "Phone number required" },
    email: { type: String, required: true, message: "Email required" },
    dob: { type: String, required: true },
    dateSigned: { type: String, required: true },
    image: { type: Schema.Types.Mixed, required: true },
    galleries: { type: Schema.Types.Array, default: () => [] },
    card: { type: String, default: () => "" },
    medicals: { type: Schema.Types.Array, default: () => [] },
    role: { type: String, required: true, default: () => "Technical manager" }, //GK RW F
    metadata: {},
  },
  { timestamps: true }
);

const ManagerModel =
  mongoose.models.managers || mongoose.model("managers", managerSchema);

export default ManagerModel;
