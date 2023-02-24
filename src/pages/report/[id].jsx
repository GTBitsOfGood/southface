import { Alert, AlertIcon } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";
import { getReportById } from "src/actions/Report";

const ReportPDFViewer = dynamic(
  () => import("../../components/ReportDocumentPDF/ReportPDFViewer"),
  { ssr: false }
);

const PDFWrapper = (props) => {
  const { report, error } = props;

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error processing your request
      </Alert>
    );
  }

  return <ReportPDFViewer report={report} />;
};

/**
 * Errors in getServerSideProps will display the page in 'pages/500.js' (https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
 */
export async function getServerSideProps(context) {
  const id = context.query.id;
  try {
    const report = await getReportById(id);

    return {
      props: {
        report: report[0],
      },
    };
  } catch (e) {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default PDFWrapper;
