import { ConnectMongoDb } from "@/lib/dbconfig";
import MessageModel from "@/models/messages";
import { NextResponse } from "next/server";

ConnectMongoDb();
export async function GET() {
  const messages = await MessageModel.find({ read: false }).sort({
    date: "asc",
  });
  return NextResponse.json(messages);
}

export async function PUT(request) {
  const messageId = await request.json();
  try {
    const mark = await MessageModel.updateOne(
      { _id: messageId },
      { $set: { read: true } }
    );
    if (mark.acknowledged) {
      return NextResponse.json({ message: "Message read", success: true });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
