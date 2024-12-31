import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function POST(request) {
  const formData = await request.json();
  // console.log("formData", formData);
  const saved = await PlayerModel.create({ ...formData });
  if (saved) return NextResponse.json({ message: "Success", success: true });
  return NextResponse.json({ message: "Success", success: true });
}

