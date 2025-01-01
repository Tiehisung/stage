"use client";

import FormSubmitBtn, { Button } from "@/components/buttons/SubmitAndClick";
import SingleFilePicker from "@/components/files/SingleFilePicker";
import { ITeamProps } from "@/components/fixturesAndResults";
import { IconInput } from "@/components/input/Inputs";
import PrimaryModal from "@/components/modals/Modals";
import { apiConfig } from "@/lib/configs";
import { TConvertedFile } from "@/types/file";
import { IFileUpload } from "@/types/interface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

export interface IPostTeam {
  name: string;
  community: string;
  alias: string;
  logo: IFileUpload;
  currentPlayers: string[];
}

export interface IUpdateTeam extends IPostTeam {
  _id: string;
}

export const NewTeamForm = () => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    community: "",
    alias: "",
  });
  const [logoFile, setLogoFile] = useState<TConvertedFile | null>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);
    const body = {
      ...formData,
      logo: logoFile, //IFileUpload
    };
    const response = await fetch(apiConfig.teams, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-cache",
    });
    const results = await response.json();
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting(false);
    router.refresh();
  };
  return (
    <>
      <Button
        primaryText="Create new team"
        handleClickEvent={() => setIsOpen(true)}
        className="primary__btn px-2 ml-auto"
      />
      <PrimaryModal isOpen={isOpen} setIsOpen={setIsOpen} className="">
        <div  className=" rounded-xl bg-slate-100 p-3">
          <h1 className="font-light text-sm mb-2 text-red-700 text-center">
            Register new team
          </h1>
          <form
            className="p-4 border max-w-md grid gap-4 md:grid-cols-2 items-start"
            onSubmit={handleSubmit}
          >
            <div>
              <p className="_label">Name </p>
              <IconInput
                name="name"
                type="text"
                className=""
                value={formData.name}
                onChange={handleOnChange}
                placeholder="Name"
                label="Name"
                required
              />
            </div>

            <div>
              <p className="_label">Alias </p>
              <IconInput
                name="alias"
                type="text"
                className=""
                value={formData.alias}
                onChange={handleOnChange}
                placeholder="Alias"
                label="Alias"
                required
              />
            </div>

            <div>
              <p className="_label">Community </p>
              <IconInput
                name="community"
                type="text"
                className=""
                value={formData.community}
                onChange={handleOnChange}
                placeholder="Community"
                label="Community"
                required
              />
            </div>

            <div>
              <p className="_label">Team logo</p>
              <SingleFilePicker
                pickerId="team-logo"
                exportFile={setLogoFile}
                fileDisplayStyles="p-0"
                className="py-0"
              />
            </div>
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
        </div>
      </PrimaryModal>
    </>
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
  const [logoFile, setLogoFile] = useState<TConvertedFile | null>(null);

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
      logo: logoFile,
    };
    const response = await fetch(apiConfig.teams, {
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
  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <IconInput
          name="name"
          type="text"
          className=""
          value={formData.name}
          onChange={handleOnChange}
          label="Name"
          placeholder="Name"
        />
        <IconInput
          name="alias"
          type="text"
          className=""
          value={formData.alias}
          onChange={handleOnChange}
          label="alias"
          placeholder="Alias"
        />
        <IconInput
          name="community"
          type="text"
          className=""
          value={formData.community}
          onChange={handleOnChange}
          label="Community"
          placeholder="Community"
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
