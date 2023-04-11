import { Box, Divider, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useFormState } from "react-final-form";
import ConfirmActionModal from "../Modals/ConfirmActionModal";
import { BackButton, SubHeading, SubmitButton, SubText } from "./utils";

const CardPreview = ({ card, index }) => {
  return (
    <Box>
      <SubHeading text={`# ${index + 1}`} />

      <SubHeading text="Title of Standard" />

      <SubText text={card.title} />

      <SubHeading text="Standard Criteria" />

      <SubText text={card.criteria} />

      <SubHeading text="Building Type" />

      {card.buildingType.map((b, idx) => (
        <SubText key={idx} text={b} />
      ))}

      <SubHeading text="Primary Category" />

      {card.primaryCategory.map((p, idx) => (
        <SubText key={idx} text={p} />
      ))}

      {card.tags && card.tags.length > 0 && (
        <Box>
          <SubHeading text="Tags" />

          {card.tags.sort().map((tag, idx) => (
            <SubText
              key={idx}
              text={tag}
              styles={{ textTransform: "capitalize" }}
            />
          ))}
        </Box>
      )}

      <Divider my={3} borderColor="Grey" />
    </Box>
  );
};

const ViewAddManyStandards = ({ handleSubmit }) => {
  const { values } = useFormState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    isOpen: isOpenSubmitModal,
    onOpen: onOpenSubmitModal,
    onClose: onCloseSubmitModal,
  } = useDisclosure();

  return (
    <Box>
      <Heading color="Grey" fontSize="28px">
        Review
      </Heading>
      <Divider my={3} borderColor="Grey" />
      {values.massUpload.map((value, idx) => (
        <CardPreview key={idx} card={value} index={idx} />
      ))}
      <Flex w="full" justifyContent="right" my={8}>
        <BackButton />
        <SubmitButton onOpen={onOpenSubmitModal} />
        <ConfirmActionModal
          isOpen={isOpenSubmitModal}
          onClose={onCloseSubmitModal}
          mainText="Are you sure you want to add these standards to the digital library?"
          confirmButtonText="Yes, add standards"
          cancelButtonText="No, return to edit"
          handleAction={handleSubmit}
        />
      </Flex>
    </Box>
  );
};

export default ViewAddManyStandards;
