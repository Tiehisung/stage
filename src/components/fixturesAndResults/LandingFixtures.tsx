import React from "react";
import {
  CanceledMatchCarch,
  MatchFixtureCard,
  PlayedMatchCarch,
} from "./Cards";
import { IMatchProps } from ".";
import PrimLink from "../Link";
import { GetMatches } from "@/app/admin/matches/page";

const LandingFixtures = async () => {
  const matches: IMatchProps[] = await GetMatches({});
  const fixtures = matches.filter((match) => match.status !== "FT");
  const played = matches.filter((match) => match.status == "FT"); //Full Time
  console.log({ fixtures });
  return (
    <div className="px-3 space-y-10 ">
      <section>
        <header className="flex justify-between gap-4">
          <h2 className="font-bold my-3">Fixtures</h2>{" "}
          <PrimLink
            href={"/matches#fixtures"}
            text="More"
            className="_link flex items-center"
          />
        </header>
        <div className="flex flex-wrap lg:grid-cols-2 xl:grid-cols-3 gap-[3vw] ">
          {fixtures?.map((match, index) => {
            switch (match.status) {
              case "LIVE":
              case "HT":
                return (
                  <PlayedMatchCarch
                    key={index}
                    match={match as IMatchProps}
                    league="Circuit Galla"
                    className="grow sm:max-w-lg"
                  />
                );
              case "CANCELED":
                return (
                  <CanceledMatchCarch
                    match={match as IMatchProps}
                    className="grow sm:max-w-lg"
                    key={index}
                    league="Salah Games"
                  />
                );
              default:
                return (
                  <MatchFixtureCard
                    match={match as IMatchProps}
                    className="grow sm:max-w-lg"
                    key={index}
                  />
                );
            }
          })}
        </div>
      </section>
      <section>
        <header className="flex justify-between gap-4">
          <h2 className="font-bold my-3">Matches</h2>{" "}
          <PrimLink
            href={"/matches#matches"}
            text="More"
            className="_link flex items-center"
          />
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {played.map((match, index) => (
            <PlayedMatchCarch
              key={index}
              match={match as IMatchProps}
              league="Circuit Galla"
              className="max-sm:grow "
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingFixtures;
