import { ConnectMongoDb } from "@/lib/dbconfig";
import NewsModel from "@/models/news";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function GET() {
  const news = await NewsModel.find().sort({ createdAt: "desc" });
  return NextResponse.json(news);
}
export async function POST(request) {
  try {
    const { paragraphs, headline, source, featureFiles } = await request.json();
    const response = await NewsModel.create({
      paragraphs,
      headline,
      source,
      featureFiles,
      stats: { isLatest: true, isArchived: false, isTrending: false },
    });
    if (response)
      return NextResponse.json({
        message: "News published",
        success: true,
      });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to publish! " + error.message,
      success: false,
    });
  }
}
