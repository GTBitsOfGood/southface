import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Circle, Image } from "@chakra-ui/react";
import Carousel from "src/components/Carousel/Carousel";
import useActiveReport from "../../lib/hooks/useActiveReport";

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

  const { cols = 5, rows = 1, gap = 10 } = { ...rest };

  const { selState } = { ...rest };
  const { changeInReport } = useActiveReport();
  const imgArr = (function () {
    if (selState && selState.imgSelections.length === cardImages.length) {
      return selState.imgSelections;
    } else {
      return Array(cardImages.length).fill(false);
    }
  })();
  const { editing } = { ...rest };

  const imgToggleHandler = (index) => () => {
    if (selState && editing) {
      imgArr[index] = !imgArr[index];
      const newSel = { ...selState };
      newSel.imgSelections = imgArr;
      changeInReport(newSel);
    }
  };

  // Extracted image component that shows inside carousel
  const ConditionalImage = ({ image, index }) => {
    const selected = selState?.imgSelections[index];
    const img = (
      <Image
        opacity={selected ? "100%" : "50%"}
        fit="contain"
        border="1px solid"
        borderColor="gray.200"
        width="100%"
        src={image}
        alt="construction image"
      />
    );
    const iconStyles = {
      position: "absolute",
      right: "2px",
      top: "2px",
      color: "white",
      backgroundColor: "gray",
      fontSize: "small",
      padding: "5px",
    };
    return editing ? (
      <Box onClick={imgToggleHandler(index)} position="relative">
        <Circle style={iconStyles}>{selected ? <CloseIcon /> : "Add"}</Circle>
        {img}
      </Box>
    ) : (
      <Box>{img}</Box>
    );
  };

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
        marginBottom: "20px",
      }}
      arrowLeft={<ChevronIcon orientation="left" />}
      arrowRight={<ChevronIcon orientation="right" />}
      isReportCarousel={true}
    >
      {cardImages.map(({ imageUrl: image }, index) => {
        return (
          (selState.imgSelections[index] || editing) && (
            <Carousel.Item key={index}>
              <ConditionalImage image={image} index={index} />
            </Carousel.Item>
          )
        );
      })}
    </Carousel>
  );
};

export default StandardCardImageCarousel;
