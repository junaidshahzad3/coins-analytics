import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  LogarithmicScale,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  LogarithmicScale
);

const options = {
  scales: {
    y: {
      type: "logarithmic",
      position: "left",
      min: 0.1,
      max: 1000000000.0,
      ticks: {
        callback: function (value, index, values) {
          return Number(value.toString());
        },
      },
      title: {
        display: true,
        text: "X Anstieg",
      },
    },
    x: {
      title: {
        display: true,
        text: "Index",
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
          return `${context.raw.name}: ${context.parsed.y}`;
        },
      },
    },
  },
};

const ScatterPlotChart = ({ filteredData }) => {
  const data = {
    datasets: [
      {
        label: "Low",
        data: filteredData
          .filter((item) => parseFloat(item["X Anstieg"]) <= 10)
          .map((item) => ({
            x: item.index,
            y: parseFloat(item["X Anstieg"]),
            name: item["Coinname + Ticker"],
          })),
        backgroundColor: "rgba(255, 99, 132, 1)", // red
      },
      {
        label: "Normal",
        data: filteredData
          .filter(
            (item) =>
              parseFloat(item["X Anstieg"]) > 10 &&
              parseFloat(item["X Anstieg"]) <= 25
          )
          .map((item) => ({
            x: item.index,
            y: parseFloat(item["X Anstieg"]),
            name: item["Coinname + Ticker"],
          })),
        backgroundColor: "rgba(255, 205, 86, 1)", // yellow
      },
      {
        label: "High",
        data: filteredData
          .filter((item) => parseFloat(item["X Anstieg"]) > 25)
          .map((item) => ({
            x: item.index,
            y: parseFloat(item["X Anstieg"]),
            name: item["Coinname + Ticker"],
          })),
        backgroundColor: "rgba(75, 192, 192, 1)", // green
      },
    ],
  };

  return <Scatter options={options} data={data} />;
};

export default ScatterPlotChart;
