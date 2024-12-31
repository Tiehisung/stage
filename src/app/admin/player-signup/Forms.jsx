"use client";
import Image from "next/image";
import playerImage from "@/public/images/breakfast2.jpg";
import FormSubmitBtn from "@/components/buttons/formBtn";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { FcCamera } from "react-icons/fc";

export default function PlayerProfileForm({ player = null }) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState(player?.image?.secure_url);
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState(
    player || {
      ...dataModel,
    }
  );
  const OnchangePlayer = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const OnchangeManager = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      manager: { ...prev.manager, [name]: value },
    }));
  };

  // console.log("player at edit",player)
  //Handle change image
  function handleImageSelection(event) {
    let selectedFile = event.target.files[0];
    if (!selectedFile) return;
    if (selectedFile.size > 3524000) {
      toast.error(
        selectedFile.size + " is too large. Picture should not exceed 3.5mb"
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = function (loadEvt) {
      setImageFile(loadEvt.target.result);
    };
    reader.readAsDataURL(selectedFile);
  }

  //Handle submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    setWaiting(true);
    if (!player && !formData.image) return toast.warn("Please choose picture");
    //Upload image
    const upload = await fetch(baseUrl() + "/api/files/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: formData?.firstName + "_" + formData?.lastName,
        filePath: imageFile,
        fileType: "image",
        preset: "konjiehifc-preset",
        folder: "players/" + new Date().getFullYear(),
        presetType: "authenticated",
      }),
    });
    const uploadRsp = await upload.json();
    if (!uploadRsp.success) {
      setWaiting(false);
      toast.error(uploadRsp.message);
      return;
    }

    //Proceed to save to database
    let apiRoute = baseUrl() + `/api/players/new-signup`;
    if (player) apiRoute = baseUrl() + `/api/players/${player?._id}`;

    const response = await fetch(apiRoute, {
      body: JSON.stringify({ ...formData, image: uploadRsp.data }),
      cache: "no-cache",
      method: player ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
    });
    const results = await response.json();
    setWaiting(false);

    toast(results.message, { type: results.success ? "success" : "error" });
    if (results.success) {
      setFormData(dataModel);
      setImageFile(null);
    }
    router.refresh();
  };

  return (
    <section className="pb-5">
      <form
        onSubmit={handleSignUp}
        className="pl-3 grid justify-center md:grid-cols-2 gap-3 border p-3 bg-[#ded7d7c9] font-light"
      >
        <div className="bg-white p-3 grid gap-2 w-fit">
          <h2 className="mt-5 mb-2 text-teal-600 ">
            Player personal information form
          </h2>
          <div className=" flex flex-col gap-1 justify-center items-center">
            <Image
              src={imageFile || playerImage}
              width={300}
              height={300}
              alt="desc image"
              className="h-36 w-36 rounded-full"
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
          <div className=" ">
            <p>Firstname</p>
            <input
              required
              type="text"
              onChange={OnchangePlayer}
              value={formData?.firstName}
              name="firstName"
              className="border px-2 w-60 h-7 rounded font-semibold "
            />
          </div>
          <div>
            <p>Lastname</p>
            <input
              onChange={OnchangePlayer}
              type="text"
              required
              name="lastName"
              value={formData?.lastName}
              className="border px-2 w-60 h-7 rounded font-semibold"
            />
          </div>
          <div className="relative">
            <p className="">Jersey number</p>
            <input
              type="text"
              onChange={OnchangePlayer}
              name="jersey"
              required
              value={formData?.jersey}
              className=" border px-2 w-60 h-7 rounded font-semibold"
            />
          </div>
          <div className="relative">
            <p className="">Date signed</p>
            <input
              type="date"
              onChange={OnchangePlayer}
              name="dateSigned"
              required
              value={formData?.dateSigned}
              className=" border px-2 w-60 h-7 rounded font-semibold"
            />
          </div>
          <div className="relative">
            <p className="">Current height</p>
            <input
              type="number"
              onChange={OnchangePlayer}
              name="height"
              required
              value={formData?.height}
              className=" border px-2 w-60 h-7 rounded font-semibold"
            />
          </div>
          <div>
            <p>Phone</p>
            <input
              onChange={OnchangePlayer}
              type="tel"
              required
              name="phone"
              value={formData?.phone}
              className="border px-2 w-60 h-7 rounded font-semibold"
            />
          </div>
          <div>
            <p>Email</p>
            <input
              type="email"
              onChange={OnchangePlayer}
              name="email"
              required
              value={formData?.email}
              className="border px-2 w-60 h-7 rounded font-semibold"
            />
          </div>
          <div className="relative">
            <p className="">Date of birth</p>
            <input
              type="date"
              onChange={OnchangePlayer}
              name="dob"
              required
              value={formData?.dob}
              className=" border px-2 w-60 h-7 rounded font-semibold"
            />
          </div>

          <br />
        </div>

        {/* Manager */}
        <div className="grid gap-6 h-fit w-fit bg-white p-3">
          <h2 className="mt-5 mb-2 text-teal-600 ">
            Manager registration form
          </h2>
          <div className=" ">
            <p>Fullname</p>
            <input
              type="text"
              onChange={OnchangeManager}
              required
              name="fullname"
              value={formData?.manager?.fullname}
              className="border px-2 w-60 h-7 rounded font-semibold"
            />
          </div>
          <div className=" ">
            <p>Phone</p>
            <input
              type="tel"
              required
              onChange={OnchangeManager}
              name="phone"
              value={formData?.manager?.phone}
              className="border px-2 w-60 h-7 rounded font-semibold"
            />
          </div>
          <div className=" ">
            <p>Email</p>
            <input
              type="email"
              required
              onChange={OnchangeManager}
              name="email"
              value={formData?.manager?.email}
              className="border px-2 w-60 h-7 rounded font-semibold"
            />
          </div>
          <div className=" ">
            <p className="">Date of birth</p>
            <input
              type="date"
              required
              onChange={OnchangeManager}
              name="dob"
              value={formData?.manager?.dob}
              className=" border px-2 w-60 h-7 rounded font-semibold"
            />
          </div>
          <br />
          <hr />

          <FormSubmitBtn
            waiting={waiting}
            waitingText={"Please wait..."}
            disabled={waiting}
            primaryText={"Submit"}
            styles="primary__btn px-12 h-10 py-1 w-fit"
          />
        </div>
      </form>
      <br />
      <ToastContainer />
    </section>
  );
}
const dataModel = {
  firstName: "",
  lastName: "",
  dob: "",
  jersey: "",
  phone: "",
  dateSigned: "",
  email: "",
  image: "image",
  height: 0,
  manager: { fullname: "", phone: "", dob: "", email: "" },
};
