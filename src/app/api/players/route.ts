import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";
import "@/models/file";
import "@/models/galleries";

ConnectMongoDb();
export async function GET() {
  const players = await PlayerModel.find()
    .populate({ path: "avatar" })

  return NextResponse.json(players);
}
