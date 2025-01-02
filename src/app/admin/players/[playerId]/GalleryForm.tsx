"use client";

import { IPlayer } from "@/app/players/page";
import FilesPicker from "@/components/FilesPicker";
import { ProgressBarCp } from "@/components/ProgresssBar";
import FormSubmitBtn from "@/components/buttons/SubmitAndClick";
import { DisplayFileRemote } from "@/components/files/FilesDisplay";
import { TextArea } from "@/components/input/Inputs";
import { getErrorMessage } from "@/lib";
import { apiConfig, baseUrl } from "@/lib/configs";
import { IFileUpload, TConvertedFile } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UpdatePlayerGallery({
  player,
  preset = "konjiehifc-preset",
  folder = "players/" + new Date().getFullYear(),
  presetType = "authenticated",
}: {
  player: IPlayer;
  preset?: string;
  folder?: string;
  presetType?: string;
}) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [convertedFiles, setConvertedFiles] = useState<TConvertedFile[]>([]);
  const [hiddenAfterUpload, setHiddenAfterUpload] = useState<TConvertedFile[]>(
    []
  );
  const [filesDescription, setFilesDescription] = useState("");
  const [progressValue, setProgressValue] = useState(0);
  const [nowUploading, setNowUploading] = useState<TConvertedFile | null>(null);
  //Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);
    try {
      //Upload files individually
      let uploaded = [];
      for (let file of convertedFiles) {
        setNowUploading(file);
        const body: IFileUpload = {
          name: file.name,
          path: file.path,
          type: file.type,
          folder: `players/gallery/${player.firstName}_${player.lastName}-${player._id}`, //Player gallery folder
        };
        const response = await fetch(apiConfig.fileUpload, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-cache",
          body: JSON.stringify(body),
        });
        const result = await response.json();

        if (result.success) {
          uploaded.push(result.data);
          setHiddenAfterUpload((p) => [...p, file]);
        }
        setProgressValue((p) => p + 1); //Watch progress
      }

      //Clear files
      setConvertedFiles([]);
      //Save to db
      const response = await fetch(
        `${apiConfig.players}/${player._id}/gallery`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-cache",
          body: JSON.stringify({
            files: uploaded,
            description: filesDescription,
          }),
        }
      );
      const result = await response.json();

      toast(result.message, { type: result.success ? "success" : "error" });
      if (result.success) {
        setFilesDescription("");
        setProgressValue(0);
      }
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-3 ">
      <div className={`border p-2 justify-center items-center`}>
        <FilesPicker
          wrapperStyles={""}
          fileStyles={"w-40 h-40"}
          setConvertedFiles={setConvertedFiles}
          convertedFiles={convertedFiles}
          hiddenFilesAfterUpload={hiddenAfterUpload}
          nowUploading={nowUploading}
        />

        <TextArea
          label="Description(optional)"
          labelStyles="_label"
          name="filesDescription"
          value={filesDescription}
          onChange={(e) => setFilesDescription(e.target.value)}
          wrapperStyles="mt-5"
        />

        <FormSubmitBtn
          primaryText={
            convertedFiles?.length == 1
              ? "Upload file"
              : "Upload " + convertedFiles?.length + " files"
          }
          className={`primary__btn px-4 py-2 my-4 rounded shadow`}
          waiting={waiting}
          disabled={waiting || convertedFiles?.length == 0}
          waitingText={"Uploading, wait..."}
        />
      </div>

      <ProgressBarCp
        taskLabel="Uploading "
        allowText={true}
        progressValue={progressValue}
        maxValue={convertedFiles?.length}
        showProgress={waiting}
        wrapperStyle={`relative ${convertedFiles.length == 0 && "hidden"}`}
        type={3}
      />
    </form>
  );
}

export function PlayerGalleriesAdm({ player }: { player: IPlayer }) {
  const galleries = player?.galleries?.sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return (
    <div className="grid gap-5 items-center justify-evenly p-2 max-h-[70vh] overflow-y-auto">
      {galleries?.map((galleryObj, index) => (
        <div key={index} className="grid">
          <h6 className="text-sm flex items-baseline justify-between">
            <span className="w-40 truncate "> {galleryObj.description}</span>

            <cite className="text-xs text-gray-500">
              {galleryObj?.date?.substring(0, 10) || new Date().toDateString()}
            </cite>
          </h6>
          <div className="flex flex-wrap gap-2 ">
            {galleryObj.files.map((gfile, fgIndex) => (
              <DisplayFileRemote
                file={gfile}
                key={fgIndex}
                wrapperStyle="h-40 w-40 overflow-hidden rounded hover:opacity-75 hover:ring hover:scale-95 transition-transform"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
