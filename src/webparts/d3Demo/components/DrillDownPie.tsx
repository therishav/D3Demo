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

const Arc = (props: { arcData: any; onClick: any }) => {
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
      onClick={props.onClick}
    />
  );
};

const DrillDownPie = (props: IDrillDownPie) => {
  const [renderData, setRenderData] = React.useState(props.pieData);

  const pie = d3.pie().value((d: any) => d.exchanges);
  console.log(pie(props.pieData));

  function drilldown(index: number) {
    console.log(props.pieData[index]);
    setRenderData(props.pieData[index].users);
  }

  function drillup() {
    setRenderData(props.pieData);
    console.log("Hello");
  }

  return (
    <g transform={`translate(${props.x}, ${props.y})`}>
      {pie(renderData).map((d) => (
        <Arc arcData={d} onClick={() => drilldown(d.index)} />
      ))}
      <circle
        cx={0}
        cy={0}
        r={15}
        onClick={() => drillup()}
        fill={"white"}
        cursor={"pointer"}
      />
    </g>
  );
};

export default DrillDownPie;
