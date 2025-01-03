"use client";

import Image from "next/image";
import { BsThreeDotsVertical, BsX } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FcCamera } from "react-icons/fc";
import { baseUrl } from "@/lib/configs";
import { ToastContainer, toast } from "react-toastify";
import FormSubmitBtn from "@/components/buttons/SubmitAndClick";
import { ISponsorProps } from "@/app/sponsorship/page";
import { staticPeople } from "@/assets/images";
import { getFilePath } from "@/lib";

export default function DisplayAdminSponsors({
  sponsors,
}: {
  sponsors: ISponsorProps[];
}) {
  const [activeSponsors, setActiveSponsors] = useState(sponsors);
  const router = useRouter();
  const goToSponsor = (id: string) => {
    router.push("/admin/sponsors/" + id);
  };

  const handleDeleteSponsor = (id: string) => {
    setActiveSponsors((prev) => prev.filter((sponsor) => sponsor._id !== id));
  };

  const [sponsorId, setSponsorId] = useState("");

  return (
    <section>
      <ul className="flex flex-wrap gap-2 bg-slate-50">
        {activeSponsors.map((sponsor, spIndex) => (
          <li
            onClick={() => {
              goToSponsor(sponsor._id);
              setSponsorId("");
            }}
            key={spIndex}
            className="flex flex-col gap-1 items-center justify-center w-40 h-40 p-1 hover:bg-slate-100 shadow-sm my-3 cursor-pointer group relative"
          >
            <BsThreeDotsVertical
              size={25}
              onClick={(e) => {
                e.stopPropagation();
                // setToggleOptions((prev) => !prev);
                setSponsorId(sponsor._id);
              }}
              className="absolute top-1 right-1 p-1 text-gray-500"
            />
            <span
              hidden={sponsor._id !== sponsorId}
              className="bg-green-500 items-center gap-3 shadow rounded-sm cursor-auto absolute top-1 right-1"
              onClick={(e) => e.stopPropagation()}
            >
              <button>
                <BiEdit size={20} color="lightgreen" />
              </button>
              <button onClick={() => handleDeleteSponsor(sponsor._id)}>
                <BsX size={20} color="brown" />
              </button>
            </span>
            <Image
              src={sponsor.logo.secure_url || staticPeople.rufai}
              width={60}
              height={30}
              alt="desc image"
              className="w-24 h-24 m-1"
            />
            <p className="w-32 truncate font-semibold text-cyan-900 text-center">
              {sponsor.businessName}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AddNewSponsor() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [formData, setFormData] = useState({ ...dataModel });
  const [waiting, setWaiting] = useState(false);

  const OnChangeSponsor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //Handle change image
  async function handleImageSelection(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile.size > 3524000) {
      toast.error(
        selectedFile.size + " is too large. Picture should not exceed 3.5mb"
      );
      return;
    }
    setImageFile(await getFilePath(selectedFile));
  }
  const [toggleNewSponsorForm, setToggleNewSponsorForm] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);

    if (imageFile) {
      //Upload logo
      const upload = await fetch(baseUrl() + "/api/files/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: formData.businessName,
          filePath: imageFile,
          fileType: "image",
          preset: "konjiehifc-preset",
          folder: "sponsors/logos",
          presetType: "authenticated",
        }),
      });
      const uploadRsp = await upload.json();
      if (!uploadRsp.success) {
        setWaiting(false);
        toast(uploadRsp.message, { position: "bottom-center" });
        return;
      }

      //Proceed to database
      const response = await fetch(baseUrl() + "/api/sponsors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, logo: uploadRsp.data }),
        cache: "no-cache",
      });
      const results = await response.json();
      toast(results.message, {
        type: results.success ? "success" : "error",
        position: "bottom-center",
      });
      setWaiting(false);
      if (results.success) {
        setFormData(dataModel);
        setImageFile(null);
      }
      router.refresh();
      return;
    }

    //Proceed Without logo

    const response = await fetch(baseUrl() + "/api/sponsors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      cache: "no-store",
    });
    const results = await response.json();
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting(false);
    if (results.success) {
      setFormData(dataModel);
      setImageFile(null);
    }
    router.refresh();
    router.refresh();
  };
  return (
    <div className="z-[22]">
      <button
        onClick={() => setToggleNewSponsorForm((p) => !p)}
        className="z-10 flex items-center fixed top-20 right-4 text-xl px-1 text-green-600 bg-[#ffffffa7] border rounded transform ease-in duration-300"
      >
        {toggleNewSponsorForm ? (
          <CgClose
            className={`text-[#00000094] hover:text-[black] ${
              toggleNewSponsorForm ? "" : "hidden"
            }`}
          />
        ) : (
          <span className="text-sm">Add sponsor</span>
        )}
      </button>

      <div
        className={`fixed top-20 h-[80vh] overflow-y-auto bg-white p-1 max-w-[400px] w-fit  shadow-md transition-all duration-200  ${
          toggleNewSponsorForm ? " right-2 " : "-right-full"
        }`}
      >
        <form onSubmit={handleSubmit} className="grid gap-3 pt-4">
          <div className=" flex gap-2 justify-center flex-col items-center relative">
            <p className="font-light">Logo</p>
            <Image
              src={imageFile || staticPeople.yunus}
              width={300}
              height={300}
              alt="desc image"
              className="h-36 w-36 rounded-full"
            />

            <label
              htmlFor="logo"
              className="absolute bottom-2 right-10 cursor-pointer"
              title="Choose logo"
            >
              <FcCamera size={30} />
              <input
                id="logo"
                hidden
                type="file"
                onChange={handleImageSelection}
                name="image"
                className=""
              />
            </label>
          </div>

          <div className="flex gap-2 justify-center flex-col items-center">
            <p className="font-light">Owner name</p>
            <input
              type="text"
              onChange={OnChangeSponsor}
              name="ownerName"
              required
              value={formData.ownerName}
              className="border w-64 px-1 rounded font-semibold"
            />
          </div>

          <div className="flex gap-2 justify-center flex-col items-center">
            <p className="font-light">Business name</p>
            <input
              type="text"
              onChange={OnChangeSponsor}
              name="businessName"
              value={formData.businessName}
              required
              className="border w-64 px-1 rounded font-semibold"
            />
          </div>
          <div className="flex gap-2 justify-center flex-col items-center">
            <p className="font-light">Business description</p>
            <input
              type="text"
              onChange={OnChangeSponsor}
              name="businessDescription"
              value={formData.businessDescription}
              required
              className="border w-64 px-1 rounded font-semibold"
            />
          </div>

          <div className="flex gap-2 justify-center flex-col items-center">
            <p className="font-light">Phone</p>
            <input
              type="tel"
              onChange={OnChangeSponsor}
              name="phone"
              required
              value={formData.phone}
              className="border w-64 px-1 rounded font-semibold"
            />
          </div>

          <FormSubmitBtn
            waiting={waiting}
            disabled={waiting}
            waitingText={"Saving sponsor..."}
            primaryText={"Submit"}
            className="primary__btn py-1 my-3 w-fit px-10 m-auto"
          />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

const dataModel = {
  ownerName: "",
  phone: "",
  logo: "",
  businessName: "",
  businessDescription: "",
};
