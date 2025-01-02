"use client";

import { apiConfig, baseUrl } from "@/lib/configs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcCamera } from "react-icons/fc";
import { toast } from "react-toastify";
import { useState } from "react";
import FormSubmitBtn from "@/components/buttons/SubmitAndClick";
import { getErrorMessage, getFilePath } from "@/lib";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { staticPeople } from "@/assets/images";

const dataModel = {
  image: {},
  fullname: "",
  phone: "",
  email: "",
  dob: "",
  role: "",
  dateSigned: "",
};
export default function NewManagerForm({}) {
  const router = useRouter();
  const [toggleForm, setToggleForm] = useState(false);
  const [imageFile, setImageFile] = useState<StaticImport | string>(staticPeople.yunus);
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({
    ...dataModel,
  });

  const OnchangeManager = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleImageSelection(event: React.ChangeEvent<HTMLInputElement>) {
    let selectedFile = event.target.files ? event.target.files[0] : null;
    if (!selectedFile) return;
    if (selectedFile.size > 3524000) {
      toast.error(
        selectedFile.size + " is too large. Picture should not exceed 3.5mb"
      );
      return;
    }
    setImageFile(getFilePath(selectedFile));
     
  }

  //Handle submit
  const handleCreateNewManager = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setWaiting(true);
      if (!formData.image) return toast.warn("Please choose picture");
      //Upload image
      const upload = await fetch(apiConfig .fileUpload, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: formData?.fullname.replaceAll(" ", "_"),
          filePath: imageFile,
          fileType: "image",
          preset: "konjiehifc-preset",
          folder: "managers/" + new Date().getFullYear(),
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
      let apiRoute = apiConfig.managers;
      const response = await fetch(apiRoute, {
        body: JSON.stringify({ ...formData, image: uploadRsp.data }),
        cache: "no-cache",
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const results = await response.json();
      setWaiting(false);

      toast(results.message, { type: results.success ? "success" : "error" });
      if (results.success) {
        setFormData(dataModel);
        setImageFile(staticPeople.yunus);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      router.refresh();
      setWaiting(false);
    }
  };
  return (
    <div>
      <div className="flex flex-wrap gap-4 md:grid md:grid-cols-2 items-center border-b-2">
        <h1 className="__h1 text-center">Managers</h1>
        <button
          onClick={() => setToggleForm((p) => !p)}
          className="text-sm secondary__btn px-2 py-1 w-fit ml-auto mr-2"
        >
          Create manager
        </button>
      </div>

      <div
        className={`flex justify-center overflow-y-auto transition-all duration-300 p-2  ${
          toggleForm ? " opacity-100 " : "opacity-0"
        }`}
      >
        <form
          onSubmit={handleCreateNewManager}
          className={`grid md:grid-cols-2 gap-3 w-fit transition-all duration-300 delay-75 ease-in bg-white shadow border rounded-md p-2 ${
            toggleForm ? " h-auto " : "invisible h-0"
          }`}
        >
          <h2 className="mt-5 mb-2 text-teal-600 __h1">
            Manager registration form
          </h2>
          <div className="w-fit flex flex-col gap-1 justify-center items-center">
            <Image
              src={imageFile}
              width={300}
              height={300}
              alt="desc image"
              className="h-36 w-36 rounded-xl shadow"
            />
            <label
              htmlFor={"new-leader"}
              className="flex items-center shadow w-fit p-1 rounded mt-3 cursor-pointer"
              title="Choose file"
            >
              <FcCamera size={30} /> Choose files
              <input
                id={"new-leader"}
                hidden
                type="file"
                onChange={handleImageSelection}
                name="image"
                className=""
              />
            </label>
          </div>

          <div className=" ">
            <p>Fullname</p>
            <input
              type="text"
              onChange={OnchangeManager}
              required
              name="fullname"
              value={formData?.fullname}
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
              value={formData?.phone}
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
              value={formData?.email}
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
              value={formData?.dob}
              className=" border px-2 w-60 h-7 rounded font-semibold"
            />
          </div>

          <div className=" ">
            <p className="">Date of signed</p>
            <input
              type="date"
              required
              onChange={OnchangeManager}
              name="dateSigned"
              value={formData?.dateSigned}
              className=" border px-2 w-60 h-7 rounded font-semibold"
            />
          </div>

          <div className=" ">
            <p className="">Role definition</p>
            <input
              type="text"
              required
              onChange={OnchangeManager}
              name="role"
              value={formData?.role}
              className=" border px-2 w-60 h-7 rounded font-semibold"
            />
          </div>
          <br />

          <FormSubmitBtn
            waiting={waiting}
            waitingText={"Please wait..."}
            disabled={waiting}
            primaryText={"Submit"}
            className="primary__btn px-12 h-10 py-1 w-fit"
          />
        </form>
      </div>
    </div>
  );
}
