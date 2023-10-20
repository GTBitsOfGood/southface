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
import { useRouter } from "next/router";
import React, { useState } from "react";
import PrintToPDFButton from "src/components/PrintToPDFButton";
import useActiveReport from "src/lib/hooks/useActiveReport";
import urls from "src/lib/utils/urls";
import { removeArchivedReport } from "../../actions/User/ArchivedReport";
import ConfirmActionModal from "../Modals/ConfirmActionModal";
import StandardCard from "./StandardCard";
import defaultReportProps from "./defaultReportProps";

const ArchivedReportCard = ({ report = defaultReportProps }) => {
  const [hasReportCard, setHasReportCard] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const router = useRouter();
  const { report: activeReport, updateReport } = useActiveReport();

  const handleRemove = async () => {
    await removeArchivedReport(report._id);
    setHasReportCard(false);
    router.reload();
  };

  const handleEdit = () => {
    const cards = [];
    const newReport = { ...report };
    newReport.cards.forEach((card) => {
      cards.push({
        card: card,
        imgSelections: Array(card.images.length).fill(true),
        noteSelections: Array(card.notes.length).fill(true),
      });
    });
    newReport.cards = cards;
    updateReport(newReport);
    router.push(urls.pages.reportbuilder);
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
                <Button
                  onClick={
                    activeReport.cards?.length > 0 ? onOpenEdit : handleEdit
                  }
                  marginRight="0.5rem"
                  borderRadius="full"
                  variant="Blue-outlined"
                >
                  Edit Report
                </Button>
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
                <ConfirmActionModal
                  isOpen={isOpenEdit}
                  onClose={onCloseEdit}
                  mainText="You have a current report in progress. Are you sure you want to edit this report?"
                  confirmButtonText="Yes, edit report"
                  cancelButtonText="No, cancel"
                  handleAction={handleEdit}
                  isDanger={true}
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
