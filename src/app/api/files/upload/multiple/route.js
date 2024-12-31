import { NextResponse } from "next/server";

const cloudinary = require("cloudinary").v2;

export async function POST(request) {
  const bodyFiles = await request.json();
  console.log("files");
  try {
    let allResults = []; //holds result after every upload
    for (let fileOb of bodyFiles) {
      const { fileName, filePath, fileType, preset, folder, presetType } =
        fileOb;
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
          console.log(err, "error");
          return err;
        });
      if (uploadResult.success) allResults.push(uploadResult);
    }
    console.log("results", allResults.length);

    return NextResponse.json({
      files: allResults,
      success: true,
      message:
        allResults.length + " of " + bodyFiles.length + " files uploaded",
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed: " + error.message, success: false })
    );
  }
}
