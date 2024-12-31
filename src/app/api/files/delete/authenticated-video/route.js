import { NextResponse } from "next/server";

const cloudinary = require("cloudinary").v2;
//config is populated with cloudname,secret and key from CLOUDINARY_URL in .env by default

export async function GET(request) {
  const publicId = request.nextUrl.searchParams.get("publicId");
  try {
    // Destroy with Upload API
    const response = await cloudinary.uploader
      .destroy(publicId, {
        resource_type: "video",
        invalidate: true,
        type: "authenticated",
      })
      .then((result) => {
        console.log(result);
        return result;
      });

    return new Response(JSON.stringify({ message: "Deleted", success: true }));
  } catch (error) {
    return NextResponse.json({
      message: "Failed: " + error.message,
      success: false,
    });
  }
}
