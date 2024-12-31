import React from "react";
import matches from "@/data/matches";
import {
  CanceledMatchCarch,
  MatchFixtureCard,
  PlayedMatchCarch,
} from "./Cards";
import { IMatchProps } from ".";
import PrimLink from "../Link";

const LandingFixtures = async () => {
  const fixtures = matches.filter((match) => match.status !== "FT");
  const played = matches.filter((m) => m.status == "FT");
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
          {fixtures.map((match, index) => {
            if (match.status == "LIVE" || match.status == "HT")
              return (
                <PlayedMatchCarch
                  key={index}
                  match={match as IMatchProps}
                  league="Circuit Galla"
                  className="grow sm:max-w-lg"
                />
              );
            if (match.status == "CANCELED")
              return (
                <CanceledMatchCarch
                  match={match as IMatchProps}
                  className="grow sm:max-w-lg"
                  key={index}
                  league="Salah Games"
                />
              );
            return (
              <MatchFixtureCard
                match={match as IMatchProps}
                className="grow sm:max-w-lg"
                key={index}
              />
            );
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
          {played.map((match, index) => (
            <PlayedMatchCarch
              key={index}
              match={match as IMatchProps}
              league="Circuit Galla"
              className="grow sm:max-w-lg"
            />
          ))}
          {played.map((match, index) => (
            <PlayedMatchCarch
              key={index}
              match={match as IMatchProps}
              league="Circuit Galla"
              className="grow sm:max-w-lg"
            />
          ))}
          {played.map((match, index) => (
            <PlayedMatchCarch
              key={index}
              match={match as IMatchProps}
              league="Circuit Galla"
              className="grow sm:max-w-lg"
            />
          ))}
          {played.map((match, index) => (
            <PlayedMatchCarch
              key={index}
              match={match as IMatchProps}
              league="Circuit Galla"
              className="grow sm:max-w-lg"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingFixtures;
