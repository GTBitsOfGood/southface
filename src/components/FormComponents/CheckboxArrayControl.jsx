import { Checkbox } from "@chakra-ui/react";
import { useField } from "react-final-form";

const CheckboxArrayControl = ({ name, value, children }) => {
  const {
    input: { checked, ...input },
    meta: { error, touched },
  } = useField(name, {
    type: "checkbox",
    value,
  });
  return (
    <Checkbox
      {...input}
      isChecked={checked}
      isInvalid={error && touched}
      color="Grey"
    >
      {children}
    </Checkbox>
  );
};

export default CheckboxArrayControl;