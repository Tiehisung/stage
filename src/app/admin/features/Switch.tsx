import TabbedComponents from "@/components/Tabs";
import React from "react";
import { GoalForms } from "./(goals)/Goals";
import TeamsFeature from "./(teams)/Teams";

const features = ["Goals", "Teams"];

const FeaturesSwitch = () => {
  return (
    <div>
      <TabbedComponents labels={features}>
        <GoalForms />
        <TeamsFeature />
      </TabbedComponents>
    </div>
  );
};

export default FeaturesSwitch;
