import React, { useCallback } from "react";

import { Box } from "@chakra-ui/react";

const Dot = ({ index, isActive = false, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(index);
  }, [index, onClick]);

  return (
    <Box
      display="flex"
      margin="0 0.3rem"
      cursor="pointer"
      onClick={handleClick}
    >
      <Box
        width="0.5rem"
        height="0.5rem"
        borderRadius="50%"
        border="1px solid white"
        background={isActive ? "white" : "none"}
      ></Box>
    </Box>
  );
};

export default Dot;
