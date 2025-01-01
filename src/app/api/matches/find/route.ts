import { IGetMatchesProps } from "@/app/admin/matches/page";
import { deleteEmptyKeys } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import MatchModel from "@/models/match";
import { NextRequest, NextResponse } from "next/server";
import "@/models/teams";

ConnectMongoDb();
export const revalidate = 0;
export const dynamic = "force-dynamic";

//Post new fixture
export async function POST(request: NextRequest) {
  const formdata: IGetMatchesProps = await request.json();
  const sort = formdata.sort || "desc";
  console.log("formdata", formdata);

  const filters = {
    status: formdata.status,
    isHome: formdata.isHome,
  };

  deleteEmptyKeys(filters);

  const fixtures = await MatchModel.find(filters)
    .populate({ path: "opponent", populate: { path: "logo" } })
    .sort({
      createdAt: sort,
    });
  return NextResponse.json(fixtures);
}
