import {
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { Box, Circle } from "@chakra-ui/react";
import Carousel from "react-grid-carousel";
import useActiveReport from "../../lib/hooks/useActiveReport";
import Note from "../Notes/Note";

const ReportStandardNoteCarousel = ({ notes, ...rest }) => {
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
  const noteArr = (function () {
    if (selState && selState.noteSelections.length === notes.length) {
      return selState.noteSelections;
    } else {
      return Array(notes.length).fill(false);
    }
  })();
  const { editing } = { ...rest };
  const noteToggleHandler = (index) => () => {
    if (selState && editing) {
      noteArr[index] = !noteArr[index];
      const newSel = { ...selState };
      newSel.noteSelections = noteArr;
      changeInReport(newSel);
    }
  };

  const ConditionalNote = ({ note, index }) => {
    const selected = selState?.noteSelections[index];
    const noteComp = <Note note={note} />;
    const iconStyles = {
      position: "absolute",
      right: "-7px",
      top: "-7px",
      color: "white",
      backgroundColor: "gray",
      fontSize: "small",
      padding: "5px",
    };
    return editing ? (
      <Box
        onClick={noteToggleHandler(index)}
        opacity={selected ? "100%" : "70%"}
        position="relative"
        mt="5"
      >
        <Circle style={iconStyles}>
          {selected ? <CloseIcon /> : <AddIcon />}
        </Circle>
        <Box>{noteComp}</Box>
      </Box>
    ) : (
      <Box>{noteComp}</Box>
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
      }}
      arrowLeft={<ChevronIcon orientation="left" />}
      arrowRight={<ChevronIcon orientation="right" />}
    >
      {notes.map((note, index) => {
        return (
          (selState?.noteSelections[index] || editing) && (
            <Carousel.Item key={index}>
              <ConditionalNote index={index} note={note} />
            </Carousel.Item>
          )
        );
      })}
    </Carousel>
  );
};

export default ReportStandardNoteCarousel;
