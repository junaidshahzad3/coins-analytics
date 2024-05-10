"use client";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import Legend from "./Legend";
import studyData from "../../data/Study.json";
import { useEffect, useState } from "react";
import { applyHauptFilter } from "@/utils/applyHauptFilter";
import { applyMCGruppeFilter } from "@/utils/applyMCGruppeFilter";

const XAnstiegGrpd = ({ selectedMCGruppes, selectedHauptKategories }) => {
  const [filteredData, setFilteredData] = useState(studyData || []);

  useEffect(() => {
    applyHauptFilter(setFilteredData, selectedHauptKategories);
  }, [selectedHauptKategories]);

  useEffect(() => {
    applyMCGruppeFilter(setFilteredData, selectedMCGruppes);
  }, [selectedMCGruppes]);

  return (
    <div>
      <div className="text-3xl text-center">X Anstieg grouped</div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center w-full">
          <PieChart filteredData={filteredData} />
          <BarChart filteredData={filteredData} />
        </div>
        <Legend />
      </div>
    </div>
  );
};

export default XAnstiegGrpd;
