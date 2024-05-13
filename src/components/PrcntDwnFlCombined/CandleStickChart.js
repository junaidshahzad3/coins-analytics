import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CandleStickChart = ({ btcData, svgWidth, svgHeight }) => {
  const svgRef = useRef(null);
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

    svg
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", graphWidth)
      .attr("height", graphHeight)
      .style("fill", "url(#backgroundGradient)");

    // Candlestick chart specific settings
    const candlestickXValue = (d) => new Date(d["Date"]);
    const candlestickYValue = (d) => [
      +parseFloat(d["Low"]),
      +parseFloat(d["High"]),
      +parseFloat(d["Open"]),
      +parseFloat(d["Close"]),
    ];

    const candlestickXScale = d3
      .scaleTime()
      .domain(d3.extent(btcData, candlestickXValue))
      .range([0, innerWidth]);
    const candlestickYScale = d3
      .scaleLinear()
      .domain([0, d3.max(btcData, (d) => parseFloat(d["High"]))])
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
        .attr("stroke-width", 1);

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
        .attr(
          "fill",
          candlestick[2] > candlestick[3]
            ? "rgba(255, 99, 132, 1)"
            : "rgba(75, 192, 192, 1)"
        );
    });

    // Hide axes
    svg.selectAll(".axis").style("display", "none");
  }, [btcData, svgWidth, svgHeight]);

  return <svg ref={svgRef} className="absolute"></svg>;
};

export default CandleStickChart;
