"use client";
import React, { useEffect, useRef, useState } from "react";
import { processData } from "./processData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ filteredData }) => {
  const ref = useRef();
  const [processedData, setProcessedData] = useState(filteredData || []);

  //Change the charts data when the any filter is applied filter
  useEffect(() => {
    setProcessedData(processData(filteredData).reverse());
  }, [filteredData]);

  const options = {
    indexAxis: "y", // Define horizontal bar chart
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };
  const [chartData, setChartData] = useState({
    labels: processedData.map((item) => item.name) || [],
    datasets: [
      {
        label: "",
        data: processedData.map((item) => item.value) || [],
        borderColor: processedData.map((color) => color.color) || [],
        backgroundColor: processedData.map((color) => color.color) || [],
      },
    ],
  });
  useEffect(() => {
    setChartData({
      labels: processedData.map((item) => item.name) || [],
      datasets: [
        {
          label: "",
          data: processedData.map((item) => item.value) || [],
          borderColor: processedData.map((color) => color.color) || [],
          backgroundColor: processedData.map((color) => color.color) || [],
        },
      ],
    });
  }, [processedData]);

  return <Bar options={options} data={chartData} />;
};

export default BarChart;
