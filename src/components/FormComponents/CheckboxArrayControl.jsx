import { Checkbox, FormLabel } from "@chakra-ui/react";
import { useField } from "react-final-form";

const CheckboxArrayControl = ({ name, value, children, style }) => {
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
      style={style}
    >
      <FormLabel htmlFor={name} m={0} fontSize={style?.fontSize || "md"}>
        {children}
      </FormLabel>
    </Checkbox>
  );
};

export default CheckboxArrayControl;
