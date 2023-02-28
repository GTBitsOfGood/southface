import { Box, Checkbox, FormControl } from "@chakra-ui/react";
import { useState } from "react";

const TagSelect = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleInputChange = (e) => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      props.selectTag(e.target.id);
    } else {
      props.deselectTag(e.target.id);
    }
  };
  return (
    <>
      <FormControl>
        <Checkbox
          id={props.id}
          color="Grey"
          w="100%"
          onChange={handleInputChange}
          checked={isChecked}
        >
          <Box>{props.name}</Box>
        </Checkbox>
      </FormControl>
    </>
  );
};

export default TagSelect;
