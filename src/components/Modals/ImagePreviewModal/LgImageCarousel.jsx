import { Box } from "@chakra-ui/react";

import Carousel from "../../Carousel/Carousel";

import Image from "next/image";

const LgImageCarousel = ({ cardImages, currentImage, setCurrentImage }) => {
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
      <Carousel
        cols={1}
        rows={1}
        gap={10}
        showDots={true}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      >
        {cardImages.map(({ imageUrl: image }, index) => {
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
    </Box>
  );
};

export default LgImageCarousel;
