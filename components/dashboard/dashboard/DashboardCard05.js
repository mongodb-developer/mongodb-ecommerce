import { useState, useEffect, useRef } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

function DashboardCard05() {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-advocacydemoapps-xchkk",
  });
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);

  let chartId = "63c1a92e-281e-4507-8be3-07b69bb7d853";
  let width = "77.7vw";
  let height = "30vw";
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
      id="dashboardCard05"
      className="w-max bg-white shadow-lg rounded-sm border border-gray-200"
      style={{ width: "100%" }}
    >
      <div className="p-5 flex w-full relative">
        <div className="w-full" style={{ height: "40rem" }} ref={chartDiv} />
      </div>
    </div>
  );
}

export default DashboardCard05;
