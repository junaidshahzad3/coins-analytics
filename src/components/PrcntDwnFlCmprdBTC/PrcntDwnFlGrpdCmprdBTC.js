import React from "react";
import PieChart from "./PieChart";
import Legend from "./Legend";

const PrcntDwnFlGrpdCmprdBTC = ({ filteredData }) => {
  return (
    <div>
      <div className="text-3xl text-center">
        Percentage of downfall of other coins compared to Bitcoin BTC
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center">
          <PieChart filteredData={filteredData} />
        </div>
        <Legend />
      </div>
    </div>
  );
};

export default PrcntDwnFlGrpdCmprdBTC;
