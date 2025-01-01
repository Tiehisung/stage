"use client";

import FormSubmitBtn from "@/components/buttons/SubmitAndClick";
import { IMatchProps } from "@/components/fixturesAndResults";
import { ResponsiveModal } from "@/components/modals/Responsive";
import matches from "@/data/matches";
import _players from "@/data/players";
import { getTeams } from "@/lib";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Select from "react-select";

const HomeTeamGoalForm = ({}) => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const liveMatch = matches[0];
  const [teamType, setTeamType] = useState<string>(""); //home | away
  const { home, away } = getTeams(liveMatch as IMatchProps);

  const [scorerId, setScorerId] = useState("");

  const onfieldPlayers = _players.map((p) => ({
    label: `${p.lastName} ${p.firstName}`,
    value: p._id,
  }));
  return (
    <ResponsiveModal modalId="home-team-modal" trigger="Goal">
      <form className="">
        <div>
          <p className="_label">Player</p>
          <Select
            options={onfieldPlayers}
            onChange={(arg) => setScorerId(arg?.value!)}
          />
        </div>
        <div>
          <p className="_label">Time</p>
          <input
            type="number"
            name="time"
            max={100}
            min={1}
            className="bg-white text-black p-2 w-20"
            required
          />
        </div>
        <div>
          <FormSubmitBtn
            waiting={waiting}
            disabled={waiting}
            waitingText={"Saving..."}
            primaryText={"Save Goal"}
            className="secondary__btn px-3 mt-2"
          />
        </div>
      </form>
    </ResponsiveModal>
  );
};

export default HomeTeamGoalForm;

export const AwayTeamGoalForm = ({}) => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const liveMatch = matches[0];
  const { home, away } = getTeams(liveMatch as IMatchProps);

  const [scorerId, setScorerId] = useState("");

  return (
    <ResponsiveModal modalId="away-team-modal" trigger="Goal">
      <form className="">
        <div>
          <p className="_label">Time</p>
          <input
            type="number"
            name="time"
            max={100}
            min={1}
            className="bg-white text-black p-2 w-20"
            required
          />
        </div>
        <div>
          <FormSubmitBtn
            waiting={waiting}
            disabled={waiting}
            waitingText={"Saving..."}
            primaryText={"Save Goal"}
            className="secondary__btn px-3 mt-2"
          />
        </div>
      </form>
    </ResponsiveModal>
  );
};

export const GoalForms = () => {
  return (
    <div className="flex w-full h-fit border rounded-mx p-3">
      <HomeTeamGoalForm/>
      <AwayTeamGoalForm/>
    </div>
  );
};
