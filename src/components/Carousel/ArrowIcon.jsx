import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const ArrowIcon = (props) => {
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
    return <ChevronRightIcon {...styles} />;
  } else if (props.orientation == "left") {
    return <ChevronLeftIcon {...styles} />;
  }
};

export default ArrowIcon;
