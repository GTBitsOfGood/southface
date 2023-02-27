import { Checkbox, Text } from "@chakra-ui/react";
import { useState } from "react";

const TagSelect = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <Checkbox
        iconColor="black"
        isChecked={isChecked}
        onChange={handleChange}
        w="100%"
      >
        <Text fontSize="xs">{props.name}</Text>
      </Checkbox>
    </>
  );
};

export default TagSelect;
