import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Image } from "@chakra-ui/react";
import Carousel from "react-grid-carousel";

const StandardCardImageCarousel = ({ cardImages, ...rest }) => {
  const ChevronIcon = (props) => {
    const styles = {
      pos: "absolute",
      top: "0",
      bottom: "0",
      margin: "auto 0",
      color: "white",
      zIndex: 2,
      boxSize: 12,
    };
    if (props.orientation == "right") {
      return <ChevronRightIcon {...styles} right="20px" />;
    } else if (props.orientation == "left") {
      return <ChevronLeftIcon {...styles} left="20px" />;
    }
  };

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

  const {cols = 5, rows = 1, gap = 10} = {...rest};

  return (
    <Carousel
      cols={cols}
      rows={rows}
      gap={gap}
      showDots={true}
      dot={MyDot}
      containerStyle={{
        width: "100%",
        height: "47%",
        position: "relative",
      }}
      arrowLeft={<ChevronIcon orientation="left" />}
      arrowRight={<ChevronIcon orientation="right" />}
    >
      {cardImages.map(({ imageUrl: image }, index) => {
        return (
          <Carousel.Item key={index}>
            <Image
              fit="contain"
              width="100%"
              src={image}
              alt="construction image"
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default StandardCardImageCarousel;
