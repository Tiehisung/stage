"use client";

import FormSubmitBtn from "@/components/buttons/SubmitAndClick";
import { DateTimeInput } from "@/components/input/Inputs";
import RadioButtons from "@/components/input/Radio";
import teams from "@/data/teams";
import { baseUrl } from "@/lib/configs";
import { customStyles } from "@/styles";
import { ISelectOptionLV } from "@/types/interface";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const CreateMatch = () => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const teamOptions: ISelectOptionLV[] = teams.map((t) => ({
    label: t.name,
    value: t._id,
  }));

  const [matchType, setMatchType] = useState("");
  const [datetime, setDatetime] = useState("");
  const [oponent, setOponent] = useState<ISelectOptionLV | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);
    const response = await fetch(baseUrl() + "/api/fixtures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        datetime,
        matchType,
        oponentId: oponent?.value,
      }),
      cache: "no-cache",
    });
    const results = await response.json();
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting(false);
    if (results.success) {
    }
    router.refresh();
  };

  console.log({ matchType });
  return (
    <div>
      <h1 className="mb-4 text-lg md:text-xl">Create Fixture</h1>
      <form
        className="p-4 border rounded-xl space-y-4 bg-white shadow-md"
        onSubmit={handleSubmit}
      >
        <div>
          <p className="_label ">Select team</p>
          <Select
            options={teamOptions}
            styles={customStyles}
            onChange={(e) => setOponent(e as ISelectOptionLV)}
          />
        </div>

        <div>
          <p className="_label">Match type </p>
          <RadioButtons
            setSelectedValue={setMatchType}
            values={["Home", "Away"]}
            wrapperStyles="flex gap-3 items-center"
          />
        </div>

        <div>
          <p className="_label">Date time </p>
          <DateTimeInput
            name="match-date"
            onChange={(e) => setDatetime(e.target.value)}
            type="datetime-local"
            required
          />
        </div>

        <FormSubmitBtn
          waiting={waiting}
          disabled={waiting}
          waitingText={"Saving..."}
          primaryText={"Save fixture"}
          className="secondary__btn px-3 mt-2"
        />
      </form>
    </div>
  );
};

export default CreateMatch;
