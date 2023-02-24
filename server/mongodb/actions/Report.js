import mongoDB from "../index";
import Report from "../models/Report";

export async function createReport(report) {
  await mongoDB();

  const newReport = await Report.create(report);

  return newReport;
}

export async function updateReportById(id, updatedReport) {
  await mongoDB();

  await Report.findOneAndUpdate({ _id: id }, updatedReport);
}

export async function deleteReportById(id) {
  await mongoDB();

  await Report.findOneAndRemove({ _id: id });
}

export async function getReportById(id) {
  await mongoDB();

  const report = await Report.find({ _id: id });

  return report;
}

export async function getReports() {
  await mongoDB();

  return Report.find().populate("cards");
}
