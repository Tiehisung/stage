import { NextResponse } from "next/server";

const cloudinary = require("cloudinary").v2;
//config is populated with cloudname,secret and key from CLOUDINARY_URL in .env by default

/**Delete multiple with Admin API
 * @param {*} request contains request body publicIds[]
 * @returns response object {message: string, success: boolean}
 */
export async function DELETE(request) {
  const publicIds = await request.json();
  try {
    const response = await cloudinary.api.delete_resources(
      publicIds,
      (err, result) => {
        if (err) {
          console.log("err", err);
          return err;
        }
        console.log("result", result);
        return result;
      }
    );

    if (!response)
      return NextResponse.json({
        message: "Failed: " + response,
        success: false,
      });

    return new Response(JSON.stringify({ message: "Deleted", success: true }));
  } catch (error) {
    return NextResponse.json({
      message: "Failed: " + error.message,
      success: false,
    });
  }
}
