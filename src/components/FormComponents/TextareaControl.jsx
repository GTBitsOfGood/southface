import { FormLabel, HStack, Textarea } from "@chakra-ui/react";
import { Field } from "react-final-form";
import Control from "./Control";
import Error from "./Error";

const AdaptedTextarea = ({ input, meta, ...rest }) => (
  <Textarea {...input} {...rest} isInvalid={meta.error && meta.touched} />
);

const TextareaControl = ({ name, label }) => (
  <Control name={name} my={4}>
    <HStack>
      <FormLabel htmlFor={name} m={0} color="#6D6E70">
        {label}
      </FormLabel>
      <Error name={name} />
    </HStack>
    <Field name={name} component={AdaptedTextarea} id={name} />
  </Control>
);

export default TextareaControl;
