import { baseUrl } from "@/lib/configs";
import MatchToday from "./MatchToday";
import { GetFixtures } from "../matches/page";
 
export const GetMatchResults = async () => {
  const response = await fetch(baseUrl() + "/api/match-results", {
    cache: "no-store",
  });
  const results = await response.json();
  return results;
};
export default async function AdminResults() {
  const fixtures = await GetFixtures();
  const matchResults = await GetMatchResults();
  return (
    <section className="pb-5">
      <div className="flex gap-2 justify-between ">
        <h1 className="__h2">Results and fixtures log</h1>
      </div>

  

      <h1 className="__h1 bg-[#000000b2] text-white"> Results & Fixtures</h1>
      <br />
      <div className="flex flex-col justify-center items-center gap-6">
        <MatchToday fixtures={fixtures} />
        <table>
          <caption className="font-bold text-3xl">Fixtures</caption>
          <tbody>
            <tr className="border p-2">
              <th>Match</th>
              <th>Date</th>
            </tr>
            {fixtures.map((fixture, fIndex) => (
              <tr key={fIndex} className="border p-2 text-xl">
                <td className="px-2 py-2">
                  {fixture.host + " vs " + fixture.visitors}
                </td>
                <td className="px-2 py-2">{fixture.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* RESULTS */}
        <table>
          <caption className="font-bold text-3xl">Results log</caption>
          <tbody>
            <tr className="border px-2">
              <th className="">Match</th>
              <th className="">Scores</th>
              <th className="">Date</th>
            </tr>
            {matchResults.map((matchResult, index) => (
              <tr key={index} className="border px-2 text-xl">
                <td className="px-2 py-2">
                  {matchResult.host + " vs " + matchResult.visitors}
                </td>
                <td className="px-2 py-2">
                  {matchResult.hostScore + " - " + matchResult.visitorsScore}
                </td>
                <td className="px-2 py-2">{matchResult.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
