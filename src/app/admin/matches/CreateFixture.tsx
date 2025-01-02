"use client";

import FormSubmitBtn, { Button } from "@/components/buttons/SubmitAndClick";
import { IMatchProps, ITeamProps } from "@/components/fixturesAndResults";
import { DateTimeInput } from "@/components/input/Inputs";
import RadioButtons from "@/components/input/Radio";
import PrimaryModal from "@/components/modals/Modals";
import { ResponsiveModal } from "@/components/modals/Responsive";
import { getErrorMessage, getTeams } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { customStyles } from "@/styles";
import { ISelectOptionLV } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

export interface IPostMatch {
  date: string;
  time: string;
  isHome: boolean;
  opponentId: string;
}
const CreateFixture = ({ teams }: { teams: ITeamProps[] }) => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const teamOptions: ISelectOptionLV[] = teams?.map((t) => ({
    label: t.name,
    value: t._id,
  }));

  const [matchType, setMatchType] = useState<string>("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [opponent, setOpponent] = useState<ISelectOptionLV | null>(null);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setWaiting(true);
      const body = {
        date,
        time,
        isHome: matchType === "home" ? true : false,
        opponent: opponent?.value, //opponentId
      };
      const response = await fetch(apiConfig.matches, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-cache",
      });
      const results = await response.json();
      toast(results.message, { type: results.success ? "success" : "error" });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };

  return (
    <div>
      <Button
        handleClickEvent={() => setIsOpenForm((p) => !p)}
        primaryText="Create new fixture"
        className="px-2 ml-auto primary__btn"
      />
      <PrimaryModal isOpen={isOpenForm} setIsOpen={setIsOpenForm}>
        <form
          className="p-4 border rounded-xl space-y-4 bg-white shadow-md w-72 md:w-96  max-w-xl"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text=lg text-gray-800 my-3">New Fixture</h1>
          <div>
            <p className="_label ">Select team</p>
            <Select
              options={teamOptions}
              styles={customStyles}
              onChange={(e) => setOpponent(e as ISelectOptionLV)}
            />
          </div>

          <div>
            <p className="_label">Match type </p>
            <RadioButtons
              defaultValue={matchType}
              setSelectedValue={setMatchType}
              values={["home", "away"]}
              wrapperStyles="flex gap-3 items-center"
            />
          </div>

          <div>
            <p className="_label">Date </p>
            <DateTimeInput
              name={"match-date"}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              required
            />
          </div>

          <div>
            <p className="_label">Time </p>
            <DateTimeInput
              name={"match-time"}
              onChange={(e) => setTime(e.target.value)}
              type="time"
              required
            />
          </div>

          <FormSubmitBtn
            waiting={waiting}
            disabled={waiting}
            waitingText={"Saving..."}
            primaryText={"Save fixture"}
            className="primary__btn px-3 mt-2 py-2"
          />
        </form>
      </PrimaryModal>
    </div>
  );
};

export default CreateFixture;

export const UpdateFixtureMatch = ({
  fixture: fx,
  teams,
}: {
  fixture: IMatchProps;
  teams: ITeamProps[];
}) => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const teamOptions: ISelectOptionLV[] = teams?.map((t) => ({
    label: t.name,
    value: t._id,
  }));

  const [matchType, setMatchType] = useState<string>(
    fx?.isHome ? "home" : "away"
  );
  const [time, setTime] = useState(fx?.time);

  const [date, setDate] = useState(fx?.date);

  const [opponent, setOpponent] = useState<ISelectOptionLV | null>({
    label: fx?.opponent?.name,
    value: fx?.opponent?._id,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ matchType });
    setWaiting(true);
    const body = {
      ...fx,
      date,
      time,
      isHome: matchType === "home" ? true : false,
      opponent: opponent?.value, //opponentId
    };
    const response = await fetch(apiConfig.matches, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-cache",
    });
    const results = await response.json();
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting(false);

    router.refresh();
  };

  const { home, away } = getTeams(fx);

  console.log({ fx });
  return (
    <ResponsiveModal modalId="update-match" trigger="Edit">
      <div>
        <h1 className="mb-4 text-lg md:text-xl">
          {`Update ${home?.name} vs ${away?.name}`}
        </h1>
        <form
          className="p-4 border rounded-xl space-y-4 bg-white shadow-md"
          onSubmit={handleSubmit}
        >
          <div>
            <p className="_label ">Select team</p>
            <Select
              defaultValue={opponent}
              options={teamOptions}
              styles={customStyles}
              onChange={(e) => setOpponent(e as ISelectOptionLV)}
            />
          </div>

          <div>
            <p className="_label">Match type </p>
            <RadioButtons
              defaultValue={fx?.isHome ? "home" : "away"}
              setSelectedValue={setMatchType}
              values={["home", "away"]}
              wrapperStyles="flex gap-3 items-center"
            />
          </div>

          <div>
            <p className="_label">Date </p>
            <DateTimeInput
              name={"update-date"}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              required
            />
          </div>

          <div>
            <p className="_label">Time </p>
            <DateTimeInput
              name={"update-time"}
              onChange={(e) => setTime(e.target.value)}
              type="time"
              required
            />
          </div>

          <FormSubmitBtn
            waiting={waiting}
            disabled={waiting}
            waitingText={"Saving..."}
            primaryText={"Update fixture"}
            className="primary__btn px-3 mt-2 py-2"
          />
        </form>
      </div>
    </ResponsiveModal>
  );
};
