import { ConnectMongoDb } from "@/lib/dbconfig";
import SponsorModel from "@/models/sponsor";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function PUT(request) {
  const { sponsorId, item, description, files, date } = await request.json();

  const created = await SponsorModel.updateOne(
    { _id: sponsorId },
    {
      $push: { donations: { item, description, files, date } },
      $inc: { badges: 1 }, //Increase donor badges
    }
  );

  if (created.acknowledged)
    return NextResponse.json({ message: "Donated", success: true });
  return NextResponse.json({
    message: "Donation failed",
    success: false,
  });
}
export async function DELETE(request) {
  const { donation, sponsorId } = await request.json();
  const deleted = await SponsorModel.updateOne(
    { _id: sponsorId },
    { $pull: { donations: donation } }
  );
  if (deleted.acknowledged)
    return NextResponse.json({ message: "Deleted", success: true });
  return NextResponse.json({ message: "Delete failed", success: false });
}
