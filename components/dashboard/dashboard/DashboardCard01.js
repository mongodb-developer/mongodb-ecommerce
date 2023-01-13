function DashboardCard01() {
  return (
    <div
      id="dashboardCard01"
      className="w-max bg-white shadow-lg rounded-sm border border-gray-200"
      style={{ width: "42%" }}
    >
      <div className="p-5 flex w-full relative">
        <iframe
          className="w-full h-96"
          src="https://charts.mongodb.com/charts-advocacydemoapps-xchkk/embed/charts?id=63c1a36a-23d1-489f-8cec-81a842017436&maxDataAge=3600&theme=light&autoRefresh=true"
        ></iframe>
      </div>
    </div>
  );
}

export default DashboardCard01;
