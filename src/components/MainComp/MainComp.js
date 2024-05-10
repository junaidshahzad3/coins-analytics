import { getExcelData } from "@/app/api/readExcel/getExcelData";
import MainCompChild from "./MainCompChild";

export default async function MainComp() {
  await getExcelData();

  return <MainCompChild />;
}
