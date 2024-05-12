"use client";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import Legend from "./Legend";
import studyData from "../../data/Study.json";
import { useEffect, useState } from "react";
import { applyHauptFilter } from "@/utils/applyHauptFilter";
import { applyMCGruppeFilter } from "@/utils/applyMCGruppeFilter";
import { applyCoinsFilter } from "@/utils/applyCoinsFilter";

const XAnstiegGrpd = ({
  selectedMCGruppes,
  selectedHauptKategories,
  selectedCoins,
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
      <div className="text-3xl text-center">X Anstieg grouped</div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col lg:flex-row gap-4 items-center w-full">
          <div className="w-full flex justify-center h-[25rem]">
            <PieChart filteredData={filteredData} />
          </div>
          <div className="w-full flex justify-center h-[20rem]">
            <BarChart filteredData={filteredData} />
          </div>
        </div>
        {/* <Legend /> */}
      </div>
    </div>
  );
};

export default XAnstiegGrpd;
