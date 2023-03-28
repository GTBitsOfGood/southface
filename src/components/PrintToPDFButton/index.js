import dynamic from "next/dynamic";
const PrintToPDFButton = dynamic(() => import("./PrintToPDFButton"), {
  ssr: false,
});

export default PrintToPDFButton;
