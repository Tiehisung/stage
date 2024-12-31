import { NextResponse } from "next/server";

const cloudinary = require("cloudinary").v2;
//config is populated with cloudname,secret and key from CLOUDINARY_URL in .env by default

export async function GET(request) {
  const publicId = request.nextUrl.searchParams.get("publicId");
  const resourceType = request.nextUrl.searchParams.get("resourceType");
  const formatType = resourceType.includes("video")
    ? "video"
    : resourceType.includes("audio")
    ? "video"
    : resourceType.includes("image")
    ? "image"
    : "raw";
  try {
    // Destroy with Upload API
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: formatType || "image",
      invalidate: true,
      type: "authenticated",
    });
    //Expected response {result:'ok'} | {result:'not found'}
    return new Response(
      JSON.stringify({ message: response.result, success: true })
    );
  } catch (error) {
    return NextResponse.json({
      message: "Failed: " + error.message,
      success: false,
    });
  }
}

//Alternate
export async function DELETE(request) {
  const { resources } = await request.json();
  try {
    for (let resource of resources) {
      // Destroy with Upload API
      await cloudinary.uploader.destroy(resource.publicId, {
        resource_type: resource.resourceType || "image",
        invalidate: true,
      });
    }

    return new Response(JSON.stringify({ message: "Deleted", success: true }));
  } catch (error) {
    return NextResponse.json({
      message: "Failed: " + error.message,
      success: false,
    });
  }
}
