import { ConnectMongoDb } from "@/lib/dbconfig";
import { NextResponse } from "next/server";
import MessageModel from "@/models/messages";
import ArchivesModel from "@/models/archive";

ConnectMongoDb();
export async function POST(request) {
  try {
    const messageId = await request.json();
    //Fetch message
    const foundMsg = await MessageModel.findById(messageId);

    if (foundMsg) {
      //Now archive
      await ArchivesModel.updateOne(
        { category: "archived_messages" },
        { $push: { data: foundMsg } }
      );

      //Now delete
      await MessageModel.findByIdAndDelete(messageId, {
        returnDocument: "after",
      });
      return NextResponse.json({
        message: "Message archived.",
        success: true,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Message not archived. " + error.message,
      success: false,
    });
  }
}
