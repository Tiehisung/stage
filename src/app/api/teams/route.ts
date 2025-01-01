import {
  IPostTeam,
  IUpdateTeam,
} from "@/app/admin/features/teams/CreateOrUpdateTeam";
import { ITeamProps } from "@/components/fixturesAndResults";
import { apiConfig } from "@/lib/configs";
import TeamModel from "@/models/teams";
import { IFileProps, IResultProps } from "@/types/interface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const team: IPostTeam = await request.json();

    //Upload image to cloudinary
    const uploaded = await fetch(apiConfig.fileUpload, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(team.logo),
    });

    const uploadedImage = await uploaded.json();
    if (!uploadedImage.success) {
      return NextResponse.json({
        message: "Failed to upload image",
        success: false,
        data: uploadedImage,
      });
    }

    //Save team to database
    const createdTeam = await TeamModel.create({ ...team });
    if (createdTeam) {
      return NextResponse.json({
        message: "Team created successfully",
        success: true,
        data: createdTeam,
      });
    }
    return NextResponse.json({
      message: "Team create failed",
      success: false,
      data: createdTeam,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      message: "Failed to create team",
      success: false,
      data: error,
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const team: IUpdateTeam = await request.json();

    if (team.logo) {
      const uploaded = await fetch(apiConfig.fileUpload, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(team.logo),
      });

      const uploadedImage: IResultProps<IFileProps> = await uploaded.json();

      if (!uploadedImage.success) {
        return NextResponse.json({
          message: "Failed to upload image",
          success: false,
          data: uploadedImage.data,
        });
      }
      const updated = await TeamModel.updateOne(
        { _id: team._id },
        { ...team, logo: uploadedImage.data }
      );
      if (updated.acknowledged) {
        return NextResponse.json({
          message: "Team updated successfully",
          success: true,
        });
      }
    } else {
      const updated = await TeamModel.updateOne({ _id: team._id }, { ...team });
      if (updated.acknowledged) {
        return NextResponse.json({
          message: "Team updated successfully",
          success: true,
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      message: "Failed to update team",
      success: false,
      data: error,
    });
  }
}

export async function GET() {
  try {
    const teams:ITeamProps[] = await TeamModel.find({});
    return NextResponse.json({
      message: "File retrieved successfully",
      success: true,
      data: teams,
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to retrieve teams',
      success: false,
      data: error,
    });
  }
}
