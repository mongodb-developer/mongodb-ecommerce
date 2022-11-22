import { useState, useEffect, useRef } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

function DashboardCard03() {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-reinvent2021-kldzv",
  });
  const currentDate = new Date();
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [date, setDate] = useState(3);
  const [dateFilter, setDateFilter] = useState({
    created: {
      $gte: {
        $date: new Date(
          new Date().setMonth(currentDate.getMonth() - date)
        ).toISOString(),
      },
      $lt: { $date: currentDate.toISOString() },
    },
  });

  let chartId = "618eda56-8473-46ee-8910-ac40fc050013";
  const [chart] = useState(
    sdk.createChart({
      chartId: chartId,
      theme: "light",
    })
  );

  useEffect(() => {
    chart
      .render(chartDiv.current)
      .then(() => setRendered(true))
      .catch((err) => console.log("Error during Charts rendering.", err));
  }, [chart]);

  useEffect(() => {
    if (rendered) {
      chart
        .setFilter(dateFilter)
        .catch((err) => console.log("Error while filtering.", err));
    }
  }, [chart, dateFilter, rendered]);

  const handleDateChange = (e) => {
    const months = e.target.value;
    setDate(months);
    const filter = {
      created: {
        $gte: {
          $date: new Date(
            new Date().setMonth(currentDate.getMonth() - months)
          ).toISOString(),
        },
        $lt: { $date: currentDate.toISOString() },
      },
    };
    setDateFilter(filter);
  };

  return (
    <div
      id="dashboardCard03"
      className="w-max bg-white shadow-lg rounded-sm border border-gray-200"
      style={{ width: "42%" }}
    >
      <label id="timeChart" className="py-5 px-8 inline-block">
        Time Period:
        <select value={date} onChange={handleDateChange}>
          <option value={3}>Previous 3 Months</option>
          <option value={6}>Previous 6 Months</option>
          <option value={12}>Previous 12 Months</option>
        </select>
      </label>
      <div className="p-5 flex w-full relative">
        <div className="w-full h-96" ref={chartDiv} />
      </div>
    </div>
  );
}

export default DashboardCard03;
