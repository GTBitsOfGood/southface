import { FormErrorMessage } from "@chakra-ui/react";
import { useField } from "react-final-form";

const Error = ({ name }) => {
  const {
    meta: { error },
  } = useField(name, { subscription: { error: true } });
  return <FormErrorMessage>{error}</FormErrorMessage>;
};

export default Error;
