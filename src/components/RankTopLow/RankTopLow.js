import React, { useEffect, useState } from "react";
import SlopeChart from "./SlopeChart";
import studyData from "../../data/Study.json";
import { applyHauptFilter } from "@/utils/applyHauptFilter";
import { applyMCGruppeFilter } from "@/utils/applyMCGruppeFilter";
import { applyCoinsFilter } from "@/utils/applyCoinsFilter";

const RankTopLow = ({
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
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center w-full h-[30rem] border border-slate-200 shadow-lg rounded-xl p-4">
        <SlopeChart filteredData={filteredData} />
      </div>
    </div>
  );
};

export default RankTopLow;
