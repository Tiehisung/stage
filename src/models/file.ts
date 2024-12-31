 
import mongoose  from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    secure_url: { type: String },
    resource_type: { type: String,  },
    bytes: { type: Number },
    public_id: { type: String },
    type: { type: String },
  },
  { timestamps: true } 
);

const FileModel = mongoose.models.File || mongoose.model("File", fileSchema);

export default FileModel;

 