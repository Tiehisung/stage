"use client";

import { Button } from "@/components/buttons/SubmitAndClick";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { UpdateFixtureMatch } from "./CreateFixture";
import { IMatchProps, ITeamProps } from "@/components/fixturesAndResults";
import { getTeams } from "@/lib";
import { getDateAsDMY } from "@/lib/timeAndDate";

interface DisplayFixturesProps {
  fixtures: IMatchProps[];
  teams: ITeamProps[];
}
// Fixture is  match that is not yet played successfully

export function DisplayFixtures({ fixtures, teams }: DisplayFixturesProps) {
  const [fixtureToEdit, setFixtureToEdit] = useState<IMatchProps | null>(null);

  return (
    <div>
      <table className="table my-10 table-auto ">
        <caption className="_title">Fixtures</caption>
        <tbody>
          <tr className="border p-2 ">
            <th>Title</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          {fixtures.map((fixture) => (
            <tr key={fixture._id} className="border p-2 text-xl">
              <td className="px-2 py-2 text-gray-600">
                {getTeams(fixture)?.home?.name}
                {" vs "}
                {getTeams(fixture)?.away?.name}
              </td>
              <td className="px-2 py-2 whitespace-nowrap">
                {getDateAsDMY(fixture.date)}
              </td>
              <td className="px-2 py-2 flex gap-5 text-sm ">
                <UpdateFixtureMatch teams={teams} fixture={fixture} />
                <DeleteFixture fixtureId={fixture._id} />
              </td>
            </tr>
          ))}
          {fixtures.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center _label">
                No fixtures available.
              </td>
            </tr>
          )}
        </tbody>

        <tfoot>{"Fixtures: " + fixtures.length}</tfoot>
      </table>
    </div>
  );
}

export function DeleteFixture({ fixtureId }: { fixtureId: string }) {
  const router = useRouter();

  const [waiting, setWaiting] = useState(false);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWaiting(true);
    const response = await fetch(apiConfig.matches, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        matchId: fixtureId,
      }),
      cache: "no-cache",
    });
    const results = await response.json();
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting(false);

    router.refresh();
  };
  return (
    <Button
      waiting={waiting}
      disabled={waiting}
      waitingText=""
      handleClickEvent={handleDelete}
      className=" px-2 flex items-center text-red-600"
    >
      <RiDeleteBin6Line className={waiting ? "hidden" : ""} />
    </Button>
  );
}
