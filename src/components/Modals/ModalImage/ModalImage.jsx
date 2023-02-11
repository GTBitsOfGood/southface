import { Box, Button, Image } from "@chakra-ui/react";

import { MdExpand } from "react-icons/md";

const ModalImage = ({
  isEditing,
  image,
  // currentImageIndex,
  // setImages,
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
    <Box
      position="relative"
      width="250px"
      {...props}
    >
      <Image
        src={image}
        objectFit="cover"
        boxSize={isEditing ? "3xs" : "2xs"}
        boxShadow="lg"
        alt={"card image"}
        margin="0 5px 7px 0px"
      />
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
