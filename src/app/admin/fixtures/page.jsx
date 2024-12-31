import Image from "next/image";
import playerImage from "@/public/images/breakfast2.jpg";
import { baseUrl } from "@/lib/configs";
import AddNewFixture, { DisplayFixtures } from "./Fixture";
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
    <section className="pb-6">
      <div className="flex items-center gap-4">
        <Image src={playerImage} width={300} height={300} alt="desc image" />
        <h1 className="text-3xl md:text-5xl font-bold">Our fixtures</h1>
      </div>

      <AddNewFixture />
      <DisplayFixtures fixtures={fixtures} />
    </section>
  );
}
