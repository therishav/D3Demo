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
import styles from "./D3Demo.module.scss";
import { values } from "lodash";

require("./Styles.css");

function Bar() {
  const svgRef = useRef();
  const [data, setData] = useState<number[]>([25, 30, 45, 60, 20, 60, 75]);

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain([0, 1, 2, 3, 4, 5, 6])
      .range([0, 300])
      .padding(0.5);

    const yScale: any = scaleLinear().domain([0, 150]).range([150, 0]);

    const xAxis: any = axisBottom(xScale).ticks(data.length);

    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis: any = axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (value: any, index: any) => xScale(index))
      .attr("y", yScale)
      .attr("width", xScale.bandwidth())
      .attr("height", (value) => 150 - yScale(value));
  }, [data]);

  return (
    <>
      <svg ref={svgRef}>
        {/* <path d="M0, 150 100, 100 150, 120" stroke="blue" fill="none" /> */}
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <div className={styles.chartBtn}>
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
      </div>
    </>
  );
}

export default Bar;
