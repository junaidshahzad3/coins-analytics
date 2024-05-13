import React from "react";
import { Scatter } from "react-chartjs-2";

const ScatterPlotChart = ({ filteredData }) => {
  // Define the options for Chart.js
  const options = {
    scales: {
      y: {
        type: "linear", // Use linear scale instead of logarithmic
        position: "left",
        min: -100, // Adjust the min and max values according to your data
        max: 0,
        ticks: {
          callback: function (value, index, values) {
            return Number(value.toString());
          },
        },
        title: {
          display: true,
          text: "Percentage of Downfall",
        },
      },
      x: {
        title: {
          display: true,
          text: "Count",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw.name}: ${context.raw.y}`; // Access raw data directly
          },
        },
      },
    },
  };

  // Prepare the data for Chart.js
  const data = {
    datasets: [
      {
        label: "Low",
        data: filteredData
          .filter(
            (item) =>
              Number(item["Percentage of Downfall_1"].slice(0, -1)) <= -50
          ) // Adjust the condition according to your categories
          .map((item) => ({
            x: Number(item["index"]),
            y: Number(item["Percentage of Downfall_1"].slice(0, -1)),
            name: item["Percentage of Downfall_1"],
          })),
        backgroundColor: "rgba(255, 99, 132, 1)", // red
      },
      {
        label: "Normal",
        data: filteredData
          .filter(
            (item) =>
              Number(item["Percentage of Downfall_1"].slice(0, -1)) > -50 &&
              Number(item["Percentage of Downfall_1"].slice(0, -1)) <= -25
          )
          .map((item) => ({
            x: Number(item["index"]),
            y: Number(item["Percentage of Downfall_1"].slice(0, -1)),
            name: item["Percentage of Downfall_1"],
          })),
        backgroundColor: "rgba(255, 205, 86, 1)", // yellow
      },
      {
        label: "High",
        data: filteredData
          .filter(
            (item) =>
              Number(item["Percentage of Downfall_1"].slice(0, -1)) > -25
          )
          .map((item) => ({
            x: Number(item["index"]),
            y: Number(item["Percentage of Downfall_1"].slice(0, -1)),
            name: item["Percentage of Downfall_1"],
          })),
        backgroundColor: "rgba(75, 192, 192, 1)", // green
      },
    ],
  };

  return <Scatter options={options} data={data} />;
};

export default ScatterPlotChart;
