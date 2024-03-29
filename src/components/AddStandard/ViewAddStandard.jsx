import {
  Box,
  Flex,
  Heading,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect } from "react";
import { useFormState } from "react-final-form";
import ConfirmActionModal from "../Modals/ConfirmActionModal";
import {
  BackButton,
  SectionHeading,
  SubHeading,
  SubmitButton,
  SubText,
} from "./utils";

const ViewAddStandard = ({ handleSubmit }) => {
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
    <Box w="60%">
      <Heading color="Grey" fontSize="28px">
        Review
      </Heading>

      <SectionHeading text="General Information" />

      <SubHeading text="Title of Standard" />

      <SubText text={values.title} />

      <SubHeading text="Standard Criteria" />

      <SubText text={values.standardCriteria} />

      {values.uploadImages && values.uploadImages.length > 0 && (
        <Wrap mt={6} mb={4} spacing={4}>
          {Array.from(values.uploadImages).map((img, idx) => {
            const imageUrl = URL.createObjectURL(img);
            // use for testing (placeholder)
            // const imageUrl =
            //   "https://user-images.githubusercontent.com/69729390/214123449-126291c9-2cde-4773-90b7-a54a38336553.png";
            return (
              <VStack key={idx}>
                <Heading size="xs" color="Grey" fontWeight="semibold" mb={1}>
                  {img.name}
                </Heading>
                <Image
                  src={imageUrl}
                  objectFit="cover"
                  height={125}
                  width={125}
                  alt="construction image"
                />
              </VStack>
            );
          })}
        </Wrap>
      )}

      <SectionHeading text="Classification" />

      <SubHeading text="Building Type" />

      {values.buildingType.map((b, idx) => (
        <SubText key={idx} text={b} />
      ))}

      <SubHeading text="Primary Category" />

      {values.primaryCategory.map((p, idx) => (
        <SubText key={idx} text={p} />
      ))}

      {values.tagArray && values.tagArray.length > 0 && (
        <Box>
          <SectionHeading text="Tags" />

          {values.tagArray.sort().map((tag, idx) => (
            <SubText
              key={idx}
              text={tag}
              styles={{ textTransform: "capitalize" }}
            />
          ))}
        </Box>
      )}
      <Flex w="full" justifyContent="right" my={8}>
        <BackButton />
        <SubmitButton onOpen={onOpenSubmitModal} />
        <ConfirmActionModal
          isOpen={isOpenSubmitModal}
          onClose={onCloseSubmitModal}
          mainText="Are you sure you want to add this standard to the digital library?"
          confirmButtonText="Yes, add standard"
          cancelButtonText="No, return to edit"
          handleAction={handleSubmit}
        />
      </Flex>
    </Box>
  );
};

export default ViewAddStandard;
