"use client";
import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import studyData from "../../data/Study.json";
import { applyHauptFilter } from "@/utils/applyHauptFilter";
import { applyMCGruppeFilter } from "@/utils/applyMCGruppeFilter";
import { applyCoinsFilter } from "@/utils/applyCoinsFilter";

const PrcntDwnFlGrpd = ({
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
      <div className="text-3xl text-center mb-2">
        Abfälle - Top to Low Zyklus 2018-2022
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="flex flex-col lg:flex-row gap-4 items-center w-full">
          <div className="w-full flex justify-center h-[30rem] border border-slate-200 shadow-lg rounded-xl p-4">
            <PieChart filteredData={filteredData} filter="10" />
          </div>
          <div className="w-full flex justify-center h-[30rem] border border-slate-200 shadow-lg rounded-xl p-4">
            <BarChart filteredData={filteredData} filter="10" />
          </div>
        </div>
        <div className="w-full flex justify-center h-[40rem] border border-slate-200 shadow-lg rounded-xl p-4">
          <BarChart filteredData={filteredData} filter="5" />
        </div>
      </div>
    </div>
  );
};

export default PrcntDwnFlGrpd;
