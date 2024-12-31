import mongoose, { Schema } from "mongoose";
const newsSchema = new Schema(
  {
    headline: { type: String, required: true, message: "Headline required" },
    source: {
      type: Schema.Types.Mixed,
      required: true,
      message: "Source required",
    },
    paragraphs: {
      type: Schema.Types.Array,
      required: true,
      message: "Paragraphs required",
    },
    featureFiles: {
      type: Schema.Types.Array,
    },
    stats: {
      type: Schema.Types.Mixed,
      default: () => ({ isTrending: true, isLatest: true }), //many more...
    },
  },
  { timestamps: true }
);

const NewsModel = mongoose.models.news || mongoose.model("news", newsSchema);
export default NewsModel;
