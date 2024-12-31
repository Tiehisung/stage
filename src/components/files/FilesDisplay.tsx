"use client";

import Image from "next/image";
import { BsX } from "react-icons/bs";
import { Button } from "../buttons/SubmitAndClick";
import { useState } from "react";
import { TConvertedFile } from "@/types/file";
import { IFileProps } from "@/types/interface";

 

type DisplayFileProps = {
  file: TConvertedFile;
  fileStyle?: string;
  w?: number;
  h?: number;
  controls?: boolean;
  setFilterMeOut: (filterFn: (prev: any[]) => any[]) => void;
};

export default function DisplayFileLocal({
  file,
  fileStyle = "",
  w = 500,
  h = 500,
  controls = true,
  setFilterMeOut,
}: DisplayFileProps) {
  function handleRemoveThisFile() {
    if (typeof setFilterMeOut === "function") {
      setFilterMeOut((prev) => prev.filter((prevFile) => prevFile !== file));
    }
  }
  if (!file) return null;
  return (
    <div className="group relative">
      <Button
        className="hidden text-xl font-thin absolute top-1 right-1 group-hover:block bg-gray-50 z-[1]"
        handleClickEvent={handleRemoveThisFile}
      >
        <BsX />
      </Button>

      {file?.type?.includes("image") ? (
        <Image
          src={file.path}
          width={w}
          height={h}
          alt="image-file"
          className={` ${fileStyle}`}
        />
      ) : file?.type?.includes("video") || file?.type?.includes("audio") ? (
        <video
          src={file.path}
          controls={controls}
          className={` ${fileStyle} ${
            file.type == "audio" && "h-fit min-h-[40px] min-w-[150px] my-3"
          }`}
        />
      ) : (
        "Unsupported file format!"
      )}

      <span className="absolute top-0 left-0 bg-modalOverlay text-arsh px-1 text-xs max-w-[110px] truncate hover:max-w-full">
        {file.type.includes("video")
          ? "vid"
          : file.type.includes("audio")
          ? "aud | " + file.name
          : file.name}
      </span>
    </div>
  );
}
 

type RemoteFileDisplayProps = {
  file: IFileProps;
  fileStyle?: string;
  wrapperStyle?: string;
  w?: number;
  h?: number;
  controls?: boolean;
};

export function DisplayFileRemote({
  file,
  fileStyle = "",
  wrapperStyle = "",
  w = 500,
  h = 500,
  controls = true,
}: RemoteFileDisplayProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  if (!file) return null;
  return (
    <div className={"group relative shadow gap-3 bg-white " + wrapperStyle}>
      {file?.resource_type?.includes("image") ? (
        <Image
          src={file.secure_url}
          width={w}
          height={h}
          alt="image-file"
          className={`bg-arsh transition duration-[2s] ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }  ${fileStyle}`}
          onLoad={() => setImageLoaded(true)}
        />
      ) : file?.resource_type?.includes("video") ? (
        <video
          src={file.secure_url}
          controls={controls}
          className={` ${fileStyle}`}
        />
      ) : (
        <div
          className={`h-20 w-20 bg-cyan-300 rounded shadow-sm text-xs ${fileStyle}`}
        >
          Unsupported file type!
        </div>
      )}
      <span className="absolute top-0 left-0 bg-modalOverlay text-arsh px-1 text-xs max-w-[100px] truncate hover:max-w-full ">
        {file.resource_type.includes("video")
          ? "Media | " + (file.name || (file.public_id?.split("/").pop() ?? "unknown"))
          : ""}
      </span>
    </div>
  );
}
