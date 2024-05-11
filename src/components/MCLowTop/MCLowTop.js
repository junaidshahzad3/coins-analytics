import React, { useEffect, useState } from "react";
import SlopeChart from "./SlopeChart";
import studyData from "../../data/Study.json";
import { applyHauptFilter } from "@/utils/applyHauptFilter";
import { applyMCGruppeFilter } from "@/utils/applyMCGruppeFilter";
import { applyCoinsFilter } from "@/utils/applyCoinsFilter";

const MCLowTop = ({
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
      <div className="text-3xl text-center">
        MC of choosen coins from low to top
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center w-full">
          <SlopeChart filteredData={filteredData} />
        </div>
        {/* <Legend /> */}
      </div>
    </div>
  );
};

export default MCLowTop;
