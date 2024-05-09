import React from "react";
import ScatterPlotChart from "./ScatterPlotChart";

const XAntiegByCoins = ({ filteredData }) => {
  return (
    <div>
      <div className="text-3xl text-center">
        X Anstieg comparison between Bitcoin BTC and Other Coins
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center">
          <ScatterPlotChart filteredData={filteredData} />
        </div>
        {/* <Legend /> */}
      </div>
    </div>
  );
};

export default XAntiegByCoins;
