import { ConnectMongoDb } from "@/lib/dbconfig";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

ConnectMongoDb();
export async function GET(request) {
  const password = await bcrypt.hash("soskode", 10);
// const updated =await  User.updateMany({},{$set:{role:'admin'}})
  return NextResponse.json();
}
