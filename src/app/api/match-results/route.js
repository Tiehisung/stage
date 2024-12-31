import { baseUrl } from "@/lib/configs";
import { ConnectMongoDb } from "@/lib/dbconfig";
import FixtureModel from "@/models/fixtures";
import MatchResultsModel from "@/models/match-results";
import { NextResponse } from "next/server";
ConnectMongoDb();
export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function POST(request) {
  const formdata = await request.json();
  const saved = await MatchResultsModel.create({ ...formdata });
  if (!saved)
    return NextResponse.json({
      message: "Failed to save match",
      success: false,
    });
  //Delete fixture
  await FixtureModel.deleteOne({ _id: formdata.fixtureId });
  return NextResponse.json({ message: "Success", success: true });
}
export async function PUT(request) {
  const { scoreline, _id } = await request.json();
  console.log("  scoreline, _id", scoreline, _id);
  const updated = await MatchResultsModel.updateOne(
    { _id: _id },
    { scoreline }
  );
  if (updated.acknowledged)
    return NextResponse.json({ message: "Updated", success: true });
  return NextResponse.json({ message: "Update failed", success: false });
}
export async function DELETE(request) {
  const { resultsId } = await request.json();
  console.log(" resultsId", resultsId);
  const deleted = await MatchResultsModel.deleteOne({ _id: resultsId });
  if (deleted.acknowledged)
    return NextResponse.json({ message: "Deleted", success: true });
  return NextResponse.json({ message: "Delete failed", success: false });
}

export async function GET() {
  const results = await MatchResultsModel.find();
  return NextResponse.json(results);
}
