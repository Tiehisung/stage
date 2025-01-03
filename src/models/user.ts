import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MDB_URI!);
mongoose.Promise = global.Promise;
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "guest",
      enum: ["guest", "admin", "player", "privileged"],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.users || mongoose.model("users", userSchema);

export default UserModel;


