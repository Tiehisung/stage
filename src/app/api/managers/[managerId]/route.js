import { ConnectMongoDb } from "@/lib/dbconfig";
import ManagerModel from "@/models/manager";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();

// GET

export async function GET(request, { params }) {
  const manager = await ManagerModel.findById(params.managerId);
  return NextResponse.json(manager);
}

// PUT
export async function PUT(request, { params }) {
  try {
    const { fullname, phone, email, dob, dateSigned, role, image } =
      await request.json();
    const updated = await ManagerModel.updateOne(
      {
        _id: params.managerId,
      },
      { $set: { fullname, phone, email, dob, dateSigned, role, image } }
    );
    if (updated.acknowledged)
      return NextResponse.json({ message: "Updated", success: true });
  } catch (error) {
    return NextResponse.json({
      message: "Failed, " + error.message,
      success: false,
    });
  }
}
