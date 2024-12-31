import { ConnectMongoDb } from "@/lib/dbconfig";
import FixtureModel from "@/models/fixtures";
import { NextResponse } from "next/server";
ConnectMongoDb();
export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function POST(request) {
  const formdata = await request.json();
  const saved = await FixtureModel.create({ ...formdata });
  if (saved) return NextResponse.json({ message: "Success", success: true });
  return NextResponse.json({ message: "Not saved", success: false });
}
export async function PUT(request) {
  const { date, host, visitors, _id } = await request.json();
  console.log(" date, host, visitors, _id", date, host, visitors, _id);
  const updated = await FixtureModel.updateOne(
    { _id: _id },
    { date, host, visitors }
  );
  if (updated.acknowledged)
    return NextResponse.json({ message: "Updated", success: true });
  return NextResponse.json({ message: "Update failed", success: false });
}
export async function DELETE(request) {
  const { fixtureId } = await request.json();
  console.log(" fixtureId", fixtureId);
  const deleted = await FixtureModel.deleteOne({ _id: fixtureId });
  console.log("deleted", deleted);
  if (deleted.acknowledged)
    return NextResponse.json({ message: "Deleted", success: true });
  return NextResponse.json({ message: "Delete failed", success: false });
}

export async function GET() {
  const fixtures = await FixtureModel.find();
  return NextResponse.json(fixtures);
}
