import { Box, Checkbox } from "@chakra-ui/react";
import { useState } from "react";

const TagSelect = ({ tag }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleInputChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <Checkbox
        id={tag.id}
        color="Grey"
        w="100%"
        onChange={handleInputChange}
        checked={isChecked}
      >
        <Box
          textTransform="capitalize"
          fontSize={{ base: "0.8em", "2xl": "1em" }}
        >
          {tag.name}
        </Box>
      </Checkbox>
    </>
  );
};

export default TagSelect;
