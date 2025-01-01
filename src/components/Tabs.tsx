"use client";

import { setSearchParams } from "@/lib/searchParams";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import Loader from "./Loader";

/**
 *
 * @param {*} labels The array of tab labels to toggle.
 * @param children ReactNodes to be iterated. Node of corresponding index with the label is rendered at a time.
 * @returns
 */
const TabbedComponents = ({
  labels,
  children,
  className,
  tabButtonStyles,
  footer,
  queryName = "tab", //Name to lookup for in the searchParams
}: {
  labels: string[];
  children: ReactNode[];
  wrapperStyles?: string;
  className?: string;
  tabButtonStyles?: string;
  footer?: ReactNode;
  queryName?: string;
}) => {
  const router = useRouter();
  const sp = useSearchParams();
  const [tabIndex, setTabIndex] = useState<number | null>(null);

  useEffect(() => {
    const tab = sp?.get(queryName);
    if (tab) setTabIndex(Number(tab));
  }, [sp]);

  const handleSetTab = (index: number) => {
    setSearchParams(queryName, String(index), router);
  };
  return (
    <div className="grid">
      <div className={`flex mb-4 font-light items-center ${className}`}>
        {labels.map((label, index) => (
          <button
            key={index}
            className={`grow pt-2 pb-1 px-2 capitalize relative slowTrans whitespace-nowrap ${
              tabIndex == index
                ? "bg-white cursor-default pointer-events-none text-teal-700 "
                : " text-black hover:bg-gray-300/40"
            } ${tabButtonStyles}`}
            onClick={() => handleSetTab(index)}
          >
            {label}
            <div
              className={` bg-gradient-to-r from-teal-300/35 via-teal-500 to-teal-700/40 absolute left-0 h-1 ${
                tabIndex == index
                  ? "bottom-0 right-0 text-Teal transition-all duration-200 ease-linear "
                  : "invisible right-full"
              }`}
            />
          </button>
        ))}
      </div>
      <div>
        {typeof tabIndex !== "number" ? <Loader /> : children[tabIndex]}
      </div>

      <footer className="my-12">{footer}</footer>
    </div>
  );
};

export default TabbedComponents;

interface ILinkTabProps {
  tabs: { path: string; label: ReactNode }[];
  replace?: boolean;
  wrapperStyles?: string;
  className?: string;
}
export const LinkTabs = ({
  tabs,
  replace = true,
  wrapperStyles,
  className = "",
}: ILinkTabProps) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname == path;
  return (
    <div
      className={`flex justify-center mb-4 font-light items-center ${wrapperStyles}`}
    >
      {tabs.map((tab, i) => (
        <Link
          replace={replace}
          key={i}
          href={tab.path}
          className={` py-1 px-2 text-black capitalize ${
            isActive(tab.path) ? "bg-white cursor-default" : ""
          } ${className}`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};
