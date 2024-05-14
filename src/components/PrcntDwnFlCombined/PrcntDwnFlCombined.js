import React, { useEffect, useRef, useState } from "react";
import studyData from "../../data/Study.json";
import btcData from "../../data/BTC-USD.json";
import { applyHauptFilter } from "@/utils/applyHauptFilter";
import { applyMCGruppeFilter } from "@/utils/applyMCGruppeFilter";
import { applyCoinsFilter } from "@/utils/applyCoinsFilter";
import ScatterChart from "./ScatterChart";
import CandleStickChart from "./CandleStickChart";

const PrcntDwnFlCombined = ({
  selectedCoins,
  selectedMCGruppes,
  selectedHauptKategories,
}) => {
  const [filteredData, setFilteredData] = useState(studyData || []);
  const [showBTCChart, setShowBTCChart] = useState(true);
  const scatterRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    // Handler to update dimensions
    const handleResize = (entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height: height - 50 });
      }
    };

    // Initialize ResizeObserver and observe the ref
    if (scatterRef.current) {
      resizeObserverRef.current = new ResizeObserver(handleResize);
      resizeObserverRef.current.observe(scatterRef.current);
    }

    // Cleanup function to disconnect the ResizeObserver
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [scatterRef, setDimensions]);

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
      <div className="text-3xl text-center mb-2">Altcoins Bottom nach TOP</div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center w-full relative">
          <button
            className="flex gap-2 items-center text-sm z-10"
            onClick={() => setShowBTCChart(!showBTCChart)}
          >
            <div className="w-[2.5rem] h-[0.8rem] bg-green-500 border border-green-600"></div>
            {showBTCChart ? <span>BTC-Chart</span> : <strike>BTC-Chart</strike>}
          </button>
          <ScatterChart filteredData={filteredData} scatterRef={scatterRef} />
          {showBTCChart && (
            <CandleStickChart
              btcData={btcData}
              svgWidth={dimensions.width}
              svgHeight={dimensions.height}
            />
          )}
        </div>
        {/* <Legend /> */}
      </div>
    </div>
  );
};

export default PrcntDwnFlCombined;
