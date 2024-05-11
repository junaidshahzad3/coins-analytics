import React, { useEffect, useState } from "react";
import CandleStickScatterCmbnd from "./CandleStickScatterCmbnd";
import studyData from "../../data/Study.json";
import btcData from "../../data/BTC-USD.json";
import { applyHauptFilter } from "@/utils/applyHauptFilter";
import { applyMCGruppeFilter } from "@/utils/applyMCGruppeFilter";
import { applyCoinsFilter } from "@/utils/applyCoinsFilter";

const PrcntDwnFlCombined = ({
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
      <div className="text-3xl text-center">Bottoms after Top</div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center w-full">
          <CandleStickScatterCmbnd
            filteredData={filteredData}
            btcData={btcData}
          />
        </div>
        {/* <Legend /> */}
      </div>
    </div>
  );
};

export default PrcntDwnFlCombined;
