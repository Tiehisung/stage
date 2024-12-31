import { ConnectMongoDb } from "@/lib/dbconfig";
import ArchivesModel from "@/models/archive";
import NewsModel from "@/models/news";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function GET(request, { params }) {
  const news = await NewsModel.findById(params.newsId);
  return NextResponse.json(news);
}
export async function DELETE(request, { params }) {
  try {
    const newsId = params.newsId;
    //First retrieve item
    const foundNewsItem = await NewsModel.findById(newsId);
    //Then archive
    const archived = await ArchivesModel.updateOne(
      { category: "deleted_news" },
      { $push: { data: { ...foundNewsItem, isLatest: false } } }
    );
    //Then delete from main collection
    const deleted = await NewsModel.deleteOne({ _id: newsId });
    if (deleted.acknowledged)
      return NextResponse.json({
        message: "News deleted",
        success: true,
      });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to delete! " + error.message,
      success: false,
    });
  }
}
export async function PUT(request, { params }) {
  try {
    const newsId = params.newsId;
    const { fieldName, fieldValue } = await request.json();

    //update field
    const updated = await NewsModel.updateOne(
      { _id: newsId },
      { $set: { [fieldName]: fieldValue } }
    );
    if (updated.acknowledged)
      return NextResponse.json({
        message: "News updated",
        success: true,
      });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to update! " + error.message,
      success: false,
    });
  }
}
