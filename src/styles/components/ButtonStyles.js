const generateButtonStyles = (color, hoverColor, activeColor) => {
  const hoverState = {
    transition: "0.1s ease-in-out",
    bgColor: hoverColor,
    color: "white",
  };
  const activeState = {
    transition: "0.1s ease-in-out",
    bgColor: activeColor,
    color: "white",
  };

  return {
    [color]: {
      bg: color,
      transition: "0.1s ease-in-out",
      _hover: hoverState,
      _active: activeState,
    },

    [`${color}-outlined`]: {
      bg: "white",
      border: "1px solid",
      color: color,
      borderColor: color,
      transition: "0.1s ease-in-out",
      _hover: { ...hoverState, bgColor: color },
      _active: activeState,
    },

    [`${color}-rounded`]: {
      bg: color,
      rounded: "3xl",
      _hover: hoverState,
      _active: activeState,
    },

    [`${color}-outlined-rounded`]: {
      bg: "white",
      border: "1px solid",
      color: color,
      borderColor: color,
      rounded: "3xl",
      _hover: { ...hoverState, bgColor: color },
      _active: activeState,
    },
  };
};

export const ButtonStyles = {
  // style object for base or default style
  baseStyle: {
    color: "white",
    fontWeight: "500",
    _hover: {
      cursor: "pointer",
    },
    textTransform: "capitalize",
    whiteSpace: "trim",
  },

  // styles for different sizes ("sm", "md", "lg")
  sizes: {
    lg: {
      rounded: "16",
      fontSize: "22px",
    },
  },

  variants: {
    ...generateButtonStyles("Red", "darkRed", "darkestRed"),
    ...generateButtonStyles("Blue", "darkBlue", "darkestBlue"),
    ...generateButtonStyles("Grey", "darkGrey", "darkestGrey"),
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: "sm",
  },
};
