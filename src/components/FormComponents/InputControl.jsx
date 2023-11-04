import { FormLabel, HStack, Input } from "@chakra-ui/react";
import { useField } from "react-final-form";
import Control from "./Control";
import Error from "./Error";

const InputControl = ({ name, label, type, ...props }) => {
  const { input, meta } = useField(name);
  return (
    <Control name={name}>
      <HStack>
        <FormLabel
          htmlFor={name}
          m={0}
          color="Grey"
          fontFamily="'Europa-Regular', sans-serif"
        >
          {label}
        </FormLabel>
        <Error name={name} />
      </HStack>
      <Input
        {...props}
        {...input}
        color="Grey"
        isInvalid={meta.error && meta.touched}
        id={name}
        type={type}
        fontFamily="'Europa-Regular', sans-serif"
      />
    </Control>
  );
};

export default InputControl;
