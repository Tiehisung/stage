import { GetSponsors } from "../admin/sponsors/page";
import TopSponsors, { AllSponsors } from "./Sponsors";

export default async function SponsorsPage({}) {
  const sponsors = await GetSponsors();
  return (
    <main className="bg-sponsorsLite">
      <br />
      <h1 className="text-3xl font-extrabold my-9 px-2">We pride ourselves with cherished sponsors.</h1>
      <h2 className=" font-bold text-orange-400 px-2 text-center text-4xl">Your support is enormous</h2>
      <h1 className="bg-[#272626b5] text-white my-5 px-2">Top sponsors</h1>
      <hr />
      <TopSponsors sponsors={sponsors} />
      <br />
      <h1 className="bg-[#272626b5] text-white px-2">
        All sponsors {new Date().getFullYear()}
      </h1>
      <hr />
      <hr />
      <AllSponsors sponsors={sponsors} />
      <br />
    </main>
  );
}


export interface ISponsorProps {
  _id: string;
  badges: number;
  logo: { secure_url: string };
  businessName: string;
  businessDescription: string;
  ownerName: string;
  phone:string
}