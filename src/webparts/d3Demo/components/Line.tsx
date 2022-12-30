import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  scaleLinear,
  NumberValue,
  Axis,
  axisRight,
} from "d3";

require("./Styles.css");

function Line() {
  const svgRef = useRef();
  const [data, setData] = useState<number[]>([25, 30, 45, 60, 20, 60, 75]);

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const xAxis: any = axisBottom(xScale).ticks(data.length);

    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis: any = axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    // generates the "d" attribute of a path element
    const myLine = line<any>()
      .x((value, index, data) => xScale(index))
      .y((value) => yScale(value))
      .curve(curveCardinal);

    // renders path element, and attaches
    // the "d" attribute from line generator above
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("d", (value) => myLine(value))
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
    <>
      <svg ref={svgRef}>
        {/* <path d="M0, 150 100, 100 150, 120" stroke="blue" fill="none" /> */}
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
      <br />
      <br />
      <button
        onClick={() => {
          let arr = data.map((value) => value + 5);
          console.log(arr);
          setData(arr);
        }}
      >
        {"Update data"}
      </button>
      <button
        onClick={() => {
          setData(data.filter((value) => value < 35));
        }}
      >
        {"Filter data"}
      </button>
    </>
  );
}

export default Line;
