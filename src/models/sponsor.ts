import mongoose, { Schema } from "mongoose";

const sponsorSchema = new Schema(
  {
    ownerName: { type: String, required: true },
    businessName: { type: String, required: true },
    businessDescription: { type: String },
    phone: String,
    logo: { type: Schema.Types.Mixed },
    donations: {
      type: Schema.Types.Array,
      default: () => [
        {
          item: "",
          description: "",
          files: [],
          date: new Date().toISOString().substring(0, 10),
        },
      ],
    },
    badges: { type: Number, default: () => 0 },
  },
  { timestamps: true }
);

const SponsorModel =
  mongoose.models.sponsors || mongoose.model("sponsors", sponsorSchema);

export default SponsorModel;
