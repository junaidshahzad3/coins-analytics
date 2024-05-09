import { getExcelData } from "@/app/api/readExcel/getExcelData";
import MainCompChild from "./MainCompChild";

export default async function MainComp() {
  const data = await getExcelData();

  return <MainCompChild data={data} />;
}
