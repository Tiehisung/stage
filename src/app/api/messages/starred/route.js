import { ConnectMongoDb } from "@/lib/dbconfig";
import MessageModel from "@/models/messages";
import { NextResponse } from "next/server";

ConnectMongoDb();
export async function GET() {
  const messages = await MessageModel.find({ starred: true }).sort({
    date: "asc",
  });
  return NextResponse.json(messages);
}

//Star/Unstar a message
export async function PUT(request) {
  const { messageId, starred } = await request.json();
  try {
    const starring = await MessageModel.updateOne(
      { _id: messageId },
      { $set: { starred: !starred } }//toggle starring
    );
    if (starring.acknowledged) {
      return NextResponse.json({ message: "Message starred", success: true });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
