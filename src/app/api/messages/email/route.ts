import { ConnectMongoDb } from "@/lib/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { Mailer } from "./mailer";
import MessageModel from "@/models/messages";
import { getErrorMessage } from "@/lib";

ConnectMongoDb();
export async function POST(request: NextRequest) {
  const { email, subject, text, html, type } = await request.json();
  try {
    //dispatch email to client/user
    await Mailer({ email, subject, text, html });
    //Save email to db as sent
    await MessageModel.create({
      email,
      subject,
      text,
      html,
      type: type ?? "sent",
    });
    return NextResponse.json({
      message: "Mail sent successfully.",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
      success: false,
    });
  }
}
