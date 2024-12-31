import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import SpecialdataModel from "@/models/specialdata";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function GET() {
  const players = await PlayerModel.find();
  const main = players.find((player) => player.captaincy == "captain");
  const deputy1 = players.find((player) => player.captaincy == "deputy1");
  const deputy2 = players.find((player) => player.captaincy == "deputy2");
  const captains = players
    .filter((player) => player.captaincy)
    .sort((a, b) => a.captaincy - b.captaincy);
  return NextResponse.json(captains);
}

export async function PUT(request) {
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
      message: "Failed, " + error.message,
      success: false,
    });
  }
}
