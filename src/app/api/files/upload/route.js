import { NextResponse } from "next/server";

const cloudinary = require("cloudinary").v2;

export async function POST(request) {
  const { fileName, filePath, fileType, preset, folder, presetType } =
    await request.json();
  try {
    const uploadResult = await cloudinary.uploader
      .upload(filePath, {
        resource_type: fileType.includes("video")
          ? "video"
          : fileType.includes("audio")
          ? "video"
          : fileType.includes("image")
          ? "image"
          : "auto",
        public_id:
          fileName.split(".")[0] +
          new Date().getMilliseconds() +
          new Date().getSeconds(),
        unique_filename: true,
        upload_preset: preset,
        folder: folder,
        use_asset_folder_as_public_id_prefix: true,
        type: presetType || "authenticated",
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        // console.log(err, "error");
        return err;
      });

    if (uploadResult.error) {
      return NextResponse.json({ message: error.message, success: false });
    }
    return NextResponse.json({
      data: { ...uploadResult, name: fileName },
      success: true,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message, success: false })
    );
  }
}
