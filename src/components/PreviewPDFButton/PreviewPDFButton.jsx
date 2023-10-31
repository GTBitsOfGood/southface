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
  const { report, sels, error } = props;

  if (!report || !sels) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error generating PDF</>;
  }

  return (
    <Flex justifyContent="center" height="max">
      <PDFViewer style={{ height: "70vh", width: "100%" }}>
        <ReportDocumentPDF selectedReport={report} sels={sels} />
      </PDFViewer>
    </Flex>
  );
};

const PreviewPDFButton = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [instance] = usePDF({
    document: <ReportDocumentPDF selectedReport={props.report} />,
  });

  return (
    <HStack>
      <Button
        onClick={() => {
          onOpen();
        }}
        variant="Grey-rounded"
        px={4}
        isDisabled={props.report?.cards?.length == 0}
      >
        Preview PDF
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>PDF Preview</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <PDFWrapper
                error={props.error}
                report={props.report}
                sels={props.sels}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="Grey-rounded">
                <a download={props.report?.name} href={instance.url}>
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

export default PreviewPDFButton;
