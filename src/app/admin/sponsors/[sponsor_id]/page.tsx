import Image from "next/image";
import { GetSponsors } from "../page";
import DonateToSponsor from "./Donation";
import DonorBadging from "./Badging";
import EditSponsor from "./Edit";
import DeleteSponsor from "./Delete";
import { staticPeople } from "@/assets/images";
import { ISponsorProps } from "@/app/sponsorship/page";

interface Params {
  sponsor_id: string;
}

export default async function AdminSponsor({ params }: { params: Params }) {
  const sponsors:ISponsorProps[] = await GetSponsors();
  const foundById = sponsors.find(
    (sponsor) => sponsor._id == params.sponsor_id
  );

  return (
    <div>
      <hr />
      <div className="flex flex-col ">
        <p>Name : {foundById?.ownerName}</p>
        <p>Business : {foundById?.businessName}</p>
        <p>Contact : {foundById?.phone}</p>
        <br />
        <Image
          src={foundById?.logo?.secure_url || staticPeople.rufai}
          width={600}
          height={300}
          alt="desc image"
          className="w-80 h-auto m-1"
        />

        <ul className="space-y-32">
          <li id="support-sponsor" className="min-h-[50vh] py-6 bg-white">
            <h1 className="text-3xl bg-slate-300 text-center ">
              Support the club
            </h1>
            <br />
            <DonateToSponsor
              sponsorId={foundById?._id as string}
              businessName={foundById?.businessName || "anonymous"}
            />
          </li>
          <li id="sponsor-badges" className="min-h-[50vh] py-6 bg-white">
            <h1 className="text-3xl bg-slate-300 text-center ">Donor badges</h1>
            {foundById && <DonorBadging sponsor={foundById} />}
          </li>
          <li id="edit-sponsor" className="min-h-[50vh] py-6 bg-white">
            <h1 className="text-3xl bg-slate-300 text-center ">Edit sponsor</h1>
            {foundById && <EditSponsor sponsor={foundById} />}
          </li>

          <li id="delete-sponsor" className="min-h-[50vh] py-6 bg-white">
            <h1 className="text-3xl bg-slate-300 text-center ">
              Delete sponsor
            </h1>
            <br />
            <DeleteSponsor sponsorId={foundById?._id as string} />
          </li>
        </ul>
      </div>
    </div>
  );
}
