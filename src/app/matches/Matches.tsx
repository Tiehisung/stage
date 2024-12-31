'use client'

import { DropSelectTriangle } from "@/components/Dropdowns";
import { IMatchProps } from "@/components/fixturesAndResults";
import { PlayedMatchCarch } from "@/components/fixturesAndResults/Cards";
import { _pagination, PaginationCP } from "@/components/Pagination";
import matches from "@/data/matches";
import React, { useState } from "react";
import { SearchQueryUpdator } from "./Headers";
import { ISelectOptionLV } from "@/types/interface";

const MatchesSection = () => {
  const played = matches.filter((m) => m.status == "FT");
  const filters = ["home", "away", "lost", "wins", "draws"];
  const [selectedFilter,setSelectedFilter]=useState<ISelectOptionLV>()
  console.log({selectedFilter})

  return (
    <section id="matches">
      <header className="flex justify-between items-center gap-4">
        <h2 className="font-bold my-3">Matches</h2>{" "}
        <PaginationCP pagination={_pagination} />
        <DropSelectTriangle
          data={filters.map((f) => ({ label: f, value: f }))}
          triggerText="Filter"
          className="w-24"
          setExportOption={setSelectedFilter}
        />
      </header>
      <SearchQueryUpdator query="matches" values={filters} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
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
  );
};

export default MatchesSection;
