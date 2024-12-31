import { NextResponse } from "next/server";

const cloudinary = require("cloudinary").v2;
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * 
 * @param {*} request contains newFolderName in request body
 * @returns EXPECTED RESPONSE
 * '{
  deleted: [ 'faf' ],
  rate_limit_allowed: 500,
  rate_limit_reset_at: 2023-09-22T15:00:00.000Z,
  rate_limit_remaining: 499
}'
 */
export async function DELETE(request) {
  const folderName = await request.json();
  // folderName eg "sms/facilities/library"
  try {
    let response = await cloudinary.api
      .delete_resources_by_prefix(folderName)
      .then((result) => console.log(result));

    console.log("delete rsp", response);
    return NextResponse.json({
      message: response?.error?.message || "Resources found!",
      response: response,
      success: response?.error ? false : true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed: " + error.message,
      success: false,
    });
  }
}

// let response = await cloudinary.api
//   .delete_resources_by_prefix("docs/")
//   .then((result) => console.log(result));
