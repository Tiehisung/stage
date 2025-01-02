import Image from "next/image";
import Link from "next/link";
import FilterPlayers from "./FilterPlayers";
import { IPlayer } from "@/app/players/page";
import { staticPeople } from "@/assets/images";
import { apiConfig } from "@/lib/configs";

export const GetPlayers = async (playerId?:string) => {
  if (playerId) {
    const response = await fetch(`${apiConfig.players}/${playerId}`, {
      cache: "no-store",
    });
    const player = await response.json();
    return player;
  }

  //Return all players
  const response = await fetch(apiConfig.players, {
    cache: "no-cache",
  });
  const players = await response.json();
  return players;
};

interface PlayersProps {
  searchParams: {
    p_filter?: string;
  };
}

export default async function Players({ searchParams }: PlayersProps) {
  const players:IPlayer[] = await GetPlayers();

  const filterValue = searchParams.p_filter;
  function filteredPlayers() {
    switch (filterValue) {
      case "fit":
        return players.filter((player) => player.isFit);
      case "yellow":
        return players.filter(
          (player) => player.card == "yellow"
        );
      case "red":
        return players.filter((player) => player.card == "red");
      default:
        return players;
    }
  }
  return (
    <div className="py-12 px-6">
      <h1 className="_title my-3 bg-gray-600 text-white">Our players</h1>
      <div>
        <FilterPlayers />
      </div>
      <div className="flex flex-wrap gap-2 bg-white p-[1vw] min-h-96">
        {filteredPlayers().map((player, index) => (
          <Link
            href={"/admin/players/" + player?._id}
            key={index}
            className="relative w-fit h-fit border p-2 rounded-md hover:ring-1"
          >
            <span className="absolute right-0 top-0 rounded flex items-center text-4xl border-l border-b rounded-s-lg text-gray-600 bg-arshTrans">
              {player?.jersey}
            </span>
            <Image
              src={player?.avatar?.secure_url || staticPeople.rufai}
              width={400}
              height={400}
              alt="player"
              className="h-60 w-60 rounded-t-md inset-0 bottom-0 bg-arshTrans"
            />
            <p className="text-2xl w-60 truncate text-center text-orange-500 capitalize ">
              {player?.firstName +
                " " +
                player?.lastName?.substring(0, 1)?.toUpperCase() +
                "."}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
