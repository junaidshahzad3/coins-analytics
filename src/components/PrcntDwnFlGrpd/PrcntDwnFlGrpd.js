import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import Legend from "./Legend";
import { ColorsWith5Diff } from "./Colors";

const PrcntDwnFlGrpd = ({ filteredData }) => {
  return (
    <div>
      <div className="text-3xl text-center">Percentage of downfall grouped</div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center">
          <PieChart filteredData={filteredData} filter="10" />
          <BarChart filteredData={filteredData} filter="10" />
          <BarChart filteredData={filteredData} filter="5" />
        </div>
        <Legend Colors={ColorsWith5Diff} />
      </div>
    </div>
  );
};

export default PrcntDwnFlGrpd;
