import { FormControl } from "@chakra-ui/react";
import { useField } from "react-final-form";

const Control = ({ name, ...rest }) => {
  const {
    meta: { error, touched },
  } = useField(name, { subscription: { touched: true, error: true } });
  return <FormControl m={0} {...rest} isInvalid={error && touched} />;
};

export default Control;
