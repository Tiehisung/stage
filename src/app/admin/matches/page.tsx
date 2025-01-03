import { apiConfig } from "@/lib/configs";
import { DisplayFixtures } from "./DisplayFixtures";
import CreateMatch from "./CreateFixture";
import { GetTeams } from "../features/teams/page";
import { MatchStatus,   } from "@/components/fixturesAndResults";

export interface IGetMatchesProps {
  status?: MatchStatus;
  isHome?: boolean;
  sort?: "desc" | "asc";
}
export const GetMatches = async ({ status, isHome, sort }: IGetMatchesProps) => {
  const response = await fetch(`${apiConfig.matches}/find`, {
    cache: "no-store",
    body: JSON.stringify({ status, isHome, sort }),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const fixtures = await response.json();
  return fixtures;
};

export default async function AdminFixtures() {
  const fixtures = await GetMatches({});
  const teams = await GetTeams();
  return (
    <section className="pb-6 pt-10 px-3">
      <h1 className="text-3xl md:text-5xl font-bold">Our fixtures</h1>
      <CreateMatch teams={teams} />
      <DisplayFixtures fixtures={fixtures} teams={teams} />
    </section>
  );
}
