import { Button, Heading, Text } from "@chakra-ui/react";

export const SubmitButton = ({ onOpen, label }) => (
  <Button variant="Blue" size="sm" fontSize="md" width="auto" onClick={onOpen}>
    {label ? label : "Add to Digital Library"}
  </Button>
);

export const BackButton = ({ label, handleClick }) => {
  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="lg"
      pl="30px"
      pr="30px"
      color="#6D6E70"
      borderWidth="2px"
    >
      {label}
    </Button>
  );
};

export const ReviewButton = ({ isFormEmpty, label, handleClick }) => {
  return (
    <Button
      onClick={handleClick}
      variant="solid"
      size="lg"
      isDisabled={isFormEmpty ? true : false}
      pl="30px"
      pr="30px"
      bg={isFormEmpty ? "#8C8D8F" : "#00ACC8"}
      _hover={
        isFormEmpty
          ? {
              bgColor: "#8C8D8F",
            }
          : {}
      }
      style={{
        fontSize: "20px",
      }}
    >
      {label}
    </Button>
  );
};

export const SectionHeading = ({ text }) => (
  <Heading fontSize="xl" fontWeight="bold" color="#515254" m="16px 0 16px 0">
    {text}
  </Heading>
);

export const SubHeading = ({ text }) => (
  <Heading color="#787878" fontSize="20px" my={2}>
    {text}
  </Heading>
);

export const SubText = ({ text, styles }) => (
  <Text color="Grey" {...styles}>
    {" "}
    {text}{" "}
  </Text>
);
