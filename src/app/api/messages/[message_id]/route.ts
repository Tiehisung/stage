import { ConnectMongoDb } from "@/lib/dbconfig";
import MessageModel from "@/models/messages";
import { NextRequest, NextResponse } from "next/server";

ConnectMongoDb();

export async function GET(request: NextRequest, { params }: { params: { message_id: string } }) {
  console.log(request)
  const message = await MessageModel.findById(params.message_id);
  return NextResponse.json(message);
}
