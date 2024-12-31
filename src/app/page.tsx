import React from "react";
import LandingPlayers from "./(landing)/Players";
import LandingFixtures from "@/components/fixturesAndResults/LandingFixtures";
import LandingNewsHeadlines from "./news/News";
import PlayerStatistics from "./statistics/Statistics";
import LandingTeamManagement from "./(landing)/Management";

const LandingPage = () => {
  return (
    <main className=" relative md:block text-slate-400 bg-white px-[2vw] space-y-10">
      <hr />

      {/* Some players */}
      <LandingPlayers />

      {/* Fixtures */}
      <LandingFixtures />

      {/* News */}
      <LandingNewsHeadlines />

      {/* Statistics */}
      <PlayerStatistics />

      {/*  management */}
      <LandingTeamManagement />

      {/* Standings */}
    </main>
  );
};

export default LandingPage;
