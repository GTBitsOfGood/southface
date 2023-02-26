import { FormLabel, HStack, Input } from "@chakra-ui/react";
import { useField } from "react-final-form";
import Control from "./Control";
import Error from "./Error";

const InputControl = ({ name, label, type, ...props }) => {
  const { input, meta } = useField(name);
  return (
    <Control name={name}>
      <HStack>
        <FormLabel htmlFor={name} m={0} color="#6D6E70">
          {label}
        </FormLabel>
        <Error name={name} />
      </HStack>
      <Input
        {...props}
        {...input}
        isInvalid={meta.error && meta.touched}
        id={name}
        type={type}
      />
    </Control>
  );
};

export default InputControl;
