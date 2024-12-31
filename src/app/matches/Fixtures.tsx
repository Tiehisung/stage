import { IMatchProps } from "@/components/fixturesAndResults";
import {
  PlayedMatchCarch,
  CanceledMatchCarch,
  MatchFixtureCard,
} from "@/components/fixturesAndResults/Cards";
import matches from "@/data/matches";
import React from "react";
import { SearchQueryUpdator } from "./Headers";
import { _pagination, PaginationCP } from "@/components/Pagination";

const FixturesSection = () => {
  const fixtures = matches.filter((match) => match.status !== "FT");
  const filters=['all','home','away','canceled',]
  return (
    <section id="fixtures">
      <header className="flex justify-between items-center gap-4">
        <h2 className="font-bold my-3">Fixtures</h2>{" "}
        <PaginationCP pagination={_pagination} />
      </header>
      <SearchQueryUpdator query="fixture" values={filters} />
      <div className="flex flex-wrap lg:grid-cols-2 xl:grid-cols-3 gap-[3vw] mt-2 ">
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
  );
};

export default FixturesSection;


