import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ScatterPlotChart = ({ filteredData }) => {
  const svgRef = useRef(null);
  const svgWidth = 1200;
  const svgHeight = 800;
  const margin = { top: 60, right: 40, bottom: 88, left: 150 };
  const graphWidth = svgWidth - margin.left - margin.right;
  const graphHeight = svgHeight - margin.top - margin.bottom;

  useEffect(() => {
    const innerWidth = svgWidth - margin.left - margin.right;
    const innerHeight = svgHeight - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    // Clear SVG
    svg.selectAll("*").remove();

    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "backgroundGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "green");

    gradient.append("stop").attr("offset", "40%").attr("stop-color", "yellow");

    gradient.append("stop").attr("offset", "100%").attr("stop-color", "red");

    svg
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", graphWidth)
      .attr("height", graphHeight)
      .style("fill", "url(#backgroundGradient)");

    const title = "Percentage of Downfall_1";

    const yValue = (d) => Number(d["Percentage of Downfall_1"].slice(0, -1)); // convert "-99%" string to a usable number
    const yAxisLabel = "Percentage of Downfall_1";

    const xValue = (d) => Number(d["index"]);
    const xAxisLabel = "Count";

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

    const xAxis = d3.axisBottom(xScale).tickSize(-innerHeight).tickPadding(15);

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
