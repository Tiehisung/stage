import React from "react";
import FixturesSection from "./Fixtures";
import MatchesSection from "./Matches";
import { IMatchProps } from "@/components/fixturesAndResults";
import { GetMatches } from "../admin/matches/page";

const MatchesPage = async () => {
  const allMatches: IMatchProps[] = await GetMatches({}); // Get all matches

  const playedMatches = allMatches.filter((match) => match.status == "FT");
  const fixtures = allMatches.filter((match) => match.status !== "FT");
  return (
    <div className="px-[2vw] space-y-8">
      <FixturesSection fixtures={fixtures} />
      <MatchesSection matches={playedMatches} />
    </div>
  );
};

export default MatchesPage;
