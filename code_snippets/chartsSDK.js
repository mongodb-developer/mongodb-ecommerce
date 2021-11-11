const chartsSDK = `// Charts SDK example in React.js

import { useState, useEffect, useRef } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

function EmbeddedChart() {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-mongodb-e-commerce-pbnsa",
  });

  const chartDiv = useRef(null);
  const chartId = "03a7fc41-75e6-4e87-8fe1-2c94d7e8559a";
  const [chart] = useState(
    sdk.createChart({
      chartId: chartId,
      width: 600px,
      height: 400px,
      theme: "light",
    })
  );

  useEffect(() => {
    chart
      .render(chartDiv.current)
      .catch((err) => console.log("Error during Charts rendering.", err));
  }, [chart]);

  return <div ref={chartDiv} />;
}

export default EmbeddedChart;
`;

export default chartsSDK;
