"use client";

import FormSubmitBtn from "@/components/buttons/SubmitAndClick";
import SingleFilePicker from "@/components/files/SingleFilePicker";
import { ITeamProps } from "@/components/fixturesAndResults";
import { IconInput } from "@/components/input/Inputs";
import { getFilePath } from "@/lib";
import { baseUrl } from "@/lib/configs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

export const NewTeamForm = () => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    community: "",
    alias: "",
  });
  const [logoFile, setLogoFile] = useState<File | null | undefined>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);
    const body = {
      ...formData,
      logoPath: getFilePath(logoFile as File),
    };
    const response = await fetch(baseUrl() + "/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-cache",
    });
    const results = await response.json();
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting(false);
    // if (results.success) {
    // }
    router.refresh();
  };
  return (
    <li>
      <form className="" onSubmit={handleSubmit}>
        <IconInput
          name="name"
          type="text"
          className=""
          value={formData.name}
          onChange={handleOnChange}
        />
        <IconInput
          name="alias"
          type="text"
          className=""
          value={formData.alias}
          onChange={handleOnChange}
        />
        <IconInput
          name="community"
          type="text"
          className=""
          value={formData.community}
          onChange={handleOnChange}
        />

        <SingleFilePicker pickerId="team-logo" exportFile={setLogoFile} />
        <div>
          <FormSubmitBtn
            waiting={waiting}
            disabled={waiting}
            waitingText={"Saving..."}
            primaryText={"Save Team"}
            className="secondary__btn px-3 mt-2"
          />
        </div>
      </form>
    </li>
  );
};
export const UpdateTeamForm = ({ team }: { team: ITeamProps }) => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const [formData, setFormData] = useState({
    name: team.name ?? "",
    community: team.community ?? "",
    alias: team.alias ?? "",
  });
  const [logoFile, setLogoFile] = useState<File | null | undefined>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);
    const body = {
      ...team,
      ...formData,
      logoPath: getFilePath(logoFile as File),
    };
    const response = await fetch(baseUrl() + "/api/teams", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-cache",
    });
    const results = await response.json();
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting(false);
    // if (results.success) {
    // }
    router.refresh();
  };
  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <IconInput
          name="name"
          type="text"
          className=""
          value={formData.name}
          onChange={handleOnChange}
        />
        <IconInput
          name="alias"
          type="text"
          className=""
          value={formData.alias}
          onChange={handleOnChange}
        />
        <IconInput
          name="community"
          type="text"
          className=""
          value={formData.community}
          onChange={handleOnChange}
        />

        <div>
          <p className="_label">Existing logo</p>
          <Image
            src={team.logo.secure_url}
            width={400}
            height={400}
            className={`bg-gray-400  w-32 h-32 rounded-md border`}
            alt="ex-logo"
          />
        </div>

        <SingleFilePicker pickerId="team-logo" exportFile={setLogoFile} />
        <div>
          <FormSubmitBtn
            waiting={waiting}
            disabled={waiting}
            waitingText={"Saving..."}
            primaryText={"Update Team"}
            className="secondary__btn px-3 mt-2"
          />
        </div>
      </form>
    </div>
  );
};
