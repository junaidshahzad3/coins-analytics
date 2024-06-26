import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const SlopeChart = ({ filteredData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Take only the first 5 entries for initial display
    const data = filteredData.slice(0, 10);
    const labels = ["Lowest Low Before", "Highest High"];

    const datasets = data.map((item, index) => {
      const color = getRandomColor();
      return {
        label: item["Coinname + Ticker"],
        data: [
          { x: "Lowest Low Before", y: Number(item["Rank Lowest Low Before"]) },
          { x: "Highest High", y: Number(item["Rank Highest High"]) },
        ],
        borderColor: color,
        backgroundColor: color,
      };
    });

    setChartData({
      labels: labels,
      datasets: datasets,
    });
  }, [filteredData]);

  // Function to generate random colors
  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  // Chart.js options
  const options = {
    scales: {
      x: {
        type: "category",
      },
      y: {
        type: "linear",
        beginAtZero: false,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div>
      <div className="text-3xl text-center mb-2">Rank Low - Top</div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center w-full">
          {chartData && <Line data={chartData} options={options} />}
        </div>
      </div>
    </div>
  );
};

export default SlopeChart;
