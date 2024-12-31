import { ConnectMongoDb } from "@/lib/dbconfig";
import { NextResponse } from "next/server";
import { Mailer } from "./mailer";
import MessageModel from "@/models/messages";

ConnectMongoDb();
export async function POST(request) {
  const { email, subject, text, html, type } = await request.json();
  try {
    //dispatch email to client/user
    await Mailer({ email, subject, text, html, type });
    //Save email to db as sent
    await MessageModel.create({
      email,
      subject,
      text,
      html,
      type: "sent",
    });
    return NextResponse.json({
      message: "Mail sent successfully.",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Mail failed!." + error.message,
      success: false,
    });
  }
}

 