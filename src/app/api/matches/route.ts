import { IPostMatch } from "@/app/admin/matches/CreateFixture";
import { ConnectMongoDb } from "@/lib/dbconfig";
import MatchModel from "@/models/match";
import { NextRequest, NextResponse } from "next/server";
ConnectMongoDb();
export const revalidate = 0;
export const dynamic = "force-dynamic";

//Post new fixture
export async function POST(request: NextRequest) {
  const formdata: IPostMatch = await request.json();

  console.log("formdata", formdata);
  const saved = await MatchModel.create({
    ...formdata,
    opponent: formdata.oponentId,
  });
  if (saved) return NextResponse.json({ message: "Success", success: true });
  return NextResponse.json({ message: "Not saved", success: false });
}
export async function PUT(request: NextRequest) {
  const { date, host, visitors, _id } = await request.json();
  console.log(" date, host, visitors, _id", date, host, visitors, _id);
  const updated = await MatchModel.updateOne(
    { _id: _id },
    { date, host, visitors }
  );
  if (updated.acknowledged)
    return NextResponse.json({ message: "Updated", success: true });
  return NextResponse.json({ message: "Update failed", success: false });
}
export async function DELETE(request: NextRequest) {
  const { fixtureId } = await request.json();
  console.log(" fixtureId", fixtureId);
  const deleted = await MatchModel.deleteOne({ _id: fixtureId });
  console.log("deleted", deleted);
  if (deleted.acknowledged)
    return NextResponse.json({ message: "Deleted", success: true });
  return NextResponse.json({ message: "Delete failed", success: false });
}

export async function GET() {
  const fixtures = await MatchModel.find();
  return NextResponse.json(fixtures);
}
