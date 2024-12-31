"use client";

import { baseUrl } from "@/lib/configs";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { BiLink, BiText } from "react-icons/bi";
import { ClearButton, RemoveButton } from "../buttons/DelClearRemove";
import { CgCornerLeftDown, CgSpaceBetweenV } from "react-icons/cg";
import LinkedDataOutput from "./LinkedDataOutput";

export default function DataInputWithLink({}) {
  type DataType = {
    text?: string;
    link?: boolean;
    href?: string;
    linkText?: string;
    break?: boolean;
  };

  const [data, setData] = useState<DataType[]>([
    { text: "text only" },
    { link: true, href: baseUrl() + "/", linkText: "linked text" },
    { break: true },
  ]);

  //Add item
  const handleAdd = (type: string, targetIndex: number) => {
    switch (type) {
      case "link":
        setData((prev) => {
          const firstPart = prev.slice(0, targetIndex);
          const remainingPart = prev.slice(targetIndex);
          return [
            ...firstPart,
            { link: true, href: baseUrl() + "/", linkText: "" },
            ...remainingPart,
          ];
        });
        break;
      case "break":
        setData((prev) => {
          const firstPart = prev.slice(0, targetIndex);
          const remainingPart = prev.slice(targetIndex);
          return [...firstPart, { break: true }, ...remainingPart];
        });
        break;
      default:
        setData((prev) => {
          const firstPart = prev.slice(0, targetIndex);
          const remainingPart = prev.slice(targetIndex);
          return [...firstPart, { text: "" }, ...remainingPart];
        });
    }
  };

  //Remove item
  const handleRemove = (targetIndex: number) => {
    setData((prev) => prev.filter((ob) => prev.indexOf(ob) !== targetIndex));
  };

  //Add spacing
  const handleAddSpacebetween = (targetIndex: number | undefined) => {
    const firstPart = data.slice(0, targetIndex);
    const remainingPart = data.slice(targetIndex);
    setData([...firstPart, { break: true }, ...remainingPart]);
  };

  //Change href

  function handleChangeLinkUrl({
    href,
    targetIndex,
  }: {
    href: string;
    targetIndex: number;
  }) {
    setData((prev) =>
      prev.map((linkOb, index) =>
        targetIndex !== index ? linkOb : { ...linkOb, href: href }
      )
    );
  }
  //Change href-text
  function handleChangeLinkText({
    linkText,
    targetIndex,
  }: {
    linkText: string;
    targetIndex: number;
  }) {
    setData((prev) =>
      prev.map((linkOb, index) =>
        targetIndex !== index ? linkOb : { ...linkOb, linkText: linkText }
      )
    );
  }
  //Change Text only
  function handleChangeMainText({
    text,
    targetIndex,
  }: {
    text: string;
    targetIndex: number;
  }) {
    setData((prev) =>
      prev.map((textOnlyObj, index) =>
        targetIndex !== index ? textOnlyObj : { ...textOnlyObj, text: text }
      )
    );
  }
  return (
    <main className="grid md:grid-cols-2 gap-4 justify-between ">
      <div className="border p-2 bg-white  rounded-sm">
        <ol className="list-decimal space-y-5 max-h-[70vh] overflow-auto hidden__scrollbar py-6">
          {data.map((datObj, index) => (
            <li
              key={index}
              className="flex items-start group relative"
              title={String(index + 1)}
            >
              {datObj.href ? (
                <div className="flex">
                  [
                  <input
                    type="text"
                    onChange={(e) =>
                      handleChangeLinkUrl({
                        targetIndex: index,
                        href: e.target.value,
                      })
                    }
                    placeholder="href"
                    name=""
                    className="h-7 bg-arsh basic__input"
                    required
                    value={datObj.href}
                    title="href"
                  />
                  ] [
                  <input
                    type="text"
                    name=""
                    onChange={(e) =>
                      handleChangeLinkText({
                        targetIndex: index,
                        linkText: e.target.value,
                      })
                    }
                    className="h-7 bg-arsh basic__input"
                    placeholder="Text"
                    required
                    value={datObj.linkText}
                    title="link text"
                  />
                  ]
                </div>
              ) : datObj.break ? (
                <p className="border w-full ">
                  <span className="bg-red-300 p-2">BREAK</span>
                </p>
              ) : (
                <textarea
                  name=""
                  required
                  className="basic__textarea bg-gray-200"
                  value={datObj.text}
                  title="Text-only"
                  placeholder="Text only"
                  onChange={(e) =>
                    handleChangeMainText({
                      targetIndex: index,
                      text: e.target.value,
                    })
                  }
                />
              )}

              <div className="hidden group-hover:flex gap-1 absolute right-0 z-10 bottom-full ">
                <CgCornerLeftDown className="text-sm font-thin mt-3 text-green-400" />

                <div className="flex gap-1 p-1 bg-white rounded shadow-lg border ">
                  <RemoveButton
                    handleRemove={async () => handleRemove(index)}
                    buttonText=""
                    className="remove__btn invisible group-hover:visible"
                    title={
                      datObj.break
                        ? "Remove break"
                        : datObj.link
                        ? "Remove link"
                        : "Remove text"
                    }
                  />
                  <button
                    className="secondary__btn px-1"
                    title={"Add space after"}
                    onClick={() => handleAddSpacebetween(index + 1)}
                  >
                    <CgSpaceBetweenV />
                  </button>
                  <button
                    onClick={() => handleAdd("link", index + 1)}
                    className="secondary__btn px-1"
                    title={"Add link after"}
                  >
                    <BiLink />
                  </button>

                  <button
                    onClick={() => handleAdd("text-only", index + 1)}
                    className="secondary__btn px-1"
                    title={"Add text after"}
                  >
                    <BiText />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <br />
        <div className="flex gap-4 items-center rounded-sm shadow-sm w-full p-2 ">
          <hr className="grow" />
          <button
            className="secondary__btn px-1"
            title="Add break(space)"
            onClick={() => handleAddSpacebetween(data.length)}
          >
            <CgSpaceBetweenV />
          </button>
          <button
            onClick={() => handleAdd("link", data.length)}
            className="secondary__btn px-1"
            title="Add link"
          >
            <BiLink />
          </button>

          <button
            onClick={() => handleAdd("text-only", data.length)}
            className="secondary__btn px-1"
            title="Add text"
          >
            <BiText />
          </button>

          <ClearButton
            handleClear={async () => setData([])}
            className="secondary__btn px-1 text-red-700"
            iconStyle="remove__btn"
            buttonText=""
            title="Clear data"
            type={2}
          />
        </div>
      </div>
      <LinkedDataOutput importData={data} />
    </main>
  );
}

interface DataProps {
  data: {
    break: any;
    link: any;
    href: string;
    linkText: string;
    text: string;
  }[];
}

export function InputPreview({ data }: DataProps) {
  if (!data) return null;
  return (
    <p>
      {data.map((dataObject, index) =>
        dataObject.break ? (
          <br key={index} />
        ) : dataObject.link ? (
          <a
            href={dataObject.href}
            target={(dataObject.href ?? "").includes(baseUrl()) ? "" : "_blank"}
            className="px-1 rounded-sm text-blue-700 visited:text-pink-900 inline"
          >
            {dataObject.linkText}
          </a>
        ) : (
          dataObject.text
        )
      )}
    </p>
  );
}
