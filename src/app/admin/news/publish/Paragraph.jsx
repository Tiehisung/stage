"use client";

import { useEffect, useState } from "react";
import { BiFile, BiHeading, BiLink, BiText, BiX } from "react-icons/bi";
import ParagraphFile from "./ParagraphFile";
import { FaMinus } from "react-icons/fa";

export function Paragraph({
  paragraph = {
    phrases: [{ text: "", link: false, href: "" }],
    file: { resource_type: "", name: "", secure_url: "", description: "" },
    heading: { text: "", hasHeading: false },
  },
  setParagraphs,
  paragraphIndex,
}) {
  const [curParagraph, setCurParagraph] = useState(paragraph);
  const [toggleFileForm, setToggleFileForm] = useState(false);

  //Phrase text
  function handleChangePhraseText(phraseText, index) {
    setCurParagraph((p) => {
      let copyPhrases = p.phrases;

      copyPhrases[index].text = phraseText;
      return {
        ...p,
        phrases: copyPhrases,
      };
    });
  }

  //Href
  function handleChangePhraseHref(href, index) {
    setCurParagraph((p) => {
      let copyPhrases = p.phrases;

      copyPhrases[index].href = href;
      return {
        ...p,
        phrases: copyPhrases,
      };
    });
  }

  //Add phrase
  function handleAddPhrase(type) {
    if (type == "text") {
      setCurParagraph((prev) => {
        return {
          ...prev,
          phrases: [...prev.phrases, { text: "", link: false, href: "" }],
        };
      });
    } else if (type == "link") {
      setCurParagraph((prev) => ({
        ...prev,
        phrases: [...prev.phrases, { text: "", link: true, href: "" }],
      }));
    }
  }

  //Remove phrase
  function handleRemovePhrase(phraseIndex) {
    setCurParagraph((prev) => ({
      ...prev,
      phrases: [
        ...prev.phrases.filter((phrase, index) => index !== phraseIndex),
      ],
    }));
  }

  //Heading
  function handleAddHeading() {
    setCurParagraph((prev) => ({
      ...prev,
      heading: {
        ...prev.heading,
        hasHeading: !prev.heading.hasHeading,
      },
    }));
  }
  function handleOnChangeHeading(e) {
    setCurParagraph((prev) => ({
      ...prev,
      heading: { ...prev.heading, text: e.target.value },
    }));
  }

  function handleRemoveHeading() {
    setCurParagraph((prev) => ({
      ...prev,
      heading: { text: "", hasHeading: false },
    }));
  }

  //Delete paragraph
  function handleRemoveParagraph() {
    setParagraphs((prev) =>
      prev.filter((p, index) => index !== paragraphIndex)
    );
  }
  //update paragraphs
  useEffect(() => {
    setParagraphs((prev) => {
      let copy = prev;
      copy[paragraphIndex] = curParagraph;
      return copy;
    });
  }, [curParagraph]);

  return (
    <div className="pl-7 pr-6 grid my-5 transition-all duration-500">
      <div className="flex gap-3 items-center justify-between bg-neutral-700">
        <p className="text-lg text-white">
          P<span className="max-sm:hidden">aragraph</span> {paragraphIndex + 1}
        </p>
        <span className="flex gap-3 items-center">
          <button
            className="default__btn px-2 py-1 text-sm flex items-center"
            title="Add heading"
            onClick={handleAddHeading}
          >
            <BiHeading />
            <span className="max-sm:hidden">Heading</span>
          </button>
          <button
            className="default__btn px-2 py-1 text-sm flex items-center"
            title="Add text"
            onClick={() => handleAddPhrase("text")}
          >
            <BiText />
            <span className="max-sm:hidden">Text</span>
          </button>
          <button
            className="default__btn px-2 py-1 text-sm flex items-center"
            title="Add link"
            onClick={() => handleAddPhrase("link")}
          >
            <BiLink />
            <span className="max-sm:hidden">Link</span>
          </button>
          <button
            className="default__btn px-2 py-1 text-sm flex items-center"
            title="Add file"
            onClick={() => setToggleFileForm((prev) => !prev)}
          >
            <BiFile />
            <span className="max-sm:hidden">File</span>
          </button>
          <button
            className={`text-white hover:text-red-500 transition-all duration-300 px-2 py-1 text-lg flex items-center`}
            title="Remove paragraph"
            onClick={handleRemoveParagraph}
          >
            <BiX />
          </button>
        </span>
      </div>

      {/* Paragraph heading(opt) */}
      <div
        className={`group items-center gap-1 relative ${
          !curParagraph.heading.hasHeading ? "hidden" : "grid"
        }`}
      >
        <p>Heading</p>
        <textarea
          name=""
          className="bg-[#fbfbfb] p-2 ml-auto w-[98%] flex-1 border h-10 text-gray-700"
          value={curParagraph.heading.text}
          placeholder="Heading"
          onChange={handleOnChangeHeading}
        />
        <button
          className={`absolute -right-6 w-fit h-fit p-1 shadow hidden group-hover:flex text-red-600 items-center bg-red-50`}
          title="Remove heading"
          onClick={handleRemoveHeading}
        >
          <FaMinus />
        </button>
      </div>

      <br />

      {/* Phrases */}
      <div className="flex gap-8 max-w-[100%] flex-wrap">
        {curParagraph?.phrases?.map((phrase, index) => (
          <div
            key={index}
            className="flex gap-1 relative group w-fit max-sm:w-full"
          >
            <textarea
              name=""
              placeholder="Text only"
              className={`bg-[#fbfbfb] p-2 w-fit  max-sm:w-full max-w-full border ${
                phrase.link ? "hidden" : ""
              }`}
              value={phrase.text}
              onChange={(e) => handleChangePhraseText(e.target.value, index)}
            />
            <span
              className={`border items-center rounded flex-wrap  max-sm:w-full ${
                phrase.link ? "flex max-sm:grid " : "hidden"
              }`}
            >
              <input
                type="text"
                name=""
                value={phrase.text}
                placeholder="Link text"
                className="bg-[#fbfbfb] p-2 border text-blue-400 italic w-fit max-sm:w-full h-fit"
                onChange={(e) => handleChangePhraseText(e.target.value, index)}
              />
              <textarea
                name=""
                className="bg-[#fbfbfb] px-2 ml-auto w-fit max-sm:w-full h-fit flex-1 border max-h-12 text-gray-700"
                value={phrase.href}
                placeholder="[ Link url ]"
                onChange={(e) => handleChangePhraseHref(e.target.value, index)}
              />
            </span>

            <button
              className={`absolute -right-6 w-fit h-fit p-1 shadow hidden group-hover:flex text-red-600 items-center bg-red-50`}
              title={phrase.link ? "Remove link" : " Remove phrase"}
              onClick={() => handleRemovePhrase(index)}
            >
              <FaMinus />
            </button>
          </div>
        ))}
      </div>

      {toggleFileForm && (
        <ParagraphFile
          setCurParagraphFile={setCurParagraph}
          setToggleFileForm={setToggleFileForm}
          paragraphIndex={paragraphIndex}
        />
      )}
    </div>
  );
}
