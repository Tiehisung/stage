import { ConnectMongoDb } from "@/lib/dbconfig";
import MessageModel from "@/models/messages";
import { NextResponse } from "next/server";
ConnectMongoDb();

export async function GET(request) {
  const type = request.nextUrl.searchParams.get("type"); //sent | incoming | read | starred | ...
  if (type) {
    const messages = await MessageModel.find({ type: type }).sort({
      date: "asc",
    });
    return NextResponse.json(messages);
  }
  const messages = await MessageModel.find();
  return NextResponse.json(messages);
}
