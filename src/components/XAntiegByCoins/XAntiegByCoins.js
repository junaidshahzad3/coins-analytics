import React, { useEffect, useState } from "react";
import ScatterPlotChart from "./ScatterPlotChart";
import studyData from "../../data/Study.json";
import { applyHauptFilter } from "@/utils/applyHauptFilter";
import { applyMCGruppeFilter } from "@/utils/applyMCGruppeFilter";
import { applyCoinsFilter } from "@/utils/applyCoinsFilter";

const XAntiegByCoins = ({
  selectedCoins,
  selectedMCGruppes,
  selectedHauptKategories,
}) => {
  const [filteredData, setFilteredData] = useState(studyData || []);

  useEffect(() => {
    applyHauptFilter(setFilteredData, selectedHauptKategories);
  }, [selectedHauptKategories]);

  useEffect(() => {
    applyMCGruppeFilter(setFilteredData, selectedMCGruppes);
  }, [selectedMCGruppes]);

  useEffect(() => {
    applyCoinsFilter(setFilteredData, selectedCoins);
  }, [selectedCoins]);

  return (
    <div>
      <div className="text-3xl text-center">X Anstieg by Coins</div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center w-full h-[40rem]">
          <ScatterPlotChart filteredData={filteredData} />
        </div>
        {/* <Legend /> */}
      </div>
    </div>
  );
};

export default XAntiegByCoins;
