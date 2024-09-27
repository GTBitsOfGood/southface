import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "../../Carousel/Carousel";

const LgImageCarousel = ({ cardImages, currentImage, setCurrentImage }) => {
  const [imageStyles, setImageStyles] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const adjustImageSizes = () => {
      if (carouselRef.current) {
        const carouselHeight = carouselRef.current.clientHeight;
        const newImageStyles = cardImages.map(({ imageUrl }) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const aspectRatio = img.width / img.height;
              if (img.height > carouselHeight) {
                const newHeight = carouselHeight;
                const newWidth = newHeight * aspectRatio;
                resolve({
                  maxHeight: '100%',
                  width: `${newWidth}px`,
                  objectFit: 'contain',
                });
              } else {
                resolve({
                  maxHeight: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                });
              }
            };
            img.src = imageUrl;
          });
        });

        Promise.all(newImageStyles).then(setImageStyles);
      }
    };

    adjustImageSizes();
    window.addEventListener('resize', adjustImageSizes);
    return () => window.removeEventListener('resize', adjustImageSizes);
  }, [cardImages]);

  return (
    <Box
      w="65%"
      bgColor="black"
      roundedLeft={14}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      ref={carouselRef}
    >
      <Carousel
        cols={1}
        rows={1}
        gap={2}
        showDots={true}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      >
        {cardImages.map(({ imageUrl: image }, index) => {
          return (
            <Carousel.Item key={index}>
              <Box
                h="100%"
                w="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
              >
                <img
                  src={image}
                  style={imageStyles[index] || { maxHeight: '100%', width: 'auto', objectFit: 'contain' }}
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