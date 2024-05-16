import { getExcelData } from "@/app/api/readExcel/getExcelData";
import MainCompChild from "./MainCompChild";
import { getCSVData } from "@/app/api/readCSV/getCSVData";

export default async function MainComp() {
  let data = await getExcelData();
  let btcData = await getCSVData();

  return (
    // <>
    //   {data && btcData && btcData?.length > 0 && data?.length > 0 ? (
    <MainCompChild data={data} btcData={btcData} />
    //   ) : (
    //     <>Loading...</>
    //   )}
    // </>
  );
}
