import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { NextResponse } from "next/server";

export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();

export async function POST(request, { params }) {
  try {
    const { files, description } = await request.json();
    const playerUpdated = await PlayerModel.updateOne(
      { _id: params.playerId },
      {
        $push: {
          galleries: {
            files: files,
            description: description,
            date: new Date(),
            timestamp: Date.now(),
          },
        },
      }
    );
    if (playerUpdated.acknowledged)
      return NextResponse.json({ message: "Updated", success: true });
  } catch (error) {
    return NextResponse.json({
      message: "Update failed. " + error.message,
      success: false,
    });
  }
}
