import { useState, useEffect, useRef } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

function DashboardCard02() {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-mongodb-e-commerce-pbnsa",
  });
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);

  let chartId = "03a7fc41-75e6-4e87-8fe1-2c94d7e8559a";
  const [chart] = useState(
    sdk.createChart({
      chartId: chartId,
      // height: height,
      // width: width,
      theme: "light",
    })
  );

  useEffect(() => {
    chart
      .render(chartDiv.current)
      .then(() => setRendered(true))
      .catch((err) => console.log("Error during Charts rendering.", err));
  }, [chart]);

  // useEffect(() => {
  //   if (rendered) {
  //     chart
  //       .setFilter(filter)
  //       .catch((err) => console.log("Error while filtering.", err));
  //   }
  // }, [chart, filter, rendered]);

  return (
    <div
      id="dashboardCard02"
      className="w-max bg-white shadow-lg rounded-sm border border-gray-200"
      style={{ width: "56%" }}
    >
      <div className="p-5 flex w-full relative">
        <div className="w-full h-96" ref={chartDiv} />
      </div>
    </div>
  );
}

export default DashboardCard02;
