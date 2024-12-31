"use client";

import { ClickButton } from "@/components/buttons/formBtn";
import Image from "next/image";
import playerImage from "@/public/images/breakfast2.jpg";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";

export default function MatchToday({ fixtures }) {
  const router = useRouter();
  const [waiting, setWaiting] = useState({
    start: false,
    cancel: false,
    finish: false,
  });

  const date = new Date().toISOString();
  const todayDate = date.substring(0, 10);
  const todayFixture = fixtures.find((fixture) => fixture.date == todayDate);
  const [formData, setFormData] = useState({
    host: todayFixture?.host,
    visitors: todayFixture?.visitors,
    date: todayFixture?.date,
    hostScore: 0,
    visitorsScore: 0,
    fixtureId: todayFixture?._id,
  });
  if (!todayFixture) return; //Return if not found

  //Finish up a match
  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting({ ...waiting, finish: true });
    const response = await fetch(baseUrl() + "/api/match-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      cache: "no-cache",
    });
    const results = await response.json();
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting({ ...waiting, finish: false });

    router.refresh();
  };

  const OnChangeScore = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <table className="flex-1 w-fit">
        <caption className="text-2xl font-semibold text-green-700">
          Today&apos;s match
        </caption>
        <tbody>
          <tr className="border p-2 rounded-md flex w-fit bg-gray-300">
            <td className="flex items-center text-center text-3xl">
              <Image
                src={playerImage}
                width={100}
                height={100}
                alt="desc image"
                className="w-12 h-12"
              />
              <span> {todayFixture?.host} </span>
            </td>
            <td className="flex gap-1 items-center px-3 text-2xl ">
              <input
                type="number"
                name="hostScore"
                onChange={OnChangeScore}
                value={formData.hostScore}
                className="w-12 h-8 bg-gray-100 text-center"
                min={0}
              />
              <input
                min={0}
                type="number"
                value={formData.visitorsScore}
                onChange={OnChangeScore}
                name="visitorsScore"
                className="w-12 h-8 bg-gray-50  text-center"
              />
            </td>
            <td className="flex items-center text-center text-3xl">
              <span>{todayFixture?.visitors}</span>
              <Image
                src={playerImage}
                width={100}
                height={100}
                alt="desc image"
                className="w-12 h-12"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex gap-2 justify-between">
        <ClickButton
          primaryText={"Start"}
          waiting={waiting.start}
          disabled={waiting.start}
          waitingText="Starting match..."
          styles="text-[green]"
        />
        <ClickButton
          primaryText={"Cancel"}
          waiting={waiting.cancel}
          disabled={waiting.cancel}
          waitingText="Canceling match..."
          styles="text-[red]"
        />
        <ClickButton
          primaryText={"Finish"}
          waiting={waiting.finish}
          disabled={waiting.finish}
          waitingText="Saving match..."
          handleClickEvent={handleSubmit}
          styles="text-[blue]"
        />
      </div>
      <ToastContainer />
    </div>
  );
}
