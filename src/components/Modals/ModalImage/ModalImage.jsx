import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import { MdExpand } from "react-icons/md";
import ConfirmActionsModal from "../CardModal/ConfirmActionModal";

const ModalImage = ({
  image,
  openImagePreviewCallback,
  editing,
  handleDeleteImage,
  isImageDeleteOpen,
  onImageDeleteClose,
  onImageDeleteOpen,
  ...props
}) => {
  const imagePath = new URL(image).pathname.split("/");
  const filename = imagePath[imagePath.length - 1];

  return (
    <>
      <Box position="relative" {...props}>
        <Box boxShadow="lg" margin="0 .3rem .5rem 0">
          <Image
            src={image}
            layout="responsive"
            width="100%"
            height="100%"
            alt={"card image"}
          />
        </Box>
        <Button
          leftIcon={<MdExpand />}
          position="absolute"
          bottom="1rem"
          borderRadius="1rem"
          right="1rem"
          height={7}
          backgroundColor="#FFFFFF"
          color="#6D6E70"
          boxShadow="xl"
          onClick={openImagePreviewCallback}
        >
          Enlarge Image
        </Button>
        {editing ? (
          <Button
            position="absolute"
            top="0.25rem"
            right="0rem"
            backgroundColor="#FFFFFF"
            color="#6D6E70"
            boxShadow="0 0 0.5rem #b3b3b3"
            size="xl"
            height="max"
            rounded="full"
            p="0.6rem"
            onClick={onImageDeleteOpen}
          >
            <CloseIcon h={3} w={3} />
          </Button>
        ) : (
          <></>
        )}
      </Box>
      <Button
        leftIcon={<MdExpand />}
        position="absolute"
        bottom="1rem"
        borderRadius="1rem"
        right="1rem"
        height={7}
        backgroundColor="#FFFFFF"
        color="Grey"
        boxShadow="xl"
        onClick={openImagePreviewCallback}
      >
        Enlarge Image
      </Button>
      <ConfirmActionsModal
        isOpen={isImageDeleteOpen}
        onClose={onImageDeleteClose}
        handleAction={() => {
          handleDeleteImage(image);
        }}
        prompt="Are you sure you want to delete this image?"
        subcontent={
          <Box>
            <Text fontSize="lg" color="gray.500">
              {filename}
            </Text>
            <Image
              src={image}
              width="100px"
              height="100px"
              alt={"card image"}
            />
            <Text>
              You will be unable to recover it after it has been deleted.
            </Text>
          </Box>
        }
        confirmActionText="Yes, delete image"
        abandonActionText="No, return to edit"
        colorScheme="red"
      />
    </>
  );
};

export default ModalImage;
