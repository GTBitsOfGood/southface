import { Box, Button } from "@chakra-ui/react";

import { MdExpand } from "react-icons/md";

import Image from "next/image";

const ModalImage = ({ image, openImagePreviewCallback, ...props }) => {
  return (
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
    </Box>
  );
};

export default ModalImage;
