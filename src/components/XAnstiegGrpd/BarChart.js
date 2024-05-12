// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";
// import { processData } from "./processData";
// import studyData from "../../data/Study.json";

// const BarChart = ({ filteredData }) => {
//   const ref = useRef();
//   const [processedData, setProcessedData] = useState(studyData || []);

//   //Change the charts data when the any filter is applied filter
//   useEffect(() => {
//     setProcessedData(processData(filteredData).reverse());
//   }, [filteredData]);

//   useEffect(() => {
//     const margin = { top: 30, right: 30, bottom: 40, left: 150 };
//     const width = 800 - margin.left - margin.right;
//     const height = 300 - margin.top - margin.bottom;

//     const svg = d3
//       .select(ref.current)
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const x = d3
//       .scaleLinear()
//       .domain([0, d3.max(processedData, (d) => d.value)])
//       .range([0, width]);

//     const y = d3
//       .scaleBand()
//       .range([0, height])
//       .domain(processedData.map((d) => d.name))
//       .padding(0.1);

//     svg
//       .selectAll("rect")
//       .data(processedData)
//       .enter()
//       .append("rect")
//       .attr("x", x(0))
//       .attr("y", (d) => y(d.name))
//       .attr("width", (d) => x(d.value))
//       .attr("height", y.bandwidth())
//       .attr("fill", (d) => d.color);

//     svg
//       .append("g")
//       .attr("transform", `translate(0,0)`)
//       .attr("color", "black")
//       .call(d3.axisLeft(y));

//     svg
//       .append("g")
//       .attr("transform", `translate(0,${height})`)
//       .attr("color", "black")
//       .call(d3.axisBottom(x));

//     return () => svg.selectAll("*").remove();
//   }, [processedData]);

//   return <svg ref={ref} />;
// };

// export default BarChart;

"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { processData } from "./processData";
import studyData from "../../data/Study.json";
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
  const [processedData, setProcessedData] = useState(studyData || []);

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
