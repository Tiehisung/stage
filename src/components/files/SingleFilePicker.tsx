"use client";

import Image from "next/image";
import { FcMultipleCameras } from "react-icons/fc";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../buttons/SubmitAndClick";
import { getFilePath } from "@/lib";

export type TFilePicker = {
  fileStyles?: string;
  fileDisplayStyles?: string;
  className?: string;
  exportFile: (file: File | null | undefined) => void;
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
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null
  );
  //On file selection
  const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    exportFile(selectedFile);
  }, [selectedFile]);
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
        {selectedFile && (
          <Button
            primaryText={"Remove file"}
            className="text-red-700 text-sm remove__btn"
            handleClickEvent={() => setSelectedFile(null)}
          />
        )}
      </section>

      <section
        className={`relative group  flex-wrap gap-2 p-2 pb-7 w-fit justify-start bg-white mt-6 ${
          !selectedFile ? "hidden" : "flex"
        }  ${fileDisplayStyles}`}
      >
        {selectedFile?.type?.includes("image") && (
          <Image
            src={getFilePath(selectedFile)}
            width={400}
            height={400}
            className={`bg-gray-400 ${fileStyles}`}
            alt="filetoupload"
          />
        )}
        {selectedFile?.type?.includes("video") && (
          <video
            src={getFilePath(selectedFile)}
            controls
            className={` ${fileStyles}`}
          />
        )}
        <h2 className="w-20 truncate text-xs font-light absolute bottom-0 pl-1 text-gray-950 bg-arshTrans">
          {selectedFile?.name}
        </h2>
      </section>
    </div>
  );
}
