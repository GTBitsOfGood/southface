import React, { useCallback } from "react";

import { Box } from "@chakra-ui/react";

const Dot = ({ index, isActive = false, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(index);
  }, [index, onClick]);

  return (
    <Box display="flex" margin="0 5px" cursor="pointer" onClick={handleClick}>
      <Box
        style={{
          marginTop: "-50px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          border: "1px solid white",
          background: `${isActive ? "white" : "none"}`,
        }}
      ></Box>
    </Box>
  );
};

export default Dot;
