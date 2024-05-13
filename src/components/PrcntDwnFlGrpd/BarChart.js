"use client";
import React, { useEffect, useRef, useState } from "react";
import { processData } from "./processData";
import studyData from "../../data/Study.json";
import { Bar } from "react-chartjs-2";

const BarChart = ({ filteredData, filter }) => {
  const ref = useRef();
  const [processedData, setProcessedData] = useState(studyData || []);

  //Change the charts data when the any filter is applied filter
  useEffect(() => {
    setProcessedData(processData(filteredData, filter).reverse());
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
  const [data, setData] = useState({
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
    setData({
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

  return <Bar options={options} data={data} />;
};
export default BarChart;
