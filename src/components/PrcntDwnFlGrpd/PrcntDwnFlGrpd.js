"use client";
import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import Legend from "./Legend";
import { ColorsWith5Diff } from "./Colors";
import studyData from "../../data/Study.json";
import { applyHauptFilter } from "@/utils/applyHauptFilter";
import { applyMCGruppeFilter } from "@/utils/applyMCGruppeFilter";

const PrcntDwnFlGrpd = ({ selectedHauptKategories, selectedMCGruppes }) => {
  const [filteredData, setFilteredData] = useState(studyData || []);

  useEffect(() => {
    applyHauptFilter(setFilteredData, selectedHauptKategories);
  }, [selectedHauptKategories]);

  useEffect(() => {
    applyMCGruppeFilter(setFilteredData, selectedMCGruppes);
  }, [selectedMCGruppes]);

  return (
    <div>
      <div className="text-3xl text-center">Percentage of downfall grouped</div>
      <div className="flex items-center gap-3">
        <div className="grid grid-cols-2 items-center w-full">
          <div className="w-full flex justify-center h-[30rem]">
            <PieChart filteredData={filteredData} filter="10" />
          </div>
          <div className="w-full flex justify-center h-[30rem]">
            <BarChart filteredData={filteredData} filter="10" />
          </div>
          <div className="w-full flex justify-center h-[40rem] col-span-2">
            <BarChart filteredData={filteredData} filter="5" />
          </div>
        </div>
        {/* <Legend Colors={ColorsWith5Diff} /> */}
      </div>
    </div>
  );
};

export default PrcntDwnFlGrpd;
