import mongoose, { Schema } from "mongoose";

/**
 * Gallery Schema
 *
 * @typedef {Object} Gallery
 * @property {string} title - The title of the gallery.
 * @property {string} description - The description of the gallery, trimmed of whitespace.
 * @property {Array<ObjectId>} files - An array of ObjectIds referencing the files associated with the gallery.
 * @property {ObjectId} player - An ObjectId referencing the player associated with the gallery.
 * @property {ObjectId} manager - An ObjectId referencing the manager associated with the gallery.
 *
 * @property {Date} createdAt - The date when the gallery was created.
 * @property {Date} updatedAt - The date when the gallery was last updated.
 */

const gallerySchema = new Schema(
  {
    title: String,
    description: { type: String, trim: true },
    files: [{ type: Schema.Types.ObjectId, ref: "files" }], //Ref to file model
    //Probable associated owners
    player: { type: Schema.Types.ObjectId, ref: "player" },
    manager: { type: Schema.Types.ObjectId, ref: "managers" },
  },
  { timestamps: true }
);

const GalleryModel =
  mongoose.models.galleries || mongoose.model("galleries", gallerySchema);
export default GalleryModel;
