import { ITeamProps } from "@/components/fixturesAndResults";
import { PopperToLeft } from "@/components/Poppers";
import React from "react";

const DisplayTeams = () => {
  const teams: ITeamProps[] = [];
  return (
    <li>
      <table className="table ">
        <tbody>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Alias</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>

          {teams.map((team, index) => (
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
  const className = "w-full h-5 hover:bg-gray-200 slowTrans";
  return (
    <ul>
      <li className={className}>Update</li>
      <li className={className}>Delete</li>
    </ul>
  );
};
