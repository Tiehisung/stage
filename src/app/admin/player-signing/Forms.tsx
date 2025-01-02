"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { FcCamera } from "react-icons/fc";
import {   getErrorMessage, getFilePath } from "@/lib";
import { IPlayer } from "@/app/players/page";
import { IManager } from "../leadership/page";
import FormSubmitBtn from "@/components/buttons/SubmitAndClick";
import { DateTimeInput, IconInputWithLabel } from "@/components/input/Inputs";
import { TimelineFlowbite } from "@/components/Timeline";
import { RxAvatar } from "react-icons/rx";
import { BiSolidUserDetail } from "react-icons/bi";
import { GrUserManager } from "react-icons/gr";
import DiveUpwards from "@/components/Animate/DiveUp";
import { MdSend } from "react-icons/md";

const dataModel = {
  firstName: "",
  lastName: "",
  jersey: "",
  dateSigned: "",
  height: "",
  phone: "",
  email: "",
  dob: "",
  avatar: { secure_url: "" },
  manager: {
    fullname: "",
    phone: "",
    email: "",
    DoB: "",
  },
};

export default function PlayerProfileForm({
  player = null,
}: {
  player?: IPlayer | null;
}) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState(
    player || {
      ...dataModel,
    }
  );
  const OnchangePlayer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const OnchangeManager = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      manager: { ...prev.manager, [name]: value } as IManager,
    }));
  };

  // console.log("player at edit",player)
  //Handle change image
  async function handleImageSelection(e: React.ChangeEvent<HTMLInputElement>) {
    let selectedFile = e.target?.files?.[0] as File;
    if (!selectedFile) return;
    if (selectedFile.size > 3524000) {
      toast.error(
        selectedFile.size + " is too large. Picture should not exceed 3.5mb"
      );
      return;
    }

    setImageFile(await getFilePath(selectedFile));
  }

  //Handle submit
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setWaiting(true);

      let apiRoute = apiConfig.players + `/new-signing`;
      if (player) apiRoute = `${apiConfig.players}/${player?._id}`;

      const response = await fetch(apiRoute, {
        body: JSON.stringify({ ...formData, avatar: imageFile }),
        cache: "no-cache",
        method: player ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
      });
      const results = await response.json();
      setWaiting(false);

      toast(results.message, { type: results.success ? "success" : "error" });
      if (results.success) {
        setFormData({ ...dataModel });
        setImageFile("");
      }
    } catch (error) {
      toast.error(
        getErrorMessage(error, "An error occurred. Please try again")
      );
    } finally {
      router.refresh();
    }
  };
  const icons = [<RxAvatar />, <BiSolidUserDetail />, <GrUserManager />];

  return (
    <section className="">
      <h2 className="mt-5 mb-2 text-teal-600 text-center ">
        {player ? "Edit Player Profile" : "New Player Signup"}
      </h2>
      <form
        onSubmit={handleSignUp}
        className=" py-6 sm:px-6 grid justify-center gap-y-6 border border-white rounded-md bg-background/50 font-light container w-fit"
      >
        <TimelineFlowbite icons={icons}>
          {/* Avatar */}
          <DiveUpwards>
            <div className=" form-control gap-1 items-center w-fit bg-white min-w-72">
              <h2 className="_label">Avatar</h2>
              <Image
                src={imageFile || formData?.avatar?.secure_url}
                width={300}
                height={300}
                alt="player avatar"
                className="h-36 w-36 rounded-full bg-slate-300"
              />
              <label
                htmlFor="file"
                className="flex items-center shadow w-fit p-1 rounded mt-3 cursor-pointer"
                title="Choose file"
              >
                <FcCamera size={30} /> Choose files
                <input
                  id="file"
                  hidden
                  type="file"
                  multiple
                  onChange={handleImageSelection}
                  name="image"
                  className=""
                />
              </label>
            </div>
          </DiveUpwards>

          {/* Personal information */}
          <DiveUpwards>
            <div className="bg-white p-3 grid gap-7 w-fit">
              <h2 className="_label ">Player personal information form</h2>
              <IconInputWithLabel
                required
                label="Firstname"
                type="text"
                onChange={OnchangePlayer}
                value={formData?.firstName}
                name="firstName"
                className="border px-2 w-60 h-7 rounded font-semibold "
              />

              <IconInputWithLabel
                label="Lastname"
                onChange={OnchangePlayer}
                type="text"
                required
                name="lastName"
                value={formData?.lastName}
                className="border px-2 w-60 h-7 rounded font-semibold"
              />

              <IconInputWithLabel
                label="Jersey number"
                type="text"
                onChange={OnchangePlayer}
                name="jersey"
                required
                value={formData?.jersey}
                className=" border px-2 w-60 h-7 rounded font-semibold"
              />

              <div>
                <p className="">Date signed</p>
                <DateTimeInput
                  type="date"
                  onChange={OnchangePlayer}
                  name="dateSigned"
                  required
                  value={formData?.dateSigned}
                  className=" px-2 w-60 h-7 rounded font-semibold"
                />
              </div>

              <IconInputWithLabel
                label="Current height"
                type="number"
                onChange={OnchangePlayer}
                name="height"
                required
                value={formData?.height}
                className=" border px-2 w-60 h-7 rounded font-semibold"
              />

              <IconInputWithLabel
                label="Phone"
                onChange={OnchangePlayer}
                type="tel"
                required
                name="phone"
                value={formData?.phone}
                className="border px-2 w-60 h-7 rounded font-semibold"
              />

              <IconInputWithLabel
                label="Email"
                type="email"
                onChange={OnchangePlayer}
                name="email"
                required
                value={formData?.email}
                className="border px-2 w-60 h-7 rounded font-semibold"
              />

              <div>
                <p className="">Date of birth</p>
                <DateTimeInput
                  type="date"
                  onChange={OnchangePlayer}
                  name="dob"
                  required
                  value={formData?.dob}
                  className=" px-2 w-60 h-7 rounded font-semibold"
                />
              </div>
            </div>
          </DiveUpwards>

          {/* Manager */}
          <DiveUpwards>
            <div className="grid gap-6 h-fit w-fit bg-white p-3">
              <h2 className="_label ">Manager registration form</h2>

              <IconInputWithLabel
                label="Fullname"
                type="text"
                onChange={OnchangeManager}
                required
                name="fullname"
                value={formData?.manager?.fullname}
                className="border px-2 w-60 h-7 rounded font-semibold"
              />

              <IconInputWithLabel
                label="Phone"
                type="tel"
                required
                onChange={OnchangeManager}
                name="phone"
                value={formData?.manager?.phone}
                className="border px-2 w-60 h-7 rounded font-semibold"
              />

              <IconInputWithLabel
                label="Email"
                type="email"
                required
                onChange={OnchangeManager}
                name="email"
                value={formData?.manager?.email}
                className="border px-2 w-60 h-7 rounded font-semibold"
              />

              <div>
                <p className="">Date of birth</p>
                <DateTimeInput
                  type="date"
                  onChange={OnchangeManager}
                  name="DoB"
                  required
                  value={formData?.manager?.DoB}
                  className=" px-2 w-60 h-7 rounded font-semibold"
                />
              </div>

              <br />
              <hr />

              <FormSubmitBtn
                waiting={waiting}
                waitingText={"Please wait..."}
                disabled={waiting}
                primaryText={"Submit"}
                className="primary__btn px-12 h-10 py-1 w-full flex-wrap-reverse"
              />
            </div>
          </DiveUpwards>
        </TimelineFlowbite>
      </form>
      <br />
    </section>
  );
}
