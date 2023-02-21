import { Box, Button } from "@chakra-ui/react";

import { MdExpand } from "react-icons/md";

import Image from "next/image";

const ModalImage = ({
  // isEditing,
  image,
  // currentImageIndex,
  // setImages,
  openImagePreviewCallback,
  ...props
}) => {
  // const {
  //   isOpen: editImageIsOpen,
  //   onOpen: editImageOnOpen,
  //   onClose: editImageOnClose,
  // } = useDisclosure();

  // const onDeleteImage = () => {
  //   setImages((images) => {
  //     return images.filter((_, index) => index !== currentImageIndex);
  //   });
  // };

  return (
    <Box position="relative" width="250px" {...props}>
      <Box boxShadow="lg" margin="0 5px 7px 0px">
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
        bottom="15px"
        borderRadius="30px"
        right="10px"
        height={7}
        backgroundColor="#FFFFFF"
        color="#6D6E70"
        boxShadow="xl"
        onClick={openImagePreviewCallback}
      >
        Enlarge Image
      </Button>
      {/* {isEditing && (
        <Flex justifyContent="center" gap={2} m={2}>
          <IconButton
            icon={<EditIcon />}
            boxShadow="base"
            onClick={editImageOnOpen}
          />
          <IconButton
            icon={<DeleteIcon />}
            boxShadow="base"
            onClick={onDeleteImage}
          />
          <ModifyImageModal
            isOpen={editImageIsOpen}
            onClose={editImageOnClose}
            isAdd={false}
            currentImageIndex={currentImageIndex}
            imageProp={image}
            setImages={setImages}
          />
        </Flex>
      )} */}
    </Box>
  );
};

export default ModalImage;
