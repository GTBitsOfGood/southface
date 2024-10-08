import { Box, IconButton } from "@chakra-ui/react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import ArrowIcon from "./ArrowIcon";
import Dot from "./Dot";

const CAROUSEL_ITEM = "CAROUSEL_ITEM";
const Carousel = ({
  cols: colsProp = 1,
  rows: rowsProp = 1,
  gap,
  hideArrow = false,
  showDots = false,
  dotColorActive = "#795548",
  dotColorInactive = "#ccc",
  currentImage = 0,
  setCurrentImage = null,
  dot,
  containerStyle,
  isReportCarousel = false,
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(currentImage);
  const railWrapperRef = useRef(null);

  const itemList = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child) => child.type.displayName === CAROUSEL_ITEM
      ),
    [children]
  );

  const itemAmountPerSet = colsProp * rowsProp;
  const itemSetList = useMemo(
    () =>
      itemList.reduce((result, item, i) => {
        const itemComponent = (
          <Box
            key={i}
            w="100%"
            h="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
          >
            {item}
          </Box>
        );

        if (i % itemAmountPerSet === 0) {
          result.push([itemComponent]);
        } else {
          result[result.length - 1].push(itemComponent);
        }

        return result;
      }, []),
    [itemList, itemAmountPerSet]
  );

  const page = Math.ceil(itemList.length / itemAmountPerSet);

  const handlePrev = useCallback(() => {
    setCurrentPage((p) => {
      const prevPage = p - 1;
      if (setCurrentImage) {
        setCurrentImage(prevPage);
      }
      return prevPage;
    });
  }, [setCurrentImage]);

  const handleNext = useCallback(() => {
    setCurrentPage((p) => {
      const nextPage = p + 1;
      if (setCurrentImage) {
        setCurrentImage(nextPage);
      }

      return nextPage;
    });
  }, [setCurrentImage]);

  const turnToPage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <Box
      id="carousel__container"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="100%"
      w="100%"
      style={containerStyle}
    >
      <IconButton
        isDisabled={hideArrow || currentPage <= 0}
        icon={<ArrowIcon orientation="left" />}
        onClick={handlePrev}
        position="absolute"
        left="-1rem"
        background="none"
        _hover={{ background: "none" }}
        zIndex="10"
        cursor="pointer"
        display={isReportCarousel ? "none" : "block"}
      />
      <Box overflow="hidden" margin="0" w="100%" h="100%" ref={railWrapperRef}>
        <Box
          id="carousel__rail"
          display="grid"
          gridColumnGap={`${gap}px`}
          position="relative"
          transition="transform 0.5s cubic-bezier(0.2, 1, 0.3, 1) 0s"
          gridTemplateColumns={`repeat(${page}, 100%)`}
          transform={`translateX(calc(${-100 * currentPage}% - ${
            gap * currentPage
          }px))`}
          width="100%"
          height="100%"
        >
          {itemSetList.map((set, i) => (
            <Box
              id="carousel__itemset"
              key={i}
              display="grid"
              gridTemplateColumns={`repeat(${colsProp}, 1fr)`}
              gridTemplateRows={`repeat(${rowsProp}, 1fr)`}
              gridGap={`${gap}px`}
              w="100%"
              h="100%"
            >
              {set}
            </Box>
          ))}
        </Box>
      </Box>
      {showDots && (
        <Box
          id="carousel__dots"
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bottom="2rem"
          textAlign="center"
        >
          {[...Array(page)].map((_, i) => (
            <Dot
              key={i}
              index={i}
              isActive={i === currentPage}
              dotColorInactive={dotColorInactive}
              dotColorActive={dotColorActive}
              dot={dot}
              onClick={turnToPage}
            />
          ))}
        </Box>
      )}
      <IconButton
        isDisabled={hideArrow || currentPage == page - 1}
        icon={<ArrowIcon orientation="right" />}
        onClick={handleNext}
        position="absolute"
        right="1rem"
        background="none"
        _hover={{ background: "none" }}
        zIndex="10"
        cursor="pointer"
        display={isReportCarousel ? "none" : "block"}
      />
    </Box>
  );
};

Carousel.Item = ({ children }) => children;
Carousel.Item.displayName = CAROUSEL_ITEM;
export default Carousel;
