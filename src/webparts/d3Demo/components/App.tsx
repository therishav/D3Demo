import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { select } from "d3";
import { update } from "@microsoft/sp-lodash-subset";
import { values } from "lodash";

const data: number[] = [25, 30, 45, 60, 20];

function App() {
  const [data, setData] = useState<number[]>([25, 30, 45, 60, 20]);
  const svgRef = useRef();

  // to access svgRef use it inside useEffect
  useEffect(() => {
    console.log(svgRef);

    // wrapping svg using d3 select
    const svg = select(svgRef.current);

    svg
      .selectAll("circle")
      .data(data)
      .join(
        (enter) => enter.append("circle").attr("class", "new"),
        (update) => update.attr("class", "updated"),
        (exit) => exit.remove()
      )
      .attr("r", (value: number) => value)
      .attr("cx", (value: number) => value * 2)
      .attr("cy", (value: number) => value * 2)
      .attr("stroke", "red");
  }, [data]);

  return (
    <>
      <svg ref={svgRef}> </svg>
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

export default App;
