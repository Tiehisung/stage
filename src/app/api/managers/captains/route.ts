import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function GET() {
  const players = await PlayerModel.find();
  const captains = players
    .filter((player) => player.captaincy)
    .sort((a, b) => a.captaincy - b.captaincy);
  return NextResponse.json(captains);
}

export async function PUT(request:NextRequest) {
  try {
    const { captaincy, playerId } = await request.json();

    await PlayerModel.updateOne(
      { captaincy: captaincy },
      {
        $set: {
          captaincy: "",
        },
      }
    );

    const engageNewPlayer = await PlayerModel.updateOne(
      { _id: playerId },
      { $set: { captaincy: captaincy } }
    );

    if (engageNewPlayer.acknowledged)
      return NextResponse.json({ message: "Updated", success: true });
  } catch (error) {
    return NextResponse.json({
      message:  getErrorMessage(error),
      success: false,
    });
  }
}
