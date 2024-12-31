import { ConnectMongoDb } from "@/lib/dbconfig";
import SponsorModel from "@/models/sponsor";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function GET(request, { params }) {
  const sponsorId = params.sponsor_id;
  console.log("dynamic sponsor", sponsorId);

  const sponsor = await SponsorModel.findById(sponsorId);
  return NextResponse.json(sponsor);
}
