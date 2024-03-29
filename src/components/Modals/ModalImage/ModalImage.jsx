import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import { MdExpand } from "react-icons/md";
import ConfirmActionModal from "../CardModal/ConfirmActionModal";

const ModalImage = ({
  image,
  index = 0,
  imageCount,
  move,
  openImagePreviewCallback,
  editing,
  handleDeleteImage,
  setCurrentImage = null,
  ...props
}) => {
  const { showEnlarge = true } = { ...props };
  const {
    isOpen: isDeleteImageOpen,
    onOpen: onDeleteImageOpen,
    onClose: onDeleteImageClose,
  } = useDisclosure();

  return (
    <>
      <Box position="relative" {...props}>
        <Box boxShadow="lg" margin="0 .3rem .5rem 0">
          <Image
            src={image}
            layout="responsive"
            width="100%"
            height="100%"
            objectFit="cover"
            alt={"card image"}
          />
          {editing ? (
            <Box display="flex" position="absolute" bottom="0" left="0">
              <Button
                textAlign="center"
                bg="blackAlpha.400"
                backdropFilter="auto"
                backdropBlur="1px"
                fontWeight="bold"
                onClick={() => move(-1)}
                isDisabled={index === 0}
              >
                {"<"}
              </Button>
              <Button
                textAlign="center"
                bg="blackAlpha.400"
                backdropFilter="auto"
                backdropBlur="1px"
                fontWeight="bold"
                onClick={() => move(1)}
                isDisabled={index === imageCount - 1}
              >
                {">"}
              </Button>
            </Box>
          ) : (
            <></>
          )}
        </Box>
        {editing ? (
          <Button
            position="absolute"
            top="-0.25rem"
            right="0rem"
            backgroundColor="#FFFFFF"
            color="#6D6E70"
            boxShadow="0 0 0.5rem #b3b3b3"
            size="xl"
            height="max"
            rounded="full"
            p="0.6rem"
            onClick={onDeleteImageOpen}
          >
            <CloseIcon h={3} w={3} />
          </Button>
        ) : (
          <></>
        )}
      </Box>
      {showEnlarge && (
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
          onClick={() => {
            if (setCurrentImage) {
              setCurrentImage(index);
            }
            openImagePreviewCallback();
          }}
        >
          Enlarge Image
        </Button>
      )}
      <ConfirmActionModal
        isOpen={isDeleteImageOpen}
        onClose={onDeleteImageClose}
        handleAction={() => {
          handleDeleteImage(image, onDeleteImageClose);
        }}
        prompt="Are you sure you want to delete this image?"
        subcontent={
          <Box>
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
