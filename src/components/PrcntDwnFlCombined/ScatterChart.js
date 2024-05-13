import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  LogarithmicScale,
  TimeScale,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import "chartjs-adapter-date-fns"; // Import date-fns adapter

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  LogarithmicScale,
  TimeScale
);

const options = {
  scales: {
    y: {
      type: "linear",
      position: "left",
      min: -100, // Set minimum value for the y-axis
      max: 0, // Set maximum value for the y-axis
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
      type: "time",
      time: {
        displayFormats: {
          day: "yyyy-mm-dd",
        },
        tooltipFormat: "yyyy-mm-dd",
      },
      title: {
        display: true,
        text: "Date of Lowest Low After",
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
          const label = new Date(context.parsed.x).toLocaleDateString();
          const value = context.parsed.y;
          return `X: ${label}  Y: ${value}`;
        },
      },
    },
  },
};

const ScatterChart = ({ filteredData, scatterRef }) => {
  const greenData = filteredData.filter(
    (item) =>
      parseFloat(item["Percentage of Downfall_1"]) < 0 &&
      parseFloat(item["Percentage of Downfall_1"]) >= -30
  );
  const yellowData = filteredData.filter(
    (item) =>
      parseFloat(item["Percentage of Downfall_1"]) < -30 &&
      parseFloat(item["Percentage of Downfall_1"]) >= -50
  );
  const redData = filteredData.filter(
    (item) => parseFloat(item["Percentage of Downfall_1"]) < -50
  );

  const datasets = [
    {
      label: "Green",
      data: greenData.map((item) => ({
        x: new Date(item["Date of Lowest Low After"]),
        y: parseFloat(item["Percentage of Downfall_1"]),
      })),
      backgroundColor: "rgba(75, 192, 192, 1)", // Green color range
    },
    {
      label: "Yellow",
      data: yellowData.map((item) => ({
        x: new Date(item["Date of Lowest Low After"]),
        y: parseFloat(item["Percentage of Downfall_1"]),
      })),
      backgroundColor: "rgba(255, 205, 86, 1)", // Yellow color range
    },
    {
      label: "Red",
      data: redData.map((item) => ({
        x: new Date(item["Date of Lowest Low After"]),
        y: parseFloat(item["Percentage of Downfall_1"]),
      })),
      backgroundColor: "rgba(255, 99, 132, 1)", // Red color range
    },
  ];

  return (
    <div ref={scatterRef} className="h-full w-full z-10">
      <Scatter data={{ datasets }} options={options} />;
    </div>
  );
};

export default ScatterChart;
