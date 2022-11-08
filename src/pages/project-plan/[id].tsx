import { Alert, AlertIcon } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";
import { getPlanById } from "src/actions/Plan";

const PlanPDFViewer = dynamic(
  () => import("../../components/PlanDocumentPDF/PlanPDFViewer"),
  { ssr: false }
);

const PDFWrapper = (props: any) => {
  const { plan, error } = props;

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error processing your request
      </Alert>
    );
  }

  return <PlanPDFViewer plan={plan} />;
};

/**
 * Errors in getServerSideProps will display the page in 'pages/500.js' (https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
 */
export async function getServerSideProps(context: any) {
  const id = context.query.id;
  try {
    const plan = await getPlanById(id);

    return {
      props: {
        plan: plan[0],
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
