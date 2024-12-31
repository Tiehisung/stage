"use client";

import FormSubmitBtn from "@/components/buttons/formBtn";
import { baseUrl } from "@/lib/configs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcCamera } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";

export default function ParagraphFile({
  setCurParagraphFile,
  setToggleFileForm,
  paragraphIndex,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({ type: "", name: "", path: "" });
  const [waiting, setWaiting] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  //Handle change image
  function handleImageSelection(event) {
    let selectedFile = event.target.files[0];
    if (!selectedFile) return;
    setFormData({ type: selectedFile.type, name: selectedFile.name });
    if (selectedFile.size > 1024000) {
      toast.error(
        selectedFile.size + " is too large. Picture should not exceed 1mb"
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = function (loadEvt) {
      setFormData({
        path: loadEvt.target.result,
        name: file.name.substring(0, file.name.lastIndexOf(".")),
        type: file.type.split("/")[0],
      });
    };
    reader.readAsDataURL(selectedFile);
  }

  //Handle submit
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      setWaiting(true);
      if (!formData.path) return toast.warn("Please choose picture");
      //Upload image
      const upload = await fetch(baseUrl() + "/api/files/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: formData?.name,
          filePath: formData?.path,
          fileType: "image",
          preset: "konjiehifc-preset",
          folder: "news/" + new Date().getFullYear(),
          presetType: "authenticated",
        }),
      });
      const uploadRsp = await upload.json();
      if (uploadRsp.success) {
        setCurParagraphFile((prev) => ({ ...prev, file: uploadRsp.data }));
        toast.success(uploadRsp.message);
        setUploaded(true);
      }
    } catch (error) {
      toast.error("Not uploaded! " + error.message);
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };
  return (
    <div className="py-2 flex flex-col justify-center items-center border">
      <button onClick={() => setToggleFileForm(false)} className="ml-auto mr-2">
        &times;
      </button>
      <form
        onSubmit={handleUpload}
        className=" bg-white rounded-md p-2 flex items-center flex-wrap gap-3"
      >
        <div className=" flex flex-col gap-1 justify-center items-center">
          <Image
            src={formData?.path}
            width={300}
            height={300}
            hidden={!formData?.path}
            alt="desc image"
            className="h-36 w-auto rounded-sm"
          />
          <label
            htmlFor={paragraphIndex}
            className="flex items-center shadow w-fit p-1 rounded cursor-pointer text-xs"
            title="Choose file"
          >
            <FcCamera size={30} /> Choose files
            <input
              id={paragraphIndex}
              hidden
              type="file"
              onChange={handleImageSelection}
              name="image"
              className=""
            />
          </label>
        </div>
        {formData.path && (
          <FormSubmitBtn
            waiting={waiting}
            waitingText={"Uploading, wait..."}
            disabled={waiting || uploaded}
            primaryText={"Upload"}
            styles={`primary__btn px-12 h-10 py-1 w-fit`}
          />
        )}
      </form>
      <ToastContainer />
    </div>
  );
}
