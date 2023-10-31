import dynamic from "next/dynamic";
const PreviewPDFButton = dynamic(() => import("./PreviewPDFButton"), {
  ssr: false,
});

export default PreviewPDFButton;
