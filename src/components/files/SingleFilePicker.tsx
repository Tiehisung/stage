"use client";

import Image from "next/image";
import { FcMultipleCameras } from "react-icons/fc";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../buttons/SubmitAndClick";
import { fileToBase64, getErrorMessage, getFilePath } from "@/lib";
import { TConvertedFile } from "@/types/file";
import { toast } from "react-toastify";

export type TFilePicker = {
  fileStyles?: string;
  fileDisplayStyles?: string;
  className?: string;
  exportFile: (file: TConvertedFile | null) => void;
  pickerId: string;
  accept?: string;
  required?: boolean;
};

export default function SingleFilePicker({
  fileStyles,
  fileDisplayStyles,
  className,
  exportFile,
  pickerId = "input-file",
  accept = "image/*",
  required = true,
}: TFilePicker) {
  const [convertedFile, setConvertedFile] = useState<TConvertedFile | null>(
    null
  );
  //On file selection
  const handleFileSelection = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64String = await fileToBase64(file);
        setConvertedFile({
          path: base64String,
          name: file.name,
          type: file.type,
        });
      } catch (error) {
        console.error("Error converting file to base64:", error);
        toast.error(getErrorMessage(error, "Error converting file to base64"));
      }
    }
  };

  useEffect(() => {
    exportFile(convertedFile);
  }, [convertedFile]);
  return (
    <div className={`py-4 bg-secondaryGrey border p-4 ${className}`}>
      <section className="flex flex-wrap items-center gap-8 justify-between w-full">
        <label
          data-tip="Choose file"
          htmlFor={pickerId}
          className="flex gap-2 items-center shadow w-fit p-1 rounded cursor-pointer bg-secondaryGrey dark:bg-base-100 tooltip"
        >
          <FcMultipleCameras size={30} />
          <input
            id={pickerId}
            required={required}
            type="file"
            accept={accept ?? "image/*"}
            onChange={handleFileSelection}
            name="image"
            className={`max-w-52 text-sm invisible w-0 file:text-transparent `}
          />
        </label>
        {convertedFile && (
          <Button
            primaryText={"Remove file"}
            className="text-red-700 text-sm remove__btn"
            handleClickEvent={() => setConvertedFile(null)}
          />
        )}
      </section>

      <section
        className={`relative group  flex-wrap gap-2 p-2 pb-7 w-fit justify-start bg-white mt-6 ${
          !convertedFile ? "hidden" : "flex"
        }  ${fileDisplayStyles}`}
      >
        {convertedFile?.type?.includes("image") && (
          <Image
            src={convertedFile.path}
            width={400}
            height={400}
            className={`bg-gray-400 ${fileStyles}`}
            alt="filetoupload"
          />
        )}
        {convertedFile?.type?.includes("video") && (
          <video
            src={convertedFile.path}
            controls
            className={` ${fileStyles}`}
          />
        )}
        <h2 className="w-20 truncate text-xs font-light absolute bottom-0 pl-1 text-gray-950 bg-arshTrans">
          {convertedFile?.name}
        </h2>
      </section>
    </div>
  );
}
