"use client";

import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { ClickButton } from "@/components/buttons/formBtn";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/lib/configs";
import { NewsSource } from "./Source";
import { Paragraph } from "./Paragraph";
import NewsFeatureFiles from "./FeatureFiles";

export default function NewsCanvasCp() {
  const router = useRouter();
  const [source, setSource] = useState({
    link: false,
    text: "",
    href: "https://",
  });
  const [featureFiles, setFeatureFiles] = useState([]);
  const [headline, setHeadline] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const [waiting, setWaiting] = useState(false);

  function handleCreateParagraph() {
    setParagraphs((prev) => [
      ...prev,
      {
        heading: { text: "", hasHeading: false },
        phrases: [{ text: "", link: false, href: "https://" }],
        file: { resource_type: "", name: "", secure_url: "", description: "" },
      },
    ]);
  }

  async function handlePublishNews() {
    if (!source.text) return toast.warn("Source can not be empty");
    if (!headline) return toast.warn("Headline can not be empty");
    if (paragraphs?.length == 0)
      return toast.warn("Paragraphs can not be empty");
    try {
      setWaiting(true);
      const response = await fetch(baseUrl() + "/api/news", {
        body: JSON.stringify({ paragraphs, headline, source, featureFiles }),
        cache: "no-cache",
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      toast(result.message, { type: result.success ? "success" : "error" });
    } catch (error) {
      toast.error("Failed! " + error.message);
    } finally {
      setWaiting(false);
      router.refresh();
    }
  }
  return (
    <div className="px-[2vw] relative bg-white py-7">
      <NewsFeatureFiles setFeatureFiles={setFeatureFiles} />
      {/* Headline */}
      <div className="shadow p-2 rounded-md">
        <p className="__h2">Headline</p>
        <textarea
          name=""
          placeholder="Headline"
          className="w-full bg-[#fbfbfb] p-2"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
        />
      </div>
      <br />
      {/* Source */}
      <NewsSource source={source} setSource={setSource} />
      <br />
      {/* Paragraph */}
      <div className="flex gap-4 justify-between px-2 items-center py-3">
        <p className="__h2">Paragraphs</p>
        <button
          className="primary__btn px-2 py-1 text-sm flex items-center"
          title="Add paragraph"
          onClick={handleCreateParagraph}
        >
          <BiPlus />
          <span className="max-md:hidden">New paragraph</span>
        </button>
      </div>
      <div className="shadow p-2 rounded-md">
        {paragraphs?.map((paragraph, index) => (
          <Paragraph
            key={index}
            paragraph={paragraph}
            paragraphIndex={index}
            setParagraphs={setParagraphs}
          />
        ))}
      </div>

      <br />
      <ClickButton
        waiting={waiting}
        waitingText={"Publishing news, wait..."}
        disabled={
          waiting || !source.text || !headline || paragraphs?.length == 0
        }
        handleClickEvent={handlePublishNews}
        primaryText={"Publish news"}
        styles={`primary__btn px-12 h-10 py-1 w-fit`}
      />

      <ToastContainer />
    </div>
  );
}
