import { csv } from "d3";
import * as React from "react";
import { useEffect, useState } from "react";

const csvUrl =
  "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

function Pie() {
  const [data, setData] = useState(null);
  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  return <div>Pie</div>;
}

export default Pie;
