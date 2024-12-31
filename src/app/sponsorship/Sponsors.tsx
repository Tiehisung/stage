"use client";

import { useEffect, useState } from "react";
import sponsorImage from '@/assets/images/people/rufai.png';
import Image from "next/image";
import { GetSponsors } from "../admin/sponsors/page";
import Loader from "@/components/Loader";
import { ISponsorProps } from "./page";

 
interface TopSponsorsProps {
  sponsors: ISponsorProps[];
}

export default function TopSponsors({ sponsors }: TopSponsorsProps) {
  if (!sponsors)
    return (
      <Loader
        message="Loading top sponsors..."
        iconStyles={"text-3xl"}
        className="flex flex-col justify-center items-center h-40 text-teal-400"
      />
    );
  return (
    <div className="p-1 md:p-2 bg-sponsors grid md:grid-cols-2 gap-3">
      {sponsors?.slice(0, 3).map((sponsor, spIndex) => (
        <div
          key={spIndex}
          className="flex flex-wrap md:grid md:grid-cols-2 justify-center items-center my-5 border rounded-md p-2 bg-yellow-50"
        >
          <div className="grid justify-end">
            <Image
              src={sponsor?.logo?.secure_url || sponsorImage}
              alt="si"
              width={500}
              height={400}
              className="h-40 w-60 shadow bg-blue-300"
            />
          </div>
          <div className=" h-40  p-2 relative">
            <cite className="font-semibold text-2xl">
              {sponsor?.businessName}
            </cite>
            <p>{sponsor?.businessDescription }</p>
            <p className="font-light text-sm absolute bottom-1 right-1">
              Courtesy {sponsor?.ownerName}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AllSponsors({ sponsors }: { sponsors: ISponsorProps[] }) {
  const [moreSponsors, setMoreSponsors] = useState({ from: 0, to: 10 });
  const handleMoreSponsors = () => {
    setMoreSponsors((prev) => {
      if (prev.to <= sponsors.length)
        return { from: prev.to, to: prev.to + 10 };
      return prev;
    });
  };
  if (!sponsors)
    return (
      <Loader
        message="Loading sponsors..."
        iconStyles={"text-3xl"}
        className="flex flex-col justify-center items-center h-40 text-teal-400"
      />
    );
  return (
    <div className="p-1 md:p-2 flex flex-wrap gap-4">
      {sponsors
        ?.slice(moreSponsors.from, moreSponsors.to)
        .map((sponsor, spIndex) => (
          <div
            key={spIndex}
            className="flex flex-col justify-center items-center my-5 border-4 border-red-600 rounded text-white bg-red-600"
          >
            <Image
              src={sponsor?.logo?.secure_url || sponsorImage}
              alt="pp"
              width={200}
              height={300}
              className="w-32 h-28"
            />
            <cite className="w-32 truncate text-xl p-1 border-white border">
              {sponsor?.businessName}
            </cite>
          </div>
        ))}

      <button
        onClick={handleMoreSponsors}
        className={`${
          sponsors.length <= moreSponsors.to && "hidden"
        } text-blue-400 text-sm hover:underline cursor-pointer m-3`}
      >
        See more
      </button>
    </div>
  );
}


export function MegaSponsors() {
  const [ourSponsors, setSponsors] = useState<ISponsorProps[]>([]);
  useEffect(() => {
    async function getSponsorsData() {
      const sponsors = await GetSponsors();
      setSponsors(sponsors);
    }
    getSponsorsData();
  }, []);
  const mega = ourSponsors.sort((a, b) => a.badges - b.badges);
  return (
    <div>
      <h1 className="bg-[#272626b5] text-white px-2">
        Mega sponsors {new Date().getFullYear()}
      </h1>
      <hr />
      <br />
      <div className="flex flex-wrap gap-3 p-2 max-w-full bg-[#151414] text-white">
        {mega?.slice(0, 10).map((sponsor, spIndex) => (
          <button key={spIndex} className="border rounded-lg p-2">
            {sponsor?.businessName}
          </button>
        ))}
        {!mega && (
          <Loader
            message="Loading mega sponsors..."
            iconStyles={"text-3xl"}
            className="flex flex-col justify-center items-center  text-teal-400"
          />
        )}
      </div>
    </div>
  );
}
