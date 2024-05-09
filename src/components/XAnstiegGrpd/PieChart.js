"use client";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { processData } from "./processData";
import studyData from "../../data/Study.json";

const PieChart = ({ filteredData }) => {
  const ref = useRef();
  const [processedData, setProcessedData] = useState(studyData || []);

  //Change the charts data when the any filter is applied filter
  useEffect(() => {
    setProcessedData(processData(filteredData));
  }, [filteredData]);

  useEffect(() => {
    const svg = d3.select(ref.current);
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);

    const arcs = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .selectAll(".arc")
      .data(pie(processedData))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .style("fill", (d) => d.data.color);

    // Calculate the total value of the pie chart for percentage calculations
    const total = d3.sum(processedData, (d) => d.value);

    // Append text (percentage) to each arc slice
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", "0.35em")
      .style("fill", "white") // White text
      .style("text-anchor", "start") // Center text alignment
      .text((d) => `${Math.round((d.data.value / total) * 100)}%`); // Formatting to 2 decimal places

    // Add black background for text
    arcs
      .insert("rect", "text") // Insert before text
      .attr("x", (d) => arc.centroid(d)[0] - 10) // Center the rectangle
      .attr("y", (d) => arc.centroid(d)[1] - 10)
      .attr("width", 50) // Set rectangle size
      .attr("height", 20)
      .attr("fill", "gray"); // Black background
    return () => svg.selectAll("*").remove(); // Cleanup SVG elements on component unmount
  }, [processedData]);

  return <svg ref={ref} width={300} height={300} />;
};

// Function to get unique categories

export default PieChart;
