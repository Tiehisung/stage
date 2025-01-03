"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcCamera } from "react-icons/fc";
import { baseUrl } from "@/lib/configs";
import { toast } from "react-toastify";
import { getFilePath } from "@/lib";
import FormSubmitBtn from "@/components/buttons/SubmitAndClick";
import { IFileUpload } from "@/types";

interface DonateToSponsorProps {
  sponsorId: string;
  businessName: string;
}

export default function DonateToSponsor({ sponsorId, businessName }: DonateToSponsorProps) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({
    item: "",
    date: "",
    description: "",
    files: [],
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [attachedFiles, setAttachedFiles] = useState<IFileUpload[]>([]);
  async function handleImageSelection(event: React.ChangeEvent<HTMLInputElement>) {
    let selectedFiles = event.target.files;

    if (!selectedFiles || selectedFiles.length == 0) return;
    for (let file of Array.from(selectedFiles)) {
      if (file.size > 1024000) {
        toast.error(file.size + " is too large. Picture should not exceed 1mb");
        return;
      }
const path =await getFilePath(file)
      setAttachedFiles((prev) => [
        ...prev,
        {
          name: file.name,
          path: path,
          type: "image",
          folder: "sponsors/donations/" + businessName,
        },
      ]);
       
    }
  }

  //   Submit to donate

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);

    //Upload attachment
    if (attachedFiles.length > 0) {
      const uploadsResponse = await fetch(
        baseUrl() + "/api/files/upload/multiple",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(attachedFiles),
        }
      );
      const uploaded = await uploadsResponse.json();
      if (!uploaded.success) {
        setWaiting(false);
        toast(uploaded.message, { position: "bottom-center" });
        return;
      }

      //Proceed to database
      const response = await fetch(baseUrl() + "/api/sponsors/donations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sponsorId,
          files: uploaded.files, //files
        }),
        cache: "no-cache",
      });
      const results = await response.json();
      // console.log(results);
      toast(results.message, {
        type: results.success ? "success" : "error",
        position: "bottom-center",
      });
      setWaiting(false);

      if (results.success) {
        setFormData({ item: "", date: "", description: "", files: [] });
        setAttachedFiles([]);
      }
      router.refresh();
      return;
    }

    //Proceed Without logo

    const response = await fetch(baseUrl() + "/api/sponsors/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      cache: "no-store",
    });
    const results = await response.json();
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting(false);

    if (results.success) {
      setFormData({ item: "", date: "", description: "", files: [] });
      setAttachedFiles([]);
    }
    router.refresh();
    router.refresh();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className=" relative flex flex-col gap-3 justify-center items-center"
    >
      <div>
        <p>Item</p>
        <input
          required
          type="text"
          value={formData.item}
          name="item"
          onChange={handleOnChange}
          className="px-2 py-1 min-w-60 rounded outline-blue-700 border font-semibold text-sm"
        />
      </div>
      <div className="">
        <p>Date</p>
        <input
          required
          type="date"
          value={formData.date}
          name="date"
          onChange={handleOnChange}
          className="px-2 py-1 min-w-60 rounded outline-blue-700 border font-semibold text-sm"
        />
      </div>
      <div>
        <p>Description</p>
        <textarea
          placeholder="Optional"
          className="px-2 py-1 min-w-60 rounded outline-blue-700 border max-h-32 min-h-12 font-semibold text-sm"
          value={formData.description}
          name="description"
          onChange={handleOnChange}
        />
      </div>

      <div className="relative">
        <p className="">Attach files of items(Optional)</p>

        <label
          htmlFor="file"
          className="flex items-center shadow w-fit p-1 rounded mt-3 cursor-pointer"
          title="Choose file"
        >
          <FcCamera size={30} /> Choose file
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

      <div className="flex gap-2 max-w-sm flex-wrap justify-center">
        {attachedFiles
          ? attachedFiles.map((file, index) => (
              <Image
                src={file.path}
                width={300}
                height={300}
                alt="desc image"
                className="h-36 w-36 rounded shadow"
                key={index}
              />
            ))
          : "No files added"}
      </div>

      <br />
      <hr />
      <FormSubmitBtn
        primaryText="Submit"
        className={"primary__btn px-4 py-2 rounded shadow"}
        waiting={waiting}
        disabled={waiting}
        waitingText={"Submitting..."}
      />
    </form>
  );
}
