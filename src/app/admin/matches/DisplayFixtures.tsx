"use client";

import { Button } from "@/components/buttons/SubmitAndClick";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { UpdateFixtureMatch } from "./CreateFixture";
import { IMatchProps } from "@/components/fixturesAndResults";
import { teamKFC } from "@/data/teams";
import { getTeams } from "@/lib";

interface Fixture {
  _id: string;
  host: string;
  visitors: string;
  date: string;
}

interface DisplayFixturesProps {
  fixtures: IMatchProps[];
}
// Fixture is  match that is not yet played successfully

export function DisplayFixtures({ fixtures }: DisplayFixturesProps) {
  const [fixtureToEdit, setFixtureToEdit] = useState<Fixture | null>(null);

  return (
    <div>
      <table className="table my-10">
        <caption className="font-bold text-3xl bg-gray-600 text-white">
          Fixtures
        </caption>
        <tbody>
          <tr className="border p-2">
            <th>Title</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          {fixtures.map((fixture) => (
            <tr key={fixture._id} className="border p-2 text-xl">
              <td className="px-2 py-2">
                {getTeams(fixture)?.home?.name ?? "Home"}
                {" vs "}
                {getTeams(fixture)?.away?.name ?? "Away"}
              </td>
              <td className="px-2 py-2">{fixture.date}</td>
              <td className="px-2 py-2 flex gap-5 text-sm ">
                <UpdateFixtureMatch fixture={fixtureToEdit as unknown as IMatchProps} />
                <DeleteFixture fixtureId={fixture._id} />
              </td>
            </tr>
          ))}
        </tbody>
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
    const response = await fetch(baseUrl() + "/api/fixtures", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fixtureId: fixtureId,
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
