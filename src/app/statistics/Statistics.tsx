import { _playerStats } from "@/data/statistics";
import { IFileProps } from "@/types";
import Image from "next/image";
import React, { FC } from "react";

const PlayerStatistics = () => {
  return (
    <div>
      <h1 className="mb-4 text-lg md:text-xl px-1">Statistics</h1>
      <div className=" flex items-center justify-start gap-6 overflow-x-auto  ">
        {_playerStats.map((pstat, i) => (
          <PlayerStatsCard key={i} {...pstat} />
        ))}
      </div>
    </div>
  );
};

export default PlayerStatistics;

export interface IPlayerStatsProps {
  title: string;
  alias: string;
  featuredPlayer: {
    firstName: string;
    lastName: string;
    statsValue: string;
    avatar: IFileProps;
    _id: string;
  };
  otherPlayers: {
    firstName: string;
    lastName: string;
    statsValue: string;
    avatar: IFileProps;
    _id: string;
  }[];
}

export const PlayerStatsCard: FC<IPlayerStatsProps> = ({
  alias,
  featuredPlayer,
  otherPlayers,
  title,
}) => {
  return (
    <div className="min-w-72 w-96 bg-white border border-gray-200 rounded-lg shadow-md p-4 container">
      {/* Header */}
      <h3 className="text-lg font-bold mb-4">{title}</h3>

      {/* Featured Player */}
      <div className="flex items-center bg-blue-100 rounded-lg p-4 mb-6">
        <Image
          width={300}
          height={300}
          src={featuredPlayer.avatar.secure_url}
          alt={featuredPlayer.lastName}
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h4 className="text-xl font-bold">
            {`${featuredPlayer.lastName} ${featuredPlayer.firstName}`}
          </h4>
          <p className="text-2xl font-semibold text-blue-600">
            {`${featuredPlayer.statsValue} ${alias}`}
          </p>
        </div>
      </div>

      {/* Other Players */}
      <div className="space-y-3">
        {otherPlayers.map((player, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-200 pb-3"
          >
            <div className="flex items-center space-x-3">
              <Image
                width={300}
                height={300}
                src={player.avatar.secure_url}
                alt={player.lastName}
                className="w-10 h-10 rounded-full"
              />
              <span className="text-sm font-medium">
                {`${player.lastName} ${featuredPlayer.firstName}`}
              </span>
            </div>
            <span className="text-lg font-bold">{player.statsValue}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
