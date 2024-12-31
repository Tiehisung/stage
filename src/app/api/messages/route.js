import { ConnectMongoDb } from "@/lib/dbconfig";
import { NextResponse } from "next/server";
import { Mailer } from "./email/mailer";
import MessageModel from "@/models/messages";
import ArchivesModel from "@/models/archive";

ConnectMongoDb();
export async function POST(request) {
  const { email, subject, text } = await request.json();
  //Save email to db
  const SaveMessage = await MessageModel.create({
    email,
    subject,
    text,
    type: "incoming",
  });
  if (SaveMessage) {
    //Quick receipt notice mail
    await Mailer({ email });

    return NextResponse.json({
      message: "Message sent successfully.",
      success: true,
    });
  }
}
export async function DELETE(request) {
  try {
    const messageId = await request.json();
    //Retrieve message from db
    const foundMsg = await MessageModel.findById(messageId);
    if (foundMsg) {
      //Archive to trashed messages
      await ArchivesModel.updateOne(
        { category: "trashed_messages" },
        { $push: { data: foundMsg } }
      );
      return NextResponse.json({
        message: "Message moved to trash bin.",
        success: true,
      });
    }
    return NextResponse.json({
      message: "Message was not found.",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Trash failed. " + error.message,
      success: false,
    });
  }
}

export async function GET(request) {
  const messages = await MessageModel.find().sort({createdAt:'desc'});
  return NextResponse.json(messages);
}
