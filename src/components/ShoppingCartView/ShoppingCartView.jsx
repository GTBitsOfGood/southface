import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import urls from "src/lib/utils/urls";
import useActiveReport from "../../lib/hooks/useActiveReport";
import ShoppingCartItem from "./ShoppingCartItem";

const ShoppingCartView = ({ isOpen, onClose }) => {
  const { report, isValidating } = useActiveReport();
  const [sels, setSels] = useState([]);
  useEffect(() => {
    if (report && !isValidating) {
      // this useEffect wrapper prevents jittering
      setSels(report.cards);
    }
  }, [isValidating]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent justifyContent="space-between">
        <Box>
          <DrawerHeader display="flex" justifyContent="center">
            Atlanta Construction 47
          </DrawerHeader>
          <Divider orientation="horizontal" />
          {sels.slice(0, 3).map((selState, index) => (
            <ShoppingCartItem
              key={index}
              selState={selState}
              card={selState.card}
            />
          ))}
        </Box>
        <Box display="flex" justifyContent="center">
          <Link href={urls.pages.reportbuilder}>
            <Button variant="Grey-rounded" size="lg" marginBottom="20">
              View Full Report
            </Button>
          </Link>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default ShoppingCartView;
