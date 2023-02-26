import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const ArrowIcon = (props) => {
  const styles = {
    pos: "absolute",
    top: "0",
    bottom: "0",
    margin: "auto 0",
    color: "white",
    bgColor: "black",
    rounded: "full",
    zIndex: 2,
    boxSize: 8,
  };
  if (props.orientation == "right") {
    return <ChevronRightIcon {...styles} />;
  } else if (props.orientation == "left") {
    return <ChevronLeftIcon {...styles} />;
  }
};

export default ArrowIcon;
