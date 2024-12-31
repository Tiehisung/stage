"use client";

import { useRouter } from "next/navigation";

export default function FilterPlayers({}) {
  const router = useRouter();

  const handleOnChangeFilter = (e) => {
    const { value } = e.target;
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("p_filter", value.toLowerCase());
    const newPathname =
      window.location.pathname + "?" + searchParams.toString();
    router.push(newPathname);
  };
  return (
    <div className="flex items-center mb-3 justify-end">
      <p>Filter by:</p>
      <select
        className="focus:ring-2 ring-blue-300 outline-none rounded-md text-lg shadow-md p-2 bg-gray-700 text-white"
        onChange={handleOnChangeFilter}
      >
        <option value="fit">💪Fit players</option>
        <option value="yellow">🟨Yellow carded</option>
        <option value="red">🟥Red carded</option>
      </select>
    </div>
  );
}
