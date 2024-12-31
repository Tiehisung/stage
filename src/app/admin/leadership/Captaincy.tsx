"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { GetCaptains } from "./page";
import { GetPlayers } from "../players/page";
import { Button } from "@/components/buttons/SubmitAndClick";
import { getErrorMessage } from "@/lib";
import { IResultProps } from "@/types/interface";
import { IPlayer } from "@/app/players/page";
import { staticPeople } from "@/assets/images";

export type Captaincy = "captain" | "viceCaptain";

export type ICaptainProps = {
  player: Partial<IPlayer>;
  captaincy: Captaincy;
  createdAt: string;
  updatedAt: string;
};

export default function CaptaincyAdm({}) {
  const router = useRouter();
  const [Captains, setCaptains] = useState<ICaptainProps[]>([]);

  const [refresh, setRefresh] = useState(0); //Refresh to update changes
  useEffect(() => {
    const fetchCaptains = async () => {
      const captains = await GetCaptains();
      setCaptains(captains);
    };
    fetchCaptains();
  }, [refresh]);

  const [players, setPlayers] = useState<IPlayer[]>([]);
  useEffect(() => {
    const fetchPlayers = async () => {
      const _players = await GetPlayers();
      setPlayers(_players);
    };
    fetchPlayers();
  }, [refresh]);

  const [toggleEdit, setToggleEdit] = useState(false);
  const [waitingElement, setWaitingElement] = useState("");

  const handleChangeCaptain = async (playerId: string, captaincy: string) => {
    try {
      setRefresh((p) => p + 1);
      setWaitingElement(playerId + captaincy);
      const response = await fetch(baseUrl() + "/api/managers/captains", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify({ playerId, captaincy }),
      });
      const result: IResultProps = await response.json();
      toast(result.message, { type: result.success ? "success" : "error" });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      router.refresh();
      setWaitingElement("");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="__h1 mt-28">Captaincy</h1>
      <div
        onClick={() => setToggleEdit(false)}
        className={`fixed inset-0 z-10 justify-center items-center transition-all duration-300 bg-modalOverlay p-5 overflow-y-auto ${
          toggleEdit
            ? "flex scale-100"
            : "invisible -top-[100%] inset-auto scale-90"
        }`}
      >
        <table className="bg-white" onClick={(e) => e.stopPropagation()}>
          <tbody>
            <tr className="bg-slate-100 ">
              <th>#</th>
              <th className="p-2">Player</th>
              <th className="p-2">Captain</th>
              <th className="p-2">Ass1</th>
              <th className="p-2">Ass2</th>
            </tr>
            {players.map((player, index) => (
              <tr key={index} className="border ">
                <td className="p-2">{player.jersey}</td>
                <td className="p-2">
                  {player.firstName + " " + player.lastName}
                </td>
                <td className="p-2">
                  <Button
                    primaryText={""}
                    className="bg-gray-100 flex items-center text-sm gap-1"
                    waitingText=""
                    waiting={waitingElement == player._id + 1}
                    disabled={waitingElement !== ""}
                    handleClickEvent={() =>
                      handleChangeCaptain(player._id, "captain")
                    }
                  >
                    <input
                      className={`h-7 w-7  ${waitingElement && " z-[-1]"}`}
                      type="checkbox"
                      checked={player.captaincy == "captain"}
                    />
                  </Button>
                </td>
                <td className="p-2">
                  <Button
                    primaryText={""}
                    className="bg-gray-100 flex items-center text-sm gap-1"
                    waitingText=""
                    waiting={waitingElement == player._id + 2}
                    disabled={waitingElement !== ""}
                    handleClickEvent={() =>
                      handleChangeCaptain(player._id, "deputy1")
                    }
                  >
                    <input
                      className={`h-7 w-7 ${waitingElement && " z-[-1]"}`}
                      type="checkbox"
                      checked={player.captaincy == "deputy1"}
                    />
                  </Button>
                </td>
                <td className="p-2">
                  <Button
                    primaryText={""}
                    className=" bg-gray-100 flex items-center text-sm gap-1"
                    waitingText=""
                    waiting={waitingElement == player._id + 3}
                    disabled={waitingElement !== ""}
                    handleClickEvent={() =>
                      handleChangeCaptain(player._id, "deputy2")
                    }
                  >
                    <input
                      className={`h-7 w-7 ${waitingElement && " z-[-1]"}`}
                      type="checkbox"
                      checked={player.captaincy == "deputy2"}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="grid md:grid-cols-2 gap-10 justify-center my-10">
        {Captains?.map((captain, index) => (
          <li key={index}>
            <div>
              <Image
                src={captain?.player?.avatar?.secure_url || staticPeople.rufai}
                width={300}
                height={300}
                alt="desc image"
                className="h-36 w-36 rounded-xl shadow-md"
              />
              <p className="__h2 text-[grayText] first-letter:uppercase">
                {captain?.captaincy}
              </p>
              <p>
                {captain?.player?.firstName ?? "Firstname"}{" "}
                {captain?.player?.lastName ?? "Lastname"}
              </p>
            </div>
          </li>
        ))}
        <li>
          <button
            onClick={() => setToggleEdit((p) => !p)}
            className="secondary__btn px-2 py-4 mt-4 border shadow font-semibold rounded"
          >
            Edit captaincy
          </button>
        </li>
      </ul>
    </div>
  );
}
