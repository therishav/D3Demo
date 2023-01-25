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
  scaleBand,
} from "d3";
require("./Styles.css");

function Bar() {
  const svgRef = useRef();
  const [data, setData] = useState<number[]>([25, 30, 45, 60, 20, 60, 75]);

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand().domain([0, 1, 2, 3, 4, 5, 6]).range([0, 300]);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const xAxis: any = axisBottom(xScale).ticks(data.length);

    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis: any = axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    svg.selectAll(".bar")
    .data(data)
    .join("rect")
    .att("class", "bar")
    .att("x", (value: any, index: any) => xScale(index));

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

export default Bar;
