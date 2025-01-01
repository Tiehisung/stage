import React from "react";
import { NewTeamForm } from "./CreateOrUpdateTeam";
import DisplayTeams from "./DisplayTeams";
import { ITeamProps } from "@/components/fixturesAndResults";

export const metadata = {
  title: "Teams | KFC",
  description: "KFC Teams page to manage teams",
};

export const GetTeams = async (teamId?: string) => {
  return fetch(`/api/teams?teamId=${teamId ? teamId : ""}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
};
const TeamsFeature = async () => {
  const teams: ITeamProps[] = await GetTeams();
  return (
    <div>
      <ul className="space-y-12">
        {/* Create */}
        <NewTeamForm />

        {/* Display */}
        <DisplayTeams teams={teams} />
      </ul>
    </div>
  );
};

export default TeamsFeature;
