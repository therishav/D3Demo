import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { select, line, curveCardinal } from "d3";

function Line() {
  const svgRef = useRef();
  const [data, setData] = useState<number[]>([25, 30, 45, 60, 20, 60, 75]);

  useEffect(() => {
    const svg = select(svgRef.current);
    const myLine = line<any>()
      .x((value, index, data) => index * 50)
      .y((value) => value)
      .curve(curveCardinal);

    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", (value) => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
    <>
      <svg ref={svgRef}>
        {/* <path d="M0, 150 100, 100 150, 120" stroke="blue" fill="none" /> */}
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
      </svg>
    </>
  );
}

export default Line;
