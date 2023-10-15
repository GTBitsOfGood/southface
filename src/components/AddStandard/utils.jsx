import { Button, Heading, Text } from "@chakra-ui/react";
import { useForm } from "react-final-form";

export const SubmitButton = ({ onOpen, label }) => (
  <Button variant="Blue" size="sm" fontSize="md" width="auto" onClick={onOpen}>
    {label ? label : "Add to Digital Library"}
  </Button>
);

export const BackButton = () => {
  const { mutators } = useForm();
  return (
    <Button
      variant="Grey-outlined"
      size="sm"
      mr={2}
      fontSize="md"
      width="auto"
      onClick={() => mutators.setValue("isEditing", true)}
    >
      Back
    </Button>
  );
};

export const SectionHeading = ({ text }) => (
  <Heading color="Grey" fontSize="22px" mt={6} mb={2}>
    {text}
  </Heading>
);

export const SubHeading = ({ text }) => (
  <Heading color="#8C8C8C" fontSize="16px" my={2}>
    {text}
  </Heading>
);

export const SubText = ({ text, styles }) => (
  <Text color="Grey" {...styles}>
    {" "}
    {text}{" "}
  </Text>
);
