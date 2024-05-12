// "use client";
// import * as d3 from "d3";
// import { useEffect, useRef, useState } from "react";
// import studyData from "../../data/Study.json";
// import { processData } from "./processData";

// const PieChart = ({ filteredData }) => {
//   const ref = useRef();
//   const [processedData, setProcessedData] = useState(studyData || []);

//   //Change the charts data when the any filter is applied filter
//   useEffect(() => {
//     setProcessedData(processData(filteredData));
//   }, [filteredData]);

//   useEffect(() => {
//     // Create pie chart
//     const svg = d3.select(ref.current);
//     svg.selectAll("*").remove(); // Clear previous chart

//     const width = 300;
//     const height = 300;
//     const radius = Math.min(width, height) / 2;

//     const arc = d3
//       .arc()
//       .outerRadius(radius - 10)
//       .innerRadius(0);

//     const pie = d3
//       .pie()
//       .sort(null)
//       .value((d) => d.value);

//     const arcs = svg
//       .append("g")
//       .attr("transform", `translate(${width / 2}, ${height / 2})`)
//       .selectAll(".arc")
//       .data(pie(processedData))
//       .enter()
//       .append("g")
//       .attr("class", "arc");

//     arcs
//       .append("path")
//       .attr("d", arc)
//       .style("fill", (d) => d.data.color);

//     arcs
//       .append("text")
//       .attr("transform", (d) => `translate(${arc.centroid(d)})`)
//       .attr("dy", "0.35em")
//       .style("fill", "white")
//       .style("text-anchor", "middle")
//       .text((d) => `${Math.round((d.data.value / studyData.length) * 100)}%`);
//   }, [processedData]);

//   return <svg ref={ref} width={300} height={300} />;
// };

// export default PieChart;

"use client";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import studyData from "../../data/Study.json";
import { processData } from "./processData";
import { Pie } from "react-chartjs-2";

const PieChart = ({ filteredData }) => {
  const ref = useRef();
  const [processedData, setProcessedData] = useState(studyData || []);

  //Change the charts data when the any filter is applied filter
  useEffect(() => {
    setProcessedData(processData(filteredData));
  }, [filteredData]);

  const [data, setData] = useState({
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
    setData({
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

  return <Pie data={data} />;
};

export default PieChart;
