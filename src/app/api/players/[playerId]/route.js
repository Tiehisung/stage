import { ConnectMongoDb } from "@/lib/dbconfig";
import ArchivesModel from "@/models/archive";
import PlayerModel from "@/models/player";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function GET(request, { params }) {
  const player = await PlayerModel.findById(params.playerId);
  return NextResponse.json(player);
}

//patch
export async function PATCH(request, { params }) {
  const { fieldKey, fieldValue } = await request.json();

  try {
    const saved = await PlayerModel.updateOne(
      { _id: params.playerId },
      { $set: { [fieldKey]: fieldValue } }
    );
    if (saved) return NextResponse.json({ message: "Updated", success: true });
  } catch (error) {
    return NextResponse.json({
      message: "Update failed. " + error.message,
      success: false,
    });
  }
}

//put
export async function PUT(request) {
  const formData = await request.json();

  try {
    const saved = await PlayerModel.updateOne(
      { _id: formData._id },
      {
        $set: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          height: formData.height,
          email: formData.email,
          firstName: formData.firstName,
          dateSigned: formData.dateSigned,
          dob: formData.dob,
          image: formData.image,
          manager: formData.manager,
          performance: formData.performance,
          gallery: formData.gallery,
          fitness: formData.fitness,
        },
      }
    );
    if (saved)
      return NextResponse.json({ message: "Update success", success: true });
  } catch (error) {
    return NextResponse.json({
      message: "Update failed. " + error.message,
      success: false,
    });
  }
}

//delete
export async function DELETE(request, { params }) {
  const { reason, detail } = await request.json();
  try {
    //Update issues
    const updatedWithIssue = await PlayerModel.findOneAndUpdate(
      { _id: params.playerId },
      { $push: { issues: { reason, date: new Date(), detail } } },
      { returnDocument: "after" }
    );
    // const player = await PlayerModel.findById(params.playerId);

    await ArchivesModel.updateOne(
      { category: "deleted_players" },
      { $push: { data: updatedWithIssue } }
    );

    //Now remove player
    const deleted = await PlayerModel.deleteOne({ _id: params.playerId });
    if (deleted.acknowledged)
      return NextResponse.json({
        message: "Deleted successful",
        success: true,
      });
  } catch (error) {
    return NextResponse.json({
      message: "Delete failed. " + error.message,
      success: false,
    });
  }
}
