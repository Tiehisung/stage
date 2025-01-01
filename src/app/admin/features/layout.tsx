import { LinkTabs } from "@/components/Tabs";
import { Metadata } from "next";
import React, { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Features | KFC",
};
const FeaturesLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const tabs = [
    { label: "Goals", path: "/admin/features/goals" },
    { label: "Teams", path: "/admin/features/teams" },
  ];
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center p-2">Features</h1>
      <LinkTabs tabs={tabs} wrapperStyles="border-b" />

      <main>{children}</main>
    </div>
  );
};

export default FeaturesLayout;
