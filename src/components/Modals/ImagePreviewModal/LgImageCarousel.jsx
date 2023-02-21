import { Box, Flex, Text } from "@chakra-ui/react";

import Carousel from "../../Carousel/Carousel";

import Image from "next/image";

const LgImageCarousel = ({ cardImages }) => {
  return (
    <Box
      w="65%"
      bgColor="black"
      roundedLeft={14}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      {cardImages.length > 0 ? (
        <Carousel cols={1} rows={1} gap={10} showDots={true}>
          {cardImages.map((image, index) => {
            return (
              <Carousel.Item key={index}>
                <Box h="100%" w="100%" position="relative">
                  <Image
                    src={image}
                    layout="fill"
                    objectFit="contain"
                    alt="construction image"
                  />
                </Box>
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        <Flex justifyContent="center" alignItems="center">
          <Text color="white">Add images for this standard!</Text>
        </Flex>
      )}
    </Box>
  );
};

export default LgImageCarousel;
