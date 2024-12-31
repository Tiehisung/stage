import MessageModel from "@/models/messages";
import { NextResponse } from "next/server";

const { ConnectMongoDb } = require("@/lib/dbconfig");

ConnectMongoDb();

export async function GET(request, { params }) {
  const message = await MessageModel.findById(params.message_id);
  return NextResponse.json(message);
}
