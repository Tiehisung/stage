import { ConnectMongoDb } from "@/lib/dbconfig";
import SponsorModel from "@/models/sponsor";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

ConnectMongoDb();
export async function POST(request) {
  const formdata = await request.json();
  const created = await SponsorModel.create({ ...formdata });
  if (created)
    return NextResponse.json({ message: "Sponsor created", success: true });
  return NextResponse.json({
    message: "Create Sponsor failed",
    success: false,
  });
}

export async function PUT(request) {
  const formData = await request.json();
  // console.log("formData", formData);
  const updated = await SponsorModel.updateOne(
    { _id: formData._id },
    {
      $set: {
        ownerName: formData.ownerName,
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        phone: formData.phone,
        logo: formData.logo,
        badges: formData.badges,
        donations: formData.donations,
      },
    }
  );
  if (updated.acknowledged)
    return NextResponse.json({ message: "Updated", success: true });
  return NextResponse.json({ message: "Update failed", success: false });
}
export async function DELETE(request) {
  const { sponsorId } = await request.json();
  const deleted = await SponsorModel.deleteOne({ _id: sponsorId });
  if (deleted.acknowledged)
    return NextResponse.json({ message: "Deleted", success: true });
  return NextResponse.json({ message: "Delete failed", success: false });
}

export async function GET() {
  const sponsors = await SponsorModel.find();
  return NextResponse.json(sponsors);
}
