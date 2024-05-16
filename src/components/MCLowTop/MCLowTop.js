import React, { useEffect, useState } from "react";
import SlopeChart from "./SlopeChart";
import { applyHauptFilter } from "@/utils/applyHauptFilter";
import { applyMCGruppeFilter } from "@/utils/applyMCGruppeFilter";
import { applyCoinsFilter } from "@/utils/applyCoinsFilter";

const MCLowTop = ({
  data,
  selectedCoins,
  selectedMCGruppes,
  selectedHauptKategories,
}) => {
  const [filteredData, setFilteredData] = useState(data || []);
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    applyHauptFilter(data, setFilteredData, selectedHauptKategories);
  }, [selectedHauptKategories]);

  useEffect(() => {
    applyMCGruppeFilter(data, setFilteredData, selectedMCGruppes);
  }, [selectedMCGruppes]);

  useEffect(() => {
    applyCoinsFilter(data, setFilteredData, selectedCoins);
  }, [selectedCoins]);

  return (
    <div className="flex items-center gap-3">
      <div className="w-full h-[30rem] border border-slate-200 shadow-lg rounded-xl p-4">
        <SlopeChart filteredData={filteredData} />
      </div>
    </div>
  );
};

export default MCLowTop;
