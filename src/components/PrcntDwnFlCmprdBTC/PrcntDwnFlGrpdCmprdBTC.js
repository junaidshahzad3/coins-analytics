import React from "react";
import PieChart from "./PieChart";
import studyData from "../../data/Study.json";

const PrcntDwnFlGrpdCmprdBTC = () => {
  return (
    <div>
      <div className="text-3xl text-center mb-2">
        Percentage of downfall of other coins compared to Bitcoin BTC
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center justify-center w-full h-[25rem] border border-slate-200 shadow-lg rounded-xl p-4">
          <PieChart filteredData={studyData} />
        </div>
      </div>
    </div>
  );
};

export default PrcntDwnFlGrpdCmprdBTC;
