'use client'

import { ITeamProps } from "@/components/fixturesAndResults";
import { PopperToLeft } from "@/components/Poppers";
import React from "react";
import { DeleteTeam } from "./(actions)/DeleteTeam";

const DisplayTeams = ({ teams }: { teams: ITeamProps[] }) => {

  return (
    <li>
      <h1 className="_label">Teams</h1>
      <table className="table ">
        <tbody>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Alias</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>

          {teams?.map((team: ITeamProps, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{team.name}</td>
              <td>{team.alias}</td>
              <td>{team.createdAt}</td>
              <td>
                <PopperToLeft>
                  <TeamActians team={team} />
                </PopperToLeft>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </li>
  );
};

export default DisplayTeams;

export const TeamActians = ({ team }: { team: ITeamProps }) => {
  const className =
    "w-full py-2 px-3 hover:bg-gray-200 slowTrans select-none cursor-pointer";
  return (
    <ul>
      <li className={className}>Update</li>
      <li  >
        <DeleteTeam team={team} className={className}/>
      </li>
    </ul>
  );
};
