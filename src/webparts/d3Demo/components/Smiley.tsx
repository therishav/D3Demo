import * as React from "react";
import { arc } from "d3";
import { } from "styled-components"

const width = 815;
const height = 571;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 20;
const eyeOffsetX = 100;
const eyeOffsetY = 100;
const eyeRadius = 40;
const mouthWidth = 20;
const mouthRadius = 140;

console.log(arc);

const mouthArc: any = arc()
  .innerRadius(mouthRadius)
  .outerRadius(mouthRadius - mouthWidth)
  .startAngle(Math.PI / 2)
  .endAngle((Math.PI * 3) / 2);

function Smiley() {
  return (
    <>
      {/* <div style={{ marginBottom: "20px" }}>Smiley</div> */}
      <svg width={width} height={height}>
        <g transform={`translate(${centerX}, ${centerY})`}>
          <circle
            //   cx={centerX}
            //   cy={centerY}
            r={centerY - strokeWidth / 2}
            fill="yellow"
            stroke="black"
            stroke-width={strokeWidth}
          ></circle>
          <circle cx={-eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius}></circle>
          <circle cx={eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius}></circle>
          <path d={mouthArc()} />
        </g>
      </svg>
    </>
  );
}

export default Smiley;
