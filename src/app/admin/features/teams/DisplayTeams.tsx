"use client";

import { ITeamProps } from "@/components/fixturesAndResults";
import { PopperToLeft } from "@/components/Poppers";
import React from "react";
import { DeleteTeam } from "./(actions)/DeleteTeam";
import Image from "next/image";
import { teamLogos } from "@/assets/teams/logos/team-logos";

const DisplayTeams = ({ teams }: { teams: ITeamProps[] }) => {


  return (
    <div className="max-w-full overflow-x-auto">
      <h1 className="_label">Teams</h1>
      <table className="table ">
        <tbody>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Alias</th>
            <th>Logo</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>

          {teams?.map((team: ITeamProps, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{team.name}</td>
              <td>{team.alias}</td>
              <td>
                <Image
                  src={team.logo?.secure_url ?? teamLogos[0].logo}
                  alt="tlogo"
                  width={100}
                  height={100}
                  className=" h-12 w-12 min-w-12 rounded-full"
                />
              </td>
              <td>{team.createdAt}</td>
              <td>
                <PopperToLeft>
                  <TeamActians team={team} />
                </PopperToLeft>
              </td>
            </tr>
          ))}
          {teams.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center _label">
                No teams available.
              </td>
            </tr>
          )}
        </tbody>

        <tfoot>{"Teams: " + teams.length}</tfoot>
      </table>
    </div>
  );
};

export default DisplayTeams;

export const TeamActians = ({ team }: { team: ITeamProps }) => {
  const className =
    "w-full py-2 px-3 hover:bg-gray-200 slowTrans select-none cursor-pointer";
  return (
    <ul>
      <li className={className}>Update</li>
      <li>
        <DeleteTeam team={team} className={className} />
      </li>
    </ul>
  );
};
