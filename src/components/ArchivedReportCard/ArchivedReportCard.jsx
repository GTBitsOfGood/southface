import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import PrintToPDFButton from "src/components/PrintToPDFButton";
import { removeArchivedReport } from "../../actions/User/ArchivedReport";
import ConfirmActionModal from "../Modals/ConfirmActionModal";
import defaultReportProps from "./defaultReportProps";
import StandardCard from "./StandardCard";
import { useRouter } from "next/router";

const ArchivedReportCard = ({ report = defaultReportProps }) => {
  const [hasReportCard, setHasReportCard] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();



  const handleRemove = async () => {
    await removeArchivedReport(report._id);
    setHasReportCard(false);
    router.reload();
  };

  return (
    hasReportCard && (
      <Flex>
        <Card
          boxShadow="md"
          p="6"
          rounded="mlgd"
          bg="white"
          marginBottom="10"
          flex="1"
        >
          <CardHeader>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Heading size="xl" mr={6}>
                  {report.name || "Untitled Report"}
                </Heading>
                <PrintToPDFButton report={report} />
              </Box>
              <Box>
                <Button onClick={onOpen} variant="Red-rounded">
                  Remove from Reports
                </Button>
                <ConfirmActionModal
                  isOpen={isOpen}
                  onClose={onClose}
                  mainText="Are you sure you want to remove this report"
                  confirmButtonText="Yes, remove report"
                  cancelButtonText="No, cancel"
                  handleAction={handleRemove}
                  isDanger={false}
                />
              </Box>
            </Box>
            <Box textColor="gray">
              Completed on{" "}
              {new Date(report.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Box>
          </CardHeader>
          <CardBody>
            <Flex marginRight="15em">
              {report.cards.map((card, index) => (
                <Flex key={index}>
                  <StandardCard
                    title={card.title}
                    images={card.images}
                    criteria={card.criteria}
                  />
                  {index < report.cards.length - 1 && (
                    <Divider orientation="vertical" />
                  )}
                </Flex>
              ))}
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    )
  );
};

export default ArchivedReportCard;
