import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiChevronsDown } from "react-icons/fi";
import urls from "src/lib/utils/urls";
import useActiveReport from "../../lib/hooks/useActiveReport";
import ShoppingCartItem from "./ShoppingCartItem";

const ShoppingCartView = ({ isOpen, onClose, ...rest }) => {
  const { report, isValidating } = useActiveReport();
  const [sels, setSels] = useState([]);
  useEffect(() => {
    if (report && !isValidating) {
      // this useEffect wrapper prevents jittering
      setSels(report.cards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating]);

  const buttonW = "200px";

  const { buttonStyles } = { ...rest };

  const closeButtonStyle = {
    ...buttonStyles,
    left: "-" + buttonW,
  };

  const DisplayCardsInReport = () => {
    if (sels.length > 0) {
      return sels
        .slice(0, 3)
        .map((selState, index) => (
          <ShoppingCartItem
            key={index}
            selState={selState}
            card={selState.card}
          />
        ));
    } else {
      return <Text p={4}>No cards currently added to the report.</Text>;
    }
  };

  return (
    <Drawer {...rest} isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent justifyContent="space-between">
        <Box>
          <DrawerCloseButton fontSize="lg" style={closeButtonStyle}>
            {<Icon as={FiChevronsDown} mr="1" fontSize="xl" />} Report Preview
          </DrawerCloseButton>
          <DrawerHeader display="flex" justifyContent="center">
            {report.name || "Untitled Report"}
          </DrawerHeader>
          <Divider orientation="horizontal" />
          <DisplayCardsInReport />
        </Box>
        <Box display="flex" justifyContent="center">
          {sels.length > 0 && (
            <Link href={urls.pages.reportbuilder}>
              <Button variant="Grey-rounded" size="lg" marginBottom="20">
                View Full Report
              </Button>
            </Link>
          )}
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default ShoppingCartView;
