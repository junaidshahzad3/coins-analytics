import React from "react";
import PieChart from "./PieChart";

const PrcntDwnFlGrpdCmprdBTC = ({ data }) => {
  return (
    <div>
      <div className="text-3xl text-center mb-2">BTC Abfälle</div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center justify-center w-full h-[25rem] border border-slate-200 shadow-lg rounded-xl p-4">
          <PieChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default PrcntDwnFlGrpdCmprdBTC;
