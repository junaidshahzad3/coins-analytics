import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const SlopeChart = ({ filteredData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Take only the first 5 entries for initial display
    const data = filteredData.slice(0, 10);
    const labels = ["Highest High", "Lowest Low After"];
    const datasets = [];

    // Generate random colors for each dataset
    const colors = generateRandomColors(data.length);

    // Prepare data for Chart.js
    data.forEach((item, index) => {
      const color = colors[index];
      const dataset = {
        label: item["Coinname + Ticker"],
        data: [
          { x: "Highest High", y: Number(item["Rank Highest High"]) },
          { x: "Lowest Low After", y: Number(item["Rank Lowest Low After"]) },
        ],
        borderColor: color,
        backgroundColor: color,
      };
      datasets.push(dataset);
    });

    setChartData({
      labels: labels,
      datasets: datasets,
    });
  }, [filteredData]);

  // Function to generate random colors
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }
    return colors;
  };

  return (
    <div>
      <div className="text-3xl text-center mb-2">Rank Top - Low</div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center w-full">
          {chartData && <Line data={chartData} />}
        </div>
      </div>
    </div>
  );
};

export default SlopeChart;
