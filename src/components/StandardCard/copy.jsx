// Alternate version of StandardCardImageCarousel that has a stateful image array
// This file is not necessary unless we want to implement a way to discard
// changes to image/note selections

// import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
// import { Box, Image } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import Carousel from "react-grid-carousel";
// import useActiveReport from "../../lib/hooks/useActiveReport";

// const StandardCardImageCarousel = ({ cardImages, ...rest }) => {
//   const ChevronIcon = (props) => {
//     const styles = {
//       pos: "absolute",
//       top: "0",
//       bottom: "0",
//       margin: "auto 0",
//       color: "white",
//       zIndex: 2,
//       boxSize: 12,
//     };
//     if (props.orientation == "right") {
//       return <ChevronRightIcon {...styles} right="20px" />;
//     } else if (props.orientation == "left") {
//       return <ChevronLeftIcon {...styles} left="20px" />;
//     }
//   };

//   const MyDot = ({ isActive }) => (
//     <Box
//       style={{
//         marginTop: "-50px",
//         width: "8px",
//         height: "8px",
//         borderRadius: "50%",
//         border: "1px solid white",
//         background: `${isActive ? "white" : "none"}`,
//       }}
//     ></Box>
//   );

//   const { cols = 5, rows = 1, gap = 10 } = { ...rest };

//   const { selState } = { ...rest };
//   const { changeInReport } = useActiveReport();
//   const [imgArr, setImgArr] = useState(
//     (function () {
//       if (selState && selState.imgSelections.length === cardImages.length) {
//         return selState.imgSelections;
//       } else {
//         return Array(cardImages.length).fill(false);
//       }
//     })()
//   );
//   const { editing } = { ...rest };
//   const imgToggleHandler = (index) => () => {
//     if (selState && editing) {
//       setImgArr((prev) => {
//         const newArr = [...prev];
//         newArr[index] = !newArr[index];
//         return newArr;
//       });
//     }
//   };
//   useEffect(() => {
//     const newSel = { ...selState };
//     newSel.imgSelections = imgArr;
//     changeInReport(newSel);
//     console.log(selState.imgSelections);
//   }, [imgArr]);

//   return (
//     <Carousel
//       cols={cols}
//       rows={rows}
//       gap={gap}
//       showDots={true}
//       dot={MyDot}
//       containerStyle={{
//         width: "100%",
//         height: "47%",
//         position: "relative",
//       }}
//       arrowLeft={<ChevronIcon orientation="left" />}
//       arrowRight={<ChevronIcon orientation="right" />}
//     >
//       {cardImages.map(({ imageUrl: image }, index) => {
//         return (
//           <Carousel.Item key={index}>
//             <Box
//               borderWidth={selState?.imgSelections[index] ? "10px" : "0px"}
//               borderColor={selState?.imgSelections[index] ? "red.500" : "none"}
//             >
//               <Image
//                 onClick={imgToggleHandler(index)}
//                 fit="contain"
//                 width="100%"
//                 src={image}
//                 alt="construction image"
//               />
//             </Box>
//           </Carousel.Item>
//         );
//       })}
//     </Carousel>
//   );
// };

// export default StandardCardImageCarousel;
