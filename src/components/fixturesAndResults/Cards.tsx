"use client";

import Image from "next/image";
import { Button } from "../buttons/SubmitAndClick";
import { IMatchProps } from ".";
import { getTimeAgo } from "@/lib/timeAndDate";
import { broadcasters } from "@/assets/broadcaster/broadcaster";
import { teamLogos } from "@/assets/teams/logos/team-logos";
import { getTeams } from "@/lib";

interface IMatchFixtureCardProps {
  match: IMatchProps;
  className?: string;
}

export const MatchFixtureCard: React.FC<IMatchFixtureCardProps> = ({
  match,
  className,
}) => {
  const { title, date, time } = match;
  const { home, away } = getTeams(match);
  return (
    <div
      className={
        "w-96 bg-white border border-gray-200 rounded-lg shadow-md p-4 " +
        className
      }
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <Button
          primaryText="More"
          className="text-sm text-gray-500 hover:text-gray-700"
        />
      </div>

      {/* Match Details */}
      <div className="flex flex-col items-center text-sm">
        {/* Teams */}
        <div className="flex justify-between items-center w-full mb-2">
          {/* Home Team */}
          <div className="flex flex-col items-center space-y-2">
            <Image
              width={250}
              height={250}
              src={home?.logo?.secure_url ?? teamLogos[0].logo}
              alt={home.name}
              className="w-12 h-12"
            />
            <span className=" font-medium">{home.name}</span>
          </div>

          {/* Match Time */}
          <div className="flex flex-col items-center space-y-1">
            <span className=" text-gray-500">{date}</span>
            <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-1 font-medium">
              {time}
            </div>
            <div className="flex items-center space-x-1">
              <Image
                src={broadcasters.sky_sports}
                alt={"broadcaster"}
                className="w-auto h-6 object-contain"
                width={100}
                height={100}
              />
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center space-y-2">
            <Image
              src={away?.logo?.secure_url ?? teamLogos[0].logo}
              width={250}
              height={250}
              alt={away.name}
              className="w-12 h-12"
            />
            <span className=" font-medium">{away.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PlayedMatchCarch: React.FC<{
  match: IMatchProps;
  league: string;
  className?: string;
}> = ({ league, match, className }) => {
  const { home, away } = getTeams(match);
  const teams = [home, away];

  const timeAgo = match.status == "FT" ? `(${getTimeAgo(match.date)})` : "";
  return (
    <div
      className={`min-w-80 bg-white border border-gray-200 rounded-lg shadow-md p-4 text-sm ${className}`}
    >
      {/* Header */}
      <div className={`flex justify-between text-sm mb-4`}>
        <span
          className={` ${
            match.status == "HT" || match.status == "LIVE"
              ? "text-primaryGreen"
              : "text-gray-500"
          }`}
        >
          {match.status}
          {timeAgo}
        </span>
        <span>{league}</span>
      </div>

      {/* Teams */}
      {teams.map((team, index) => (
        <div
          key={index}
          className={`flex justify-between items-center ${
            index === 0 ? "mb-4" : ""
          }`}
        >
          {/* Team Details */}
          <div className="flex items-center space-x-3">
            <Image
              src={team?.logo?.secure_url ?? teamLogos[0].logo}
              alt={team?.name}
              className="w-8 h-8 rounded-full"
              width={400}
              height={400}
            />
            <span className="  font-medium">{team?.name}</span>
          </div>

          {/* Team Score */}
          <span className="text-xl font-bold">{match.scores.kfc.length}</span>
        </div>
      ))}
    </div>
  );
};

export const CanceledMatchCarch: React.FC<{
  match: IMatchProps;
  league: string;
  className?: string;
}> = ({ league, match, className }) => {
  const { home, away } = getTeams(match);

  return (
    <div
      className={
        "w-80 bg-white border border-red-300 rounded-lg shadow-md p-4 " +
        className
      }
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-red-600">Match Canceled</h3>
        <span className="text-sm text-gray-500">{league}</span>
      </div>

      {/* Teams */}
      <div className="flex justify-between items-center mb-4">
        {/* Home Team */}
        <div className="flex flex-col items-center space-y-2">
          <Image
            width={100}
            height={100}
            src={home?.logo?.secure_url ?? teamLogos[0].logo}
            alt={home?.name}
            className="w-12 h-12"
          />
          <span className="text-sm font-medium">{home.name}</span>
        </div>

        {/* Versus */}
        <span className="text-gray-500 font-medium">vs</span>

        {/* Away Team */}
        <div className="flex flex-col items-center space-y-2">
          <Image
            width={100}
            height={100}
            src={away?.logo?.secure_url ?? teamLogos[0].logo}
            alt={away?.name}
            className="w-12 h-12"
          />
          <span className="text-sm font-medium">{away.name}</span>
        </div>
      </div>

      {/* Reason for Cancellation */}
      <div className="bg-red-100 text-red-600 text-center p-2 rounded-lg">
        <span className="text-sm font-medium">
          Reason: {match.challenge?.reason}
        </span>
      </div>
    </div>
  );
};
