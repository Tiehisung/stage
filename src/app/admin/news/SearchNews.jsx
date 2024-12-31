"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchNewsAdm({}) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchString, setSearchString] = useState("");
  const [filter, setFilter] = useState("all");

  const handleOnChange = (e) => {
    const input = e.target.value;
    setSearchString(input);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("n_query", input.toLowerCase());
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname);
  };

  function handleChangeFilter(e) {
    setFilter(e.target.value);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("n_filter", e.target.value.toLowerCase());
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname);
  }
  return (
    <div
      className={` flex-wrap gap-2 grow sticky top-1 z-[1] bg-slate-200 ${
        pathname.includes("/publish") ? "hidden" : "flex"
      }`}
    >
      <div className="flex items-center grow mx-3 relative group">
        <textarea
          placeholder={"Search " + filter + " news"}
          onChange={handleOnChange}
          value={searchString}
          className="grow px-2 pr-7 pt-3 text-center outline-primaryGreen rounded-full shadow"
          style={{ resize: "none" }}
        />
        <button
          onClick={() => setSearchString("")}
          className="absolute right-1 top-1 z-[1] text-primaryGreen text-4xl h-full hidden group-focus-within:flex pt-1"
        >
          &times;
        </button>
      </div>

      <div className="grid text-gray-700 h-8 ">
        <span className="text-sm">Filter by:</span>
        <select
          onChange={handleChangeFilter}
          className="focus:outline-primaryGreen bg-transparent outline-none focus:ring ring-primaryGreen text-black"
        >
          <option value="">All</option>
          <option value="latest">Latest</option>
          <option value="trending">Trending</option>
        </select>
      </div>
    </div>
  );
}
