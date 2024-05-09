import React from "react";
import PieChart from "./PieChart";
import Legend from "./Legend";

const XAnstiegCmprdBTC = ({ filteredData }) => {
  return (
    <div>
      <div className="text-3xl text-center">X Anstieg comparison between Bitcoin BTC and Other Coins</div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center">
          <PieChart filteredData={filteredData} />
        </div>
        <Legend />
      </div>
    </div>
  );
};

export default XAnstiegCmprdBTC;
