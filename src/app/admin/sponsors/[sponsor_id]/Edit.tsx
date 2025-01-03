"use client";

import { apiConfig, baseUrl } from "@/lib/configs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { FcCamera } from "react-icons/fc";
import { toast } from "react-toastify";
import { ISponsorProps } from "@/app/sponsorship/page";
import { getFilePath } from "@/lib";
import { IResultProps } from "@/types";
import FormSubmitBtn from "@/components/buttons/SubmitAndClick";

export default function EditSponsor({ sponsor }: { sponsor: ISponsorProps }) {
  const router = useRouter();
  const [formData, setFormData] = useState(sponsor);
  const [imageFile, setImageFile] = useState<string | null>(null);

  const [waiting, setWaiting] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleImageSelection(event: ChangeEvent<HTMLInputElement>) {
    let selectedFile = event.target.files ? event.target.files[0] : null;
    if (!selectedFile) return;
    if (selectedFile.size > 3524000) {
      toast.error(" File too large. Picture should not exceed 3.5mb");
      return;
    }
    setImageFile(await getFilePath(selectedFile));
  }

  //Handle submit

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);

    if (imageFile) {
      //Upload logo
      const upload = await fetch(apiConfig.fileUpload , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.businessName,
          path: imageFile,
          type: "image",
          preset: "konjiehifc",
          folder: "sponsors/logos",
          presetType: "authenticated",
        }),
      });
      const uploadRsp: IResultProps = await upload.json();
      if (!uploadRsp.success) {
        setWaiting(false);
        toast(uploadRsp.message, { position: "bottom-center" });
        return;
      }

      //Proceed to database
      const response = await fetch(baseUrl() + "/api/sponsors", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, logo: uploadRsp.data }),
        cache: "no-cache",
      });
      const results: IResultProps = await response.json();
      toast(results.message, {
        type: results.success ? "success" : "error",
        position: "bottom-center",
      });
      setWaiting(false);
      if (results.success) {
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
    const results: IResultProps = await response.json();
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting(false);
    if (results.success) {
      setFormData(sponsor);
      setImageFile(null);
    }
    router.refresh();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-5 p-2"
    >
      <div className=" relative">
        <p className="font-light">Logo</p>
        <Image
          src={imageFile || sponsor.logo.secure_url }
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
      <div>
        <p className="font-light">Owner name</p>
        <input
          type="text"
          value={formData.ownerName}
          name="ownerName"
          onChange={handleOnChange}
          className="border px-2 py-1 outline-blue-600  font-semibold rounded"
        />
      </div>
      <div>
        <p className="font-light">Business name</p>
        <input
          type="text"
          value={formData.businessName}
          name="businessName"
          onChange={handleOnChange}
          className="border px-2 py-1 outline-blue-600  font-semibold rounded"
        />
      </div>
      <div>
        <p className="font-light">Business Description</p>
        <input
          type="text"
          value={formData.businessDescription || ""}
          name="businessDescription"
          onChange={handleOnChange}
          className="border px-2 py-1 outline-blue-600  font-semibold rounded"
        />
      </div>
      <div>
        <p className="font-light">Phone number</p>
        <input
          type="text"
          value={formData.phone}
          name="phone"
          onChange={handleOnChange}
          className="border px-2 py-1 outline-blue-600  font-semibold rounded"
        />
      </div>

      <FormSubmitBtn
        primaryText="Save changes"
        className={"primary__btn px-4 py-2 rounded shadow"}
        waiting={waiting}
        disabled={waiting}
        waitingText={"Saving changes..."}
      />
    </form>
  );
}
