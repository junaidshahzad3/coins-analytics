import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CandleStickScatterCmbnd = ({ filteredData, btcData }) => {
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

    // Scatterplot specific settings
    const yValue = (d) => Number(d["Percentage of Downfall_1"].slice(0, -1)); // convert "-99%" string to a usable number
    const yAxisLabel = "Percentage of Downfall_1";

    const xValue = (d) => new Date(d["Date of Lowest Low After"]);
    const xAxisLabel = "Date of Lowest Low After";

    const xScale = d3
      .scaleTime()
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

    // Draw scatterplot
    g.selectAll("circle")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("cy", (d) => yScale(yValue(d)))
      .attr("cx", (d) => xScale(xValue(d)))
      .attr("r", 3);

    // Candlestick chart specific settings
    const candlestickXValue = (d) => new Date(d["Date"]);
    const candlestickYValue = (d) => [
      +d["Low"],
      +d["High"],
      +d["Open"],
      +d["Close"],
    ];

    const candlestickXScale = d3
      .scaleTime()
      .domain(d3.extent(btcData, candlestickXValue))
      .range([0, innerWidth]);
    const candlestickYScale = d3
      .scaleLinear()
      .domain([0, d3.max(btcData, (d) => d["High"])])
      .range([innerHeight, 0]);

    const candlestickG = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const candlestickWidth = 5; // Adjust as needed

    btcData.forEach((d) => {
      const candlestick = candlestickYValue(d);
      const x = candlestickXScale(candlestickXValue(d));

      candlestickG
        .append("line")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", candlestickYScale(candlestick[0]))
        .attr("y2", candlestickYScale(candlestick[1]))
        .attr("stroke", "black")
        .attr("stroke-width", candlestickWidth);

      candlestickG
        .append("rect")
        .attr("x", x - candlestickWidth / 2)
        .attr("y", candlestickYScale(Math.max(candlestick[2], candlestick[3])))
        .attr("width", candlestickWidth)
        .attr(
          "height",
          Math.abs(
            candlestickYScale(candlestick[2]) -
              candlestickYScale(candlestick[3])
          )
        )
        .attr("fill", candlestick[2] > candlestick[3] ? "red" : "green");
    });
  }, [filteredData, btcData]);

  return <svg ref={svgRef}></svg>;
};

export default CandleStickScatterCmbnd;
