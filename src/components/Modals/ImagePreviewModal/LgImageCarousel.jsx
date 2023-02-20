import { Box, Flex, Image, Text } from "@chakra-ui/react";

import Carousel from "react-grid-carousel";
import { ChevronIcon } from "../CardModal/CardModal";

const LgImageCarousel = ({ cardImages }) => {
  const MyDot = ({ isActive }) => (
    <Box
      style={{
        marginTop: "-50px",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        border: "1px solid white",
        background: `${isActive ? "white" : "none"}`,
      }}
    ></Box>
  );

  return (
    <Box
      w="65%"
      bgColor="black"
      borderRight="2px solid black"
      roundedLeft={14}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      {cardImages.length > 0 ? (
        <Carousel
          cols={1}
          rows={1}
          gap={10}
          mobileBreakpoint={0}
          showDots={true}
          dot={MyDot}
          containerStyle={{
            margin: "0 -20px -15px",
            maxHeight: "calc(100% + 15px)",
            maxWidth: "calc(100% + 40px)",
          }}
          arrowLeft={<ChevronIcon orientation="left" />}
          arrowRight={<ChevronIcon orientation="right" />}
        >
          {cardImages.map((image, index) => {
            return (
              <Carousel.Item key={index}>
                <Box
                  h="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    height="100%"
                    width="100%"
                    minWidth="auto"
                    fit="contain"
                    src={image}
                    alt="construction image"
                  />
                </Box>
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        <Flex minHeight="250px" justifyContent="center" alignItems="center">
          <Text>Add images for this standard!</Text>
        </Flex>
      )}
    </Box>
  );
};

export default LgImageCarousel;
