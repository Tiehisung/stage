import { ConnectMongoDb } from "@/lib/dbconfig";
import ManagerModel from "@/models/manager";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function GET() {
  const managers = await ManagerModel.find();
  return NextResponse.json(managers);
}

export async function POST(request:NextRequest) {
  try {
    const { fullname, phone, email, dob, dateSigned, role, image } =
      await request.json();
    
    const saved = await ManagerModel.create({
      fullname,
      phone,
      email,
      dob,
      dateSigned,
      role,
      image,
    });
    if (saved) return NextResponse.json({ message: "Created", success: true });
  } catch (error) {
    return NextResponse.json({
      message: "Failed, " + error.message,
      success: false,
    });
  }
}
