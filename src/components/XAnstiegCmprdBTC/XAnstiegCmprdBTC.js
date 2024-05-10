"use client";
import React from "react";
import PieChart from "./PieChart";
import Legend from "./Legend";
import studyData from "../../data/Study.json";

const XAnstiegCmprdBTC = () => {
  return (
    <div>
      <div className="text-3xl text-center">
        X Anstieg comparison between Bitcoin BTC and Other Coins
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center w-full">
          <PieChart filteredData={studyData} />
        </div>
        <Legend />
      </div>
    </div>
  );
};

export default XAnstiegCmprdBTC;
