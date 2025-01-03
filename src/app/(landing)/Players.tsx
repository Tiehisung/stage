import React from "react";
import { GetPlayers } from "../admin/players/page";
import Image from "next/image";
import PrimLink from "@/components/Link";
import DiveUpwards from "@/components/Animate/DiveUp";
import { IPlayer } from "../players/page";

 

const LandingPlayers = async () => {
  const players: IPlayer[] = await GetPlayers();
  return (
    <div>
      <h1 className="mb-4 text-lg md:text-xl px-1">Players</h1>
      <div className="flex flex-wrap justify-start items-center gap-5 ">
        {players?.map((player, index: number) => (
          <DiveUpwards key={index}>
            <Image
              src={player?.avatar?.secure_url}
              width={200}
              height={200}
              alt="player"
              className="rounded-xl border w-44 h-44 grow border-gray-200 "
            />
            <div className="flex items-center gap-2">
              <p className="text-3xl font-semibold">{player?.jersey}</p>
              <p className="text-teal-500 text-sm">
                {`${player?.firstName} ${player?.lastName?.substring(0, 1)}.`}
              </p>
            </div>
          </DiveUpwards>
        ))}
      </div>

      <PrimLink href={"/players"} text="See more" className="ml-auto" />
    </div>
  );
};

export default LandingPlayers;
