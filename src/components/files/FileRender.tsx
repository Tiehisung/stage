'use client'

import { fileIcons, getFileTypeName } from "@/data/file";
import { IFileProps } from "@/types";
import Image from "next/image";

interface FileRendererProps {
  file: IFileProps;
  className?: string;
  localFile?:File
}

const FileRenderer: React.FC<FileRendererProps> = ({ file, className ,localFile}) => {

  const fileUrl =localFile? URL.createObjectURL(localFile):file.secure_url;
  const fileType=localFile?localFile.type:file.resource_type
  const fileName=localFile?localFile.name:file.name

  switch (getFileTypeName(fileType)) {
    case "image":
      return (
        <Image
          src={fileUrl}
          alt={fileName!}
          width={500}
          height={500}
          priority
          className={`max-w-full h-auto ${className}`}
        />
      );

    case "audio":
      return <audio src={fileUrl} controls className={`w-full ${className}`} />;
    case "video":
      return (
        <video
          src={fileUrl}
          controls
          className={`max-w-full h-auto ${className}`}
        />
      );
    case "pdf":
      return (
        <iframe
          src={fileUrl}
          title={fileName}
          className={`w-full h-64 ${className}`}
          frameBorder="0"
        />
      );

    case "unknown":
      return (
        <div
          className="text-sm text-Red tooltip flex gap-5 max-sm:flex-col justify-center items-center "
          data-tip={`Unsupported file type: ${fileName}`}
        >
          <span className="text-3xl">
            {fileIcons.find((fi) => fi.type == "unknown")?.icon}
          </span>{" "}
          Unsupported file type: {fileName}
        </div>
      );
    default:
      return (
        <div
          className={`text-3xl form-control justify-center items-center h-full ${className}`}
        >
          {
            fileIcons.find((item) => item.type == getFileTypeName(fileType))
              ?.icon
          }
        </div>
      );
  }
};

export default FileRenderer;
