import * as XLSX from "xlsx";
import { primaryCategoryRoutes } from "../lib/utils/constants";
import { DEFAULT_IMAGE } from "../lib/utils/constants";

const formatStandard = (row, primaryCategory, buildingType) => ({
  images: [
    {
      imageUrl: DEFAULT_IMAGE,
      thumbsUp: [],
      thumbsDown: [],
    },
  ],
  title: row[1],
  criteria: row[2],
  tags: row[3] ? row[3].toLowerCase().split("; ") : [],
  buildingType: [buildingType],
  primaryCategory: [
    Object.keys(primaryCategoryRoutes).find(
      (key) => primaryCategoryRoutes[key] === primaryCategory
    ),
  ],
  notes: [],
});

export const parseUploadCardFile = async (file) => {
  const data = await file.arrayBuffer();

  const workbook = XLSX.read(data);

  const sheetNames = workbook.SheetNames;
  const sheets = sheetNames.map((name) => ({
    name,
    data: XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1 }),
  }));

  const single = sheets[0].data
    .slice(1)
    .map((row) => formatStandard(row, row[0], "single-family"));

  const multi = sheets[1].data
    .slice(1)
    .map((row) => formatStandard(row, row[0], "multifamily"));

  const commercial = sheets[2].data
    .slice(1)
    .map((row) => formatStandard(row, row[0], "commercial"));

  return [...single, ...multi, ...commercial];
};
