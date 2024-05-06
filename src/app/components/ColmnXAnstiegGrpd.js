"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

const ColmnXAnstiegGrpd = ({ data }) => {
  console.log("data", data);
  const ref = useRef();

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

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcs = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .style("fill", (d) => d.data.color);

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", "0.35em")
      .text((d) => d.data.name);

    return () => svg.selectAll("*").remove(); // Cleanup SVG elements on component unmount
  }, [data]);

  return <svg ref={ref} width={300} height={300} />;
};

export default ColmnXAnstiegGrpd;
