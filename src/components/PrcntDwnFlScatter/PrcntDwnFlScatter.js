import React, { useEffect, useState } from "react";
import ScatterPlotChart from "./ScatterPlotChart";
import { applyHauptFilter } from "@/utils/applyHauptFilter";
import { applyMCGruppeFilter } from "@/utils/applyMCGruppeFilter";
import { applyCoinsFilter } from "@/utils/applyCoinsFilter";

const PrcntDwnFlScatter = ({
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
    <div>
      <div className="text-3xl text-center mb-2">
        Abfälle Low to Top 2018-2022
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center w-full">
          <ScatterPlotChart filteredData={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default PrcntDwnFlScatter;
