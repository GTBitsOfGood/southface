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
import PreviewPDFButton from "src/components/PreviewPDFButton";
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
    updateReport({ ...report });
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
            <Flex
              justifyContent="space-between"
              alignItems={flexDirection === "column" ? "flex-start" : "center"}
              flexDirection={flexDirection}
            >
              <Flex flexDirection="column">
                <Heading size="xl" mr={6}>
                  {report.name || "Untitled Report"}
                </Heading>
                <Flex textColor="gray" flexDirection={flexDirection}>
                  Completed on{" "}
                  {new Date(report.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Flex>
              </Flex>

              <Flex
                flexDirection="row"
                alignItems="center"
                gap={2}
                width="80%"
                justifyContent="space-between"
              >
                <PreviewPDFButton report={report} sels={report.cards} />
                {/* <PrintToPDFButton report={report} /> */}
                <Flex gap={1}>
                  <Button
                    onClick={
                      activeReport.cards?.length > 0 ? onOpenEdit : handleEdit
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
              </Flex>
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
          </CardHeader>

          <CardBody>
            <Flex flexDirection={flexDirection}>
              {report.cards.map((cardWrapper, index) => (
                <Flex key={index}>
                  <StandardCard
                    title={cardWrapper.card.title}
                    images={cardWrapper.card.images}
                    imgSelections={cardWrapper.imgSelections}
                    criteria={cardWrapper.card.criteria}
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
