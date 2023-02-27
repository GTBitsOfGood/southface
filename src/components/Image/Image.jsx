import Image from "next/image";
import { Box } from "@chakra-ui/react";

/**
 * Must specificy height and width! Otherwise image might not be displayed/
 */
const ChakraNextImage = ({ src, alt, ...rest }) => (
  <Box position="relative" {...rest}>
    <Image layout="fill" src={src} alt={alt} />
  </Box>
);

export default ChakraNextImage;
