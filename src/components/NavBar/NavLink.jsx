import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

/**
 * Component for routing to different pages
 * @param href - The link you are trying to route to
 * @param children - Either any element like <div> or a string, which will be wrapped with an <a> tag
 */
const NavLink = ({ href, name, ...rest }) => {
  return href ? (
    <NavButton name={name} href={href} {...rest} passHref></NavButton>
  ) : (
    <NavButton name={name} {...rest} />
  );
};

const NavButton = ({ name, href, ...rest }) => (
  <Button
    as="button"
    color="Grey"
    _hover={{
      color: "Blue",
      transform: "scale(1.01)",
      textDecoration: "underline",
      textDecorationThickness: "0.20em",
      textUnderlineOffset: "0.30em",
    }}
    cursor="pointer"
    size="md"
    variant="link"
    mx={8}
    mt={1}
    {...rest}
  >
    {href ? (
      <Link href={href} passHref>
        <a>{name}</a>
      </Link>
    ) : (
      name
    )}
  </Button>
);

export default NavLink;
