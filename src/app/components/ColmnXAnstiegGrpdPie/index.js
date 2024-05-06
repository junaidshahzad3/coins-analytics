import React from "react";
import ColmnXAnstiegGrpdPie from "./ColmnXAnstiegGrpdPie";
import { processData } from "./processData";

export default async function ColmnXAnstiegGrpdPieIndex({ data }) {
  console.log("data", data);
  const processedData = processData(data);

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
      {data?.length > 0 && (
        <ColmnXAnstiegGrpdPie data={processedData} sin={data} />
      )}
    </>
  );
}
