import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
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

  const [imageStyle, setImageStyle] = useState({});

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      if (img.width < 200) {
        // For images smaller than 200px wide, zoom to make a 200x200 square
        const scale = 200 / Math.min(img.width, img.height);
        setImageStyle({
          width: `${img.width * scale}px`,
          height: `${img.height * scale}px`,
          objectFit: 'none',
          objectPosition: 'center',
        });
      } else {
        // For larger images, maintain aspect ratio with a height of 200px
        const aspectRatio = img.width / img.height;
        setImageStyle({
          width: aspectRatio > 1 ? `${200 * aspectRatio}px` : '100%',
          height: '200px',
          objectFit: 'cover',
          objectPosition: 'center',
        });
      }
    };
    img.src = image;
  }, [image]);

  return (
    <>
      <Box position="relative" {...props}>
        <Box
          boxShadow="lg"
          margin="0 .3rem .5rem 0"
          height="200px"
          width="200px"
          overflow="hidden"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={image}
            style={{
              ...imageStyle,
              maxWidth: 'none',
              maxHeight: 'none',
            }}
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