import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { select } from "d3";

function Demo() {
  const divRef = useRef();

  useEffect(() => {
    const ref = select(divRef.current);
    console.log(ref);

    ref.selectAll("div").append("p").text("New Paragraph!");
  }, []);
  return <svg ref={divRef}></svg>;
}

export default Demo;
