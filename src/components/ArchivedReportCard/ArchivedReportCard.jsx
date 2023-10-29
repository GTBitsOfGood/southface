import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  useBreakpointValue,
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
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });

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
          rounded="mlgd"
          bg="white"
          marginBottom="10"
          flex="1"
        >
          <CardHeader>
            <Flex justifyContent="space-between">
              <Flex flexDirection="column">
                <Heading size="xl" mr={6}>
                  {report.name || "Untitled Report"}
                </Heading>
                <Flex
                  flexDirection={flexDirection}
                  alignItems={
                    flexDirection === "column" ? "flex-start" : "center"
                  }
                >
                  {/* completed date */}
                  <Heading size="xs" mr={6}>
                    <Flex textColor="gray">
                      Completed on{" "}
                      {new Date(report.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Flex>
                  </Heading>

                  {/* button group */}
                  <Flex
                    mt={flexDirection === "column" ? 4 : 0}
                    flexGrow={1}
                    flexBasis={0}
                    justifyContent={["flex-start", "space-between"]}
                  >
                    <PrintToPDFButton report={report} />

                    <Flex ml={4} backgroundColor="blue">
                      <Button
                        onClick={
                          activeReport.cards?.length > 0
                            ? onOpenEdit
                            : handleEdit
                        }
                        borderRadius="full"
                        variant="Blue-outlined"
                      >
                        Edit Report
                      </Button>
                      <Button onClick={onOpen} variant="Red-rounded">
                        Remove from Reports
                      </Button>
                    </Flex>

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
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex flexDirection={flexDirection}>
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
