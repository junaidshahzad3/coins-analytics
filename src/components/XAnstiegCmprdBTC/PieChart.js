"use client";
import { useEffect, useRef, useState } from "react";
import { processData } from "./processData";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  const ref = useRef();
  const [processedData, setProcessedData] = useState(data || []);

  //Change the charts data when the any filter is applied filter
  useEffect(() => {
    setProcessedData(processData(data));
  }, [data]);

  const [chartData, setChartData] = useState({
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
    setChartData({
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

  return <Pie data={chartData} />;
};

export default PieChart;
