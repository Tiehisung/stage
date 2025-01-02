"use client";

import { baseUrl } from "@/lib/configs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcCamera } from "react-icons/fc";
import { toast } from "react-toastify";
import { ChangeEvent, FormEvent, useState } from "react";
import FormSubmitBtn from "@/components/buttons/SubmitAndClick";
import { IManager } from "./page";
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
};

export default function ManagerFormModal({ manager }: { manager: IManager }) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<string | StaticImport>(
    manager?.image?.secure_url
  );
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState(
    manager || {
      ...dataModel,
    }
  );
  const [toggleForm, setToggleForm] = useState(false);

  const OnchangeManager = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleImageSelection(e: ChangeEvent<HTMLInputElement>) {
    let selectedFile = e.target?.files ? e.target.files[0] : null;
    if (!selectedFile) return;
    if (selectedFile.size > 3524000) {
      toast.error("Picture should not exceed 3.5mb");
      return;
    }
    setImageFile(await getFilePath(selectedFile));
  }

  //Handle submit
  const handleEditManager = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setWaiting(true);
      if (!formData?.image) return toast.warn("Please choose picture");
      //Upload image
      const upload = await fetch(baseUrl() + "/api/files/upload", {
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
      let apiRoute = baseUrl() + `/api/managers`;
      if (manager) apiRoute = baseUrl() + `/api/managers/${manager?._id}`;

      const response = await fetch(apiRoute, {
        body: JSON.stringify({ ...formData, image: uploadRsp.data }),
        cache: "no-cache",
        method: manager ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
      });
      const results = await response.json();

      toast(results.message, { type: results.success ? "success" : "error" });
      if (results.success) {
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
      <button
        onClick={() => setToggleForm((p) => !p)}
        className="text-sm px-1 secondary__btn rounded z-0"
      >
        Edit {manager?.role}
      </button>
      <div
        onClick={() => setToggleForm(false)}
        className={`fixed inset-0 flex flex-col justify-center items-center bg-modalOverlay z-10 ${
          toggleForm ? "" : "invisible"
        }`}
      >
        <form
          onSubmit={handleEditManager}
          className={` grid md:grid-cols-2 gap-3 max-h-[80vh] overflow-y-auto transition-all duration-300 ease-linear bg-white p-2 shadow rounded-md ${
            toggleForm ? "scale-100" : "scale-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="mt-5 mb-2 text-teal-600 __h2 ">
            Edit {manager?.role} form
          </p>
          <div className="w-fit flex flex-col gap-1 justify-center items-center relative">
            <Image
              src={imageFile}
              width={300}
              height={300}
              alt="desc image"
              className="h-36 w-36 rounded-xl shadow-md"
            />
            <label
              htmlFor={manager?._id}
              className="flex items-center shadow w-fit p-1 rounded mt-3 cursor-pointer"
              title="Choose file"
            >
              <FcCamera size={30} /> Choose files
              <input
                id={manager?._id}
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
              value={formData?.DoB}
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
            className="primary__btn px-12 h-10 py-1 w-fit z-0"
          />
        </form>
      </div>
    </div>
  );
}
