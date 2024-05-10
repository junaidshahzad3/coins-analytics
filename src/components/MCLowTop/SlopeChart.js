import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const SlopeChart = ({ filteredData, selectedCoins }) => {
  const svgRef = useRef(null);
  const svgWidth = 800;
  const svgHeight = 500;

  useEffect(() => {
    const margin = { top: 60, right: 40, bottom: 88, left: 150 };
    const innerWidth = svgWidth - margin.left - margin.right;
    const innerHeight = svgHeight - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    // Clear existing content
    svg.selectAll("*").remove();

    const xScale = d3
      .scalePoint()
      .domain(["Lowest Low Before", "Highest High"]) // Positions on x-axis
      .range([0, innerWidth]);

    // Get all MC values as numbers for scaling
    const mcValues = filteredData.flatMap((d) => [
      Number(d["MC at Lowest Low Before"]),
      Number(d["MC at Highest High"]),
    ]);

    const yScale = d3
      .scaleLinear()
      .domain([Math.min(...mcValues), Math.max(...mcValues)]) // min to max range
      .range([innerHeight, 0]); // from bottom to top for y-scale

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    g.append("g").call(yAxis);
    g.append("g").call(xAxis).attr("transform", `translate(0,${innerHeight})`);

    // Draw lines connecting MC at lowest low before and highest high for each coin
    filteredData.forEach((d) => {
      g.append("line")
        .attr("x1", xScale("Lowest Low Before"))
        .attr("x2", xScale("Highest High"))
        .attr("y1", yScale(Number(d["MC at Lowest Low Before"])))
        .attr("y2", yScale(Number(d["MC at Highest High"])))
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

      // Add coin labels at both ends of the line
      g.append("text")
        .attr("x", xScale("Lowest Low Before"))
        .attr("y", yScale(Number(d["MC at Lowest Low Before"])) - 5) // slightly above the point
        .attr("text-anchor", "end")
        .text(d["Coinname + Ticker"]);

      g.append("text")
        .attr("x", xScale("Highest High"))
        .attr("y", yScale(Number(d["MC at Highest High"])) - 5) // slightly above the point
        .attr("text-anchor", "start")
        .text(d["Coinname + Ticker"]);
    });
  }, [filteredData]);

  return <svg ref={svgRef}></svg>;
};

export default SlopeChart;
