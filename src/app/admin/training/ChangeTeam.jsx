"use client";

import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChangePlayerTeam({ player }) {
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState(player.training.team);
  const handleOnChange = async (e) => {
    const { value } = e.target;
    setSelectedTeam(value);
    const response = await fetch(baseUrl() + "/api/players/" + player._id+"/training", {
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(value),
    });
    const result = await response.json();
    // console.log(result);
    router.refresh();
  };

  return (
    <div className="grid grid-cols-2">
      <span className="flex p-2 gap-1 justify-center">
        <p>A</p>
        <input
          type="radio"
          value={"a"}
          checked={selectedTeam == "a"}
          onChange={handleOnChange}
          name={player._id}
          className="w-7 h-7 grayscale-[.8] "
        />
      </span>
      <span className="flex p-2 gap-1 justify-center">
        <p>B</p>
        <input
          type="radio"
          onChange={handleOnChange}
          value={"b"}
          checked={selectedTeam == "b"}
          name={player._id}
          className="w-7 h-7 grayscale-[.8] "
        />
      </span>
    </div>
  );
}
