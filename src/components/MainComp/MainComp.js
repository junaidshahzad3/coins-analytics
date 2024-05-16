import { getExcelData } from "@/app/api/readExcel/getExcelData";
import MainCompChild from "./MainCompChild";
import { getCSVData } from "@/app/api/readCSV/getCSVData";

export default async function MainComp() {
  const data = await getExcelData();
  const btcData = await getCSVData();

  return <MainCompChild data={data} btcData={btcData} />;
}
