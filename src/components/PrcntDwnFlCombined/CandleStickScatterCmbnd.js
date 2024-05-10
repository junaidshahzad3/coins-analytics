import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CandleStickScatterCmbnd = ({ filteredData }) => {
  const svgRef = useRef(null);
  const svgWidth = 800;
  const svgHeight = 500;

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 70, left: 40 };
    const innerWidth = svgWidth - margin.left - margin.right;
    const innerHeight = svgHeight - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("viewBox", [0, 0, svgWidth, svgHeight]);

    svg.selectAll("*").remove(); // Clear previous SVG contents

    const xScale = d3
      .scaleBand()
      .domain(filteredData.map((d) => d["Coinname + Ticker"]))
      .range([margin.left, innerWidth - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(filteredData, (d) => Number(d["Percentage of Downfall"])),
      ])
      .nice()
      .range([innerHeight - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", `translate(0,${innerHeight - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    // Candlestick bars
    svg
      .selectAll(".bar")
      .data(filteredData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d["Coinname + Ticker"]))
      .attr("y", (d) => yScale(d["Percentage of Downfall"]))
      .attr("width", xScale.bandwidth())
      .attr(
        "height",
        (d) => innerHeight - margin.bottom - yScale(d["Percentage of Downfall"])
      )
      .attr("fill", "steelblue");

    // Scatter plot points
    svg
      .selectAll(".dot")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr(
        "cx",
        (d) => xScale(d["Coinname + Ticker"]) + xScale.bandwidth() / 2
      )
      .attr("cy", (d) => yScale(d["Percentage of Downfall"]))
      .attr("r", 5)
      .attr("fill", "red");
  }, [filteredData]);

  return <svg ref={svgRef}></svg>;
};

export default CandleStickScatterCmbnd;
