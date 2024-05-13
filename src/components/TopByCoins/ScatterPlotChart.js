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
      type: "logarithmic",
      position: "left",
      min: 0.1,
      max: 20000000000.0,
      ticks: {
        callback: function (value, index, values) {
          return Number(value.toString());
        },
      },
      title: {
        display: true,
        text: "Highest High",
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
        text: "Date of Highest High",
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

const ScatterPlotChart = ({ filteredData }) => {
  const data = {
    datasets: [
      {
        label: "Low",
        data: filteredData
          .filter((item) => parseFloat(item["Highest High"]) <= 21)
          .map((item) => ({
            x: new Date(item["Date of Highest High"]),
            y: parseFloat(item["Highest High"]),
            name: item["Highest High"],
          })),
        backgroundColor: "rgba(255, 99, 132, 1)", // red
      },
      {
        label: "High",
        data: filteredData
          .filter((item) => parseFloat(item["Highest High"]) > 21)
          .map((item) => ({
            x: new Date(item["Date of Highest High"]),
            y: parseFloat(item["Highest High"]),
            name: item["Highest High"],
          })),
        backgroundColor: "rgba(75, 192, 192, 1)", // yellow
      },
    ],
  };

  return <Scatter options={options} data={data} />;
};

export default ScatterPlotChart;
