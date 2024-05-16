// src/components/MainComp/MainComp.js
"use client";

import { useEffect, useState } from "react";
import MainCompChild from "./MainCompChild";
import { getExcelData } from "@/app/api/readExcel/getExcelData";
import { getCSVData } from "@/app/api/readCSV/getCSVData";

export default function MainComp() {
  const [data, setData] = useState(null);
  const [btcData, setBtcData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [excelData, csvData] = await Promise.all([
          getExcelData(),
          getCSVData(),
        ]);
        setData(excelData);
        setBtcData(csvData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return <MainCompChild data={data} btcData={btcData} />;
}
