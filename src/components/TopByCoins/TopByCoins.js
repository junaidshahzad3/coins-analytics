import React from "react";
import ScatterPlotChart from "./ScatterPlotChart";

const TopByCoins = ({ filteredData }) => {
  return (
    <div>
      <div className="text-3xl text-center">When was the top by Coins</div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center">
          <ScatterPlotChart filteredData={filteredData} />
        </div>
        {/* <Legend /> */}
      </div>
    </div>
  );
};

export default TopByCoins;
