import * as d3 from "d3";
import * as React from "react";
import styled from "styled-components";

const Path = styled.path`
  fill: ${(props: { index: any }) => d3.schemePaired[props.index]};
  cursor: pointer;
  stroke: black;
`;

interface IDrillDownPie {
  pieData: any;
  x: any;
  y: any;
}

const Arc = (props: { arcData: any }) => {
  const [addRadius, setaddRadius] = React.useState(0);
  const arc = d3
    .arc()
    .innerRadius(15 + addRadius)
    .outerRadius(150 + addRadius);
  function mouseOver() {
    setaddRadius(30);
  }

  function mouseOut() {
    setaddRadius(0);
  }
  return (
    <Path
      d={arc(props.arcData)}
      index={props.arcData.data.index}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    />
  );
};

const DrillDownPie = (props: IDrillDownPie) => {
  const pie = d3.pie().value((d: any) => d.number);
  console.log(pie(props.pieData));

  return (
    <g transform={`translate(${props.x}, ${props.y})`}>
      {pie(props.pieData).map((d) => (
        <Arc arcData={d} />
      ))}
    </g>
  );
};

export default DrillDownPie;
