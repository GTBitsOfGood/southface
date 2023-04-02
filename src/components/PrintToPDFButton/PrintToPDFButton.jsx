import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { PDFViewer, usePDF } from "@react-pdf/renderer";
import ReportDocumentPDF from "../ReportDocumentPDF/ReportDocumentPDF";

const PDFWrapper = (props) => {
  const { report, error } = props;

  if (!report) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error generating PDF</>;
  }

  return (
    <Flex justifyContent="center" height="max">
      <PDFViewer style={{ height: "70vh", width: "100%" }}>
        <ReportDocumentPDF selectedReport={report} />
      </PDFViewer>
    </Flex>
  );
};

const PrintToPDFButton = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [instance] = usePDF({
    document: <ReportDocumentPDF selectedReport={props.report} />,
  });

  return (
    <HStack>
      <Button
        as="a"
        px={4}
        download="UntitledReport"
        variant="Grey-rounded"
        href={instance.url}
        isDisabled={props.report?.cards?.length == 0}
      >
        Download
      </Button>
      <Button
        onClick={() => {
          onOpen();
        }}
        variant="Grey-rounded"
        px={4}
        isDisabled={props.report?.cards?.length == 0}
      >
        Print to PDF
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>PDF Preview</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <PDFWrapper error={props.error} report={props.report} />
            </ModalBody>
            <ModalFooter>
              <Button variant="Grey-rounded">
                <a download="PDF Name Here" href={instance.url}>
                  Download PDF
                </a>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Button>
    </HStack>
  );
};

export default PrintToPDFButton;
