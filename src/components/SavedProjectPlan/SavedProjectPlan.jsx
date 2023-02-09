import { Box } from "@chakra-ui/react";
import React from "react";
import ProjectPlanCard from "./ProjectPlanCard";
const SavedProjectPlan = () => {
  return (
    <Box
      padding="10"
      borderRadius="25"
      borderWidth="0.5px"
      borderColor="lightgrey"
    >
      <ProjectPlanCard />
      <ProjectPlanCard />
      <ProjectPlanCard />
    </Box>
  );
};

export default SavedProjectPlan;
