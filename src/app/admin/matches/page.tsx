import { baseUrl } from "@/lib/configs";
import AddNewFixture, { DisplayFixtures } from "./Fixture";
import CreateMatch from "./CreateMatch";
export const GetFixtures = async () => {
  const response = await fetch(baseUrl() + "/api/fixtures", {
    cache: "no-store",
  });
  const fixtures = await response.json();
  return fixtures;
};
export default async function AdminFixtures() {
  const fixtures = await GetFixtures();
  return (
    <section className="pb-6 pt-10 px-3">
      <h1 className="text-3xl md:text-5xl font-bold">Our fixtures</h1>

      <ul>
        <li>
          <CreateMatch />
        </li>
      </ul>
      
      <AddNewFixture />
      <DisplayFixtures fixtures={fixtures} />
    </section>
  );
}
