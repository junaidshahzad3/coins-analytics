import React from "react";
import ColmnXAnstiegGrpdPie from "./ColmnXAnstiegGrpdPie";
import Select from "react-select";
import { getExcelData } from "@/app/api/readExcel/getExcelData";

export default async function ColmnXAnstiegGrpdPieIndex() {
  const data = await getExcelData();

  // const getCategory = (x) => {
  //   if (x >= 1000) {
  //     return 1;
  //   } else if (x >= 100 && x < 1000) {
  //     return 2;
  //   } else if (x >= 40 && x < 100) {
  //     return 3;
  //   } else if (x >= 21 && x < 40) {
  //     return 4;
  //   } else if (x >= 17.1 && x < 21) {
  //     return 5;
  //   } else {
  //     return 6;
  //   }
  // };

  return (
    <>
      {/* <Select
            closeMenuOnSelect={false}
            isMulti
            options={optionsArray}
            value={selectedValues}
            className="custom-input-style"
            onChange={(e) => setSelectedValues(e)}
          /> */}
      {data?.length > 0 && <ColmnXAnstiegGrpdPie sin={data} />}
    </>
  );
}
