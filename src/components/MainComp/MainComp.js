import { getExcelData } from "@/app/api/readExcel/getExcelData";
import MainCompChild from "./MainCompChild";
import { getCSVData } from "@/app/api/readCSV/getCSVData";

export default async function MainComp() {
  await getExcelData();
  await getCSVData();

  return <MainCompChild />;
}
