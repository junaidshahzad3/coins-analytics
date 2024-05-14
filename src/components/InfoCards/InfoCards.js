import React, { useState, useEffect } from "react";
import studyData from "../../data/Study.json";

const calculateStatistics = (data) => {
  const btcData = data.find((d) => d.Symbol === "BTC");

  // Parse and filter numeric values
  const xAnstiege = data
    .map((d) => parseFloat(d["X Anstieg"]))
    .filter((value) => !isNaN(value));
  const abfaelle = data
    .map((d) => parseFloat(d["Percentage of Downfall"]))
    .filter((value) => !isNaN(value));

  // Calculate averages
  const avgXAnstieg = parseFloat(
    (xAnstiege.reduce((a, b) => a + b, 0) / xAnstiege.length).toFixed(3)
  );
  const avgAbfaelle = parseFloat(
    (abfaelle.reduce((a, b) => a + b, 0) / abfaelle.length).toFixed(3)
  );

  // Sort arrays for median calculation
  xAnstiege.sort((a, b) => a - b);
  abfaelle.sort((a, b) => a - b);

  // Calculate medians
  const medianXAnstieg =
    xAnstiege.length % 2 === 0
      ? parseFloat(
          (
            (xAnstiege[xAnstiege.length / 2 - 1] +
              xAnstiege[xAnstiege.length / 2]) /
            2
          ).toFixed(3)
        )
      : parseFloat(xAnstiege[Math.floor(xAnstiege.length / 2)].toFixed(3));

  const medianAbfaelle =
    abfaelle.length % 2 === 0
      ? parseFloat(
          (
            (abfaelle[abfaelle.length / 2 - 1] +
              abfaelle[abfaelle.length / 2]) /
            2
          ).toFixed(3)
        )
      : parseFloat(abfaelle[Math.floor(abfaelle.length / 2)].toFixed(3));

  // Calculate counts
  const abfaelleGreaterThanBTC = abfaelle.filter(
    (a) => a > btcData["Percentage of Downfall"]
  ).length;
  const abfaelleLessThanBTC = abfaelle.filter(
    (a) => a < btcData["Percentage of Downfall"]
  ).length;

  return {
    avgXAnstieg,
    medianXAnstieg,
    avgAbfaelle,
    medianAbfaelle,
    abfaelleGreaterThanBTC,
    abfaelleLessThanBTC,
  };
};

const InfoCards = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const calculatedStats = calculateStatistics(studyData);
    setStats(calculatedStats);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
      <div className="shadow-lg rounded-xl p-4 text-center text-xl border border-slate-300">
        <h3 className="font-semibold">Average of X Anstiege</h3>
        <p>{stats.avgXAnstieg}</p>
      </div>
      <div className="shadow-lg rounded-xl p-4 text-center text-xl border border-slate-300">
        <h3 className="font-semibold">Median of X Anstiege</h3>
        <p>{stats.medianXAnstieg}</p>
      </div>
      <div className="shadow-lg rounded-xl p-4 text-center text-xl border border-slate-300">
        <h3 className="font-semibold">Average of Abfälle</h3>
        <p>{stats.avgAbfaelle}</p>
      </div>
      <div className="shadow-lg rounded-xl p-4 text-center text-xl border border-slate-300">
        <h3 className="font-semibold">Median of Abfälle</h3>
        <p>{stats.medianAbfaelle}</p>
      </div>
      <div className="shadow-lg rounded-xl p-4 text-center text-xl border border-slate-300">
        <h3 className="font-semibold">{"Abfälle > BTC"}</h3>
        <p>{stats.abfaelleGreaterThanBTC}</p>
      </div>
      <div className="shadow-lg rounded-xl p-4 text-center text-xl border border-slate-300">
        <h3 className="font-semibold">{"Abfälle < BTC"}</h3>
        <p>{stats.abfaelleLessThanBTC}</p>
      </div>
    </div>
  );
};

export default InfoCards;
