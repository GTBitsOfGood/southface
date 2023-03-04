import { Box, Checkbox } from "@chakra-ui/react";
import { useState } from "react";

const TagSelect = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleInputChange = () => {
    setIsChecked(!isChecked);
    // if (!isChecked) {
    //   props.selectTag(e.target.id);
    // } else {
    //   props.deselectTag(e.target.id);
    // }
  };
  return (
    <>
      <Checkbox
        id={props.id}
        color="Grey"
        w="100%"
        onChange={handleInputChange}
        checked={isChecked}
      >
        <Box
          textTransform="capitalize"
          fontSize={{ base: "0.8em", "2xl": "1em" }}
        >
          {props.name}
        </Box>
      </Checkbox>
    </>
  );
};

export default TagSelect;
