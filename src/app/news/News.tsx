import { broadcasters } from "@/assets/broadcaster/broadcaster";
import { newsHeadlines } from "@/data/news";
import Image from "next/image";
import React from "react";

const LandingNewsHeadlines = () => {
  const casters = Object.values(broadcasters);
  return (
    <div>
      <h1 className="mb-4 text-lg md:text-xl px-1">News</h1>
      <div className="flex items-center gap-5 overflow-x-auto sm:hideScrollbar ">
        {newsHeadlines.map((headline, index) => (
          <div key={index} className="w-60 max-sm:grow">
            <Image
              src={headline.wallImage.secure_url!}
              width={400}
              height={400}
              alt={headline.text}
              className="h-44 w-full rounded-badge min-w-60"
            />
            <Image
              src={casters[index]! ?? casters[2]}
              width={100}
              height={100}
              alt={headline.text}
              className="h-5 w-auto object-contain my-2"
            />
            <p className="font-semibold line-clamp-2 h-11 text-gray-950 max-w-full">
              {headline.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingNewsHeadlines;


