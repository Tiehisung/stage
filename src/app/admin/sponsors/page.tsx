import Image from "next/image";
import { baseUrl } from "@/lib/configs";
import DisplayAdminSponsors, { AddNewSponsor } from "./Sponsor";
import { staticPeople } from "@/assets/images";
export const GetSponsors = async () => {
  const response = await fetch(baseUrl() + "/api/sponsors", {
    cache: "no-store",
  });
  const sponsors = await response.json();
  return sponsors;
};
export default async function AdminSponsorsPage() {
  const sponsors = await GetSponsors();
  return (
    <section>
      <div className="relative">
        <Image
          src={staticPeople.rufai}
          width={600}
          height={300}
          alt="desc image"
          className="w-full h-32"
        />
      </div>

      <div className="flex items-center justify-between ">
        <h1>Admin sponsors</h1> <AddNewSponsor />
      </div>

      <DisplayAdminSponsors sponsors={sponsors} />
    </section>
  );
}
