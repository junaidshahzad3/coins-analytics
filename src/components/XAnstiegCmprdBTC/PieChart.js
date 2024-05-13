"use client";
import { useEffect, useRef, useState } from "react";
import studyData from "../../data/Study.json";
import { processData } from "./processData";
import { Pie } from "react-chartjs-2";

const PieChart = ({ filteredData }) => {
  const ref = useRef();
  const [processedData, setProcessedData] = useState(studyData || []);

  //Change the charts data when the any filter is applied filter
  useEffect(() => {
    setProcessedData(processData(filteredData));
  }, [filteredData]);

  const [data, setData] = useState({
    labels: processedData.map((item) => item.name) || [],
    datasets: [
      {
        label: "",
        data: processedData.map((item) => item.value) | [],
        backgroundColor: processedData.map((item) => item.color),
        borderColor: processedData.map((item) => `${item.color}FF`), // Add alpha for border
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    setData({
      labels: processedData.map((item) => item.name) || [],
      datasets: [
        {
          label: "",
          data: processedData.map((item) => item.value),
          backgroundColor: processedData.map((item) => item.color),
          borderColor: processedData.map((item) => `${item.color}FF`), // Add alpha for border
          borderWidth: 1,
        },
      ],
    });
  }, [processedData]);

  return <Pie data={data} />;
};

export default PieChart;
