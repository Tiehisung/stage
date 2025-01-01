import React from "react";
import { NewTeamForm } from "./CreateOrUpdateTeam";
import DisplayTeams from "./DisplayTeams";

const TeamsFeature = () => {
  return (
    <div>
      <ul>
        {/* Create */}
        <NewTeamForm />

        {/* Display */}
        <DisplayTeams />
      </ul>
    </div>
  );
};

export default TeamsFeature;
