"use client";

import { Button } from "@/components/buttons/SubmitAndClick";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import Loader from "./Loader";
import { getFilePath } from "@/lib";
import { ChangeEvent } from "react";

interface File {
  name: string;
  type: string;
  path: string;
}

interface FilesPickerProps {
  fileStyles?: string;
  wrapperStyles?: string;
  convertedFiles: File[];
  setConvertedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  hiddenFilesAfterUpload?: File[];
  nowUploading?: File | null;
}

export default function FilesPicker({
  fileStyles,
  wrapperStyles,
  convertedFiles,
  setConvertedFiles,
  hiddenFilesAfterUpload = [],
  nowUploading = null,
}: FilesPickerProps) {
  //On file selection
  const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      for (let file of Array.from(selectedFiles)) {
        setConvertedFiles((prev) => [
          ...prev,
          {
            name: file.name.substring(0, file.name.lastIndexOf(".")),
            type: file.type.split("/")[0],
            path: getFilePath(file),
          },
        ]);
      }
    }
  };

  return (
    <div className={`py-4 bg-arsh ${wrapperStyles}`}>
      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor="file"
          className="flex gap-2 items-center shadow w-fit p-1 rounded cursor-pointer bg-arshTrans"
          title="Choose file"
        >
          <input
            id="file"
            type="file"
            multiple
            onChange={handleFileSelection}
            name="image"
            className="max-w-52 text-sm"
          />
        </label>

        <Button
          primaryText={"Clear files"}
          className="text-red-700 text-sm remove__btn"
          handleClickEvent={() => setConvertedFiles([])}
        />
      </div>

      <section
        className={` flex-wrap gap-2 py-2 justify-center bg-white ${
          convertedFiles.length == 0 ? "hidden" : "flex"
        }  `}
      >
        {convertedFiles.map((file, index) => (
          <div
            key={index}
            hidden={hiddenFilesAfterUpload?.includes(file)}
            className={`relative group `}
          >
            <Button
              className="hidden group-hover:flex absolute right-1 top-1 bg-arshTrans font-semibold opacity-90 hover:opacity-100 secondary__btn p-1 shadow cursor-pointer z-10"
              title="Remove"
              handleClickEvent={() =>
                setConvertedFiles((prev) => prev.filter((fo) => fo !== file))
              }
              disabled={nowUploading == file}
            >
              <CgClose />
            </Button>

            {file.type.includes("image") && (
              <Image
                src={file.path}
                width={400}
                height={400}
                className={`bg-gray-400 ${fileStyles}`}
                alt="filetoupload"
              />
            )}
            {(file.type.includes("video") || file.type.includes("audio")) && (
              <video src={file.path} controls className={` ${fileStyles}`} />
            )}
            <h2 className="w-20 truncate text-xs font-light absolute bottom-0 pl-1 text-gray-950 bg-arshTrans">
              {file.name}
            </h2>
            <Loader
              className={`absolute text-sm text-teal-400 top-[20%] left-1/3 ${
                nowUploading !== file && "hidden"
              }`}
              iconStyles={"h-20 w-20"}
              message="Uploading..."
            />
          </div>
        ))}
      </section>
    </div>
  );
}
