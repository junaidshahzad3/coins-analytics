"use client";
import React, { useState } from "react";
import studyData from "../../data/Study.json";
import Filters from "../Filters/Filters";
import XAnstiegGrpd from "../XAnstiegGrpd/XAnstiegGrpd";
import XAnstiegCmprdBTC from "../XAnstiegCmprdBTC/XAnstiegCmprdBTC";
import PrcntDwnFlGrpd from "../PrcntDwnFlGrpd/PrcntDwnFlGrpd";
import PrcntDwnFlGrpdCmprdBTC from "../PrcntDwnFlCmprdBTC/PrcntDwnFlGrpdCmprdBTC";
import XAntiegByCoins from "../XAntiegByCoins/XAntiegByCoins";
import TopByCoins from "../TopByCoins/TopByCoins";

const MainCompChild = ({ data }) => {
  const [filteredData, setFilteredData] = useState(studyData || []);
  console.log("data", data);
  return (
    <div className="w-full max-w-[1600px] h-full flex flex-col px-6">
      <Filters setFilteredData={setFilteredData} />
      <XAnstiegGrpd filteredData={filteredData} />
      <XAnstiegCmprdBTC filteredData={filteredData} />
      <PrcntDwnFlGrpd filteredData={filteredData} />
      <PrcntDwnFlGrpdCmprdBTC filteredData={filteredData} />
      <XAntiegByCoins filteredData={filteredData} />
      <TopByCoins filteredData={filteredData} />
    </div>
  );
};

export default MainCompChild;
