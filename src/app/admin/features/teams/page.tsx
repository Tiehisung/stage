import React from "react";
import { NewTeamForm } from "./CreateOrUpdateTeam";
import DisplayTeams from "./DisplayTeams";
import { ITeamProps } from "@/components/fixturesAndResults";
import { apiConfig } from "@/lib/configs";

export const metadata = {
  title: "Teams | KFC",
  description: "KFC Teams page to manage teams",
};

export const GetTeams = async (teamId?: string) => {
  try {
    const response = await fetch(apiConfig.teams + `?teamId=${teamId || ""}`, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data; // Return parsed data if successful
  } catch (error) {
    console.error("Error fetching teams:", error);
    // Return a consistent error object
    return [];
  }
};

const TeamsFeature = async () => {
  const teams: ITeamProps[] = await GetTeams();
  return (
    <div className="space-y-12 p-4 md:px-10">
        {/* Create */}
        <NewTeamForm />

        {/* Display */}
        <DisplayTeams teams={teams} />
    </div>
  );
};

export default TeamsFeature;
