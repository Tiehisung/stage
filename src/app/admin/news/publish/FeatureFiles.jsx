"use client";

import FilesPicker from "@/components/FilesPicker";
import { ClickButton } from "@/components/buttons/formBtn";
import { DisplayFileRemote } from "@/components/files/FilesDisplay";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NewsFeatureFiles({ setFeatureFiles }) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState(false);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [nowUploading, setNowUploading] = useState(null);
  const [hiddenAfterUpload, setHiddenAfterUpload] = useState([]);

  //Handle submit
  const handleUpload = async (e) => {
    e.preventDefault();
    setWaiting(true);
    setUploadedFiles([]);
    try {
      let uploaded = [];
      for (let file of convertedFiles) {
        setNowUploading(file);
        const response = await fetch(baseUrl() + "/api/files/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-cache",
          body: JSON.stringify({
            fileName: file.name,
            filePath: file.path,
            fileType: file.type,
            preset: "konjiehifc-preset",
            folder: "news/" + new Date().getFullYear(),
            presetType: "authenticated",
          }),
        });
        const result = await response.json();

        if (result.success) {
          uploaded.push(result.data);
          setUploadedFiles((prev) => [...prev, result.data]);
          setHiddenAfterUpload((p) => [...p, file]);
        }
      }
      setFeatureFiles(uploaded);
      //Clear files
      setConvertedFiles([]);

      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };
  return (
    <div className=" space-y-3 shadow rounded-md p-2 mb-9 ">
      <h1 className="__h2">Feature file(s)</h1>
      <FilesPicker
        convertedFiles={convertedFiles}
        setConvertedFiles={setConvertedFiles}
        contStyles={"bg-transparent"}
        hiddenFilesAfterUpload={hiddenAfterUpload}
        nowUploading={nowUploading}
        fileStyles={"w-auto max-h-60 hover:ring-1"}
      />
      {uploadedFiles?.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {uploadedFiles.map((file, index) => (
            <DisplayFileRemote
              file={file}
              key={index}
              h={100}
              w={100}
              fileStyle=" w-20 h-20"
            />
          ))}
        </div>
      )}

      {convertedFiles?.length > 0 && (
        <ClickButton
          handleClickEvent={handleUpload}
          waiting={waiting}
          waitingText={"Uploading, wait..."}
          disabled={waiting}
          primaryText={"Upload"}
          styles={`primary__btn px-12 h-10 py-1 w-fit`}
        />
      )}
    </div>
  );
}
