import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ScatterPlotChart = ({ filteredData }) => {
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

    // Clear SVG
    svg.selectAll("*").remove();

    const title = "Percentage of Downfall_1";

    const yValue = (d) => Number(d["Percentage of Downfall_1"].slice(0, -1)); // convert "-99%" string to a usable number
    const yAxisLabel = "Percentage of Downfall_1";

    const xValue = (d) => {
      // Convert the field to a Date object
      return new Date(d["Date of Lowest Low After"]);
    };
    const xAxisLabel = "Date of Lowest Low After";

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(filteredData, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([-100, 0]) // fixed range from 0 to -100
      .range([innerHeight, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const dateFormat = d3.timeFormat("%Y-%m-%d");

    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickFormat(dateFormat)
      .tickPadding(15);

    const yAxis = d3
      .axisLeft(yScale)
      .tickValues(d3.range(0, -110, -10)) // custom tick values
      .tickSize(-innerWidth)
      .tickPadding(10);

    const yAxisG = g.append("g").call(yAxis);
    yAxisG.selectAll(".domain").remove();

    yAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", -93)
      .attr("x", -innerHeight / 2)
      .attr("fill", "black")
      .attr("transform", `rotate(-90)`)
      .attr("text-anchor", "middle")
      .text(yAxisLabel);

    const xAxisG = g
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`);

    xAxisG.select(".domain").remove();

    xAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", 75)
      .attr("x", innerWidth / 2)
      .attr("fill", "black")

      .text(xAxisLabel);

    g.selectAll("circle")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("cy", (d) => yScale(yValue(d)))
      .attr("cx", (d) => xScale(xValue(d)))
      .attr("r", 3);

    // g.append("text").attr("class", "title").attr("y", -10).text(title);
  }, [filteredData]);

  return <svg ref={svgRef}></svg>;
};

export default ScatterPlotChart;
