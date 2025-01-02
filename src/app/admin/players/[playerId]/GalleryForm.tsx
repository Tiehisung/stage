"use client";

import { IPlayer } from "@/app/players/page";
import FilesPicker from "@/components/FilesPicker";
import { ProgressBarCp } from "@/components/ProgresssBar";
import FormSubmitBtn from "@/components/buttons/SubmitAndClick";
import { DisplayFileRemote } from "@/components/files/FilesDisplay";
import { TextArea } from "@/components/input/Inputs";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import {
  IFileProps,
  IFileUpload,
  IGalleryProps,
  IResultProps,
  TConvertedFile,
} from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UpdatePlayerGallery({
  player,
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
      let uploadedFiles: IFileProps[] = [];
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

        const result: IResultProps<IFileProps> = await response.json();

        if (result.success && result.data) {
          uploadedFiles.push(result.data);
          setHiddenAfterUpload((p) => [...p, file]);
        }
        setProgressValue((p) => p + 1); //Watch progress
      }

      //Create gallery------------------------------------------
      const newGalleryResponse = await fetch(apiConfig.galleries, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify({
          description: filesDescription,
          files: uploadedFiles,
        }),
      });
      const savedNewGallery: IResultProps<IGalleryProps> =
        await newGalleryResponse.json();

        console.log({savedNewGallery})
      if (!savedNewGallery.success) return toast.error(savedNewGallery.message);
      //Clear files
      setConvertedFiles([]);

      //Save to db
      const response = await fetch(`${apiConfig.players}/${player?._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify({
          galleries: [savedNewGallery.data,...player.galleries, ],
        }),
      });
      const result = await response.json();
      console.log({ result });

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
    <div id="gallery">
      <p className=" mt-3 text-gray-600 text-lg font-semibold">
        Electric moments and scenes
      </p>

      <div className="bg-white rounded-xl space-y-6 w-full">
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

            {convertedFiles?.length > 0 && (
              <>
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
              </>
            )}
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
        <PlayerGalleriesAdm player={player} />
      </div>
    </div>
  );
}

export function PlayerGalleriesAdm({ player }: { player: IPlayer }) {
  const galleries = player?.galleries?.sort(
    (a, b) => b?.timestamp - a?.timestamp
  );
  console.log({ player });

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
            {galleryObj?.files?.map((gfile, fgIndex) => (
              <DisplayFileRemote
                file={gfile}
                key={fgIndex}
                wrapperStyle="h-40 w-40 overflow-hidden rounded hover:opacity-75 hover:ring hover:scale-95 transition-transform"
              />
            ))}
          </div>
        </div>
      ))}

      {galleries?.length == 0 && (
        <p className="text-center _label">No galleries available</p>
      )}
    </div>
  );
}
