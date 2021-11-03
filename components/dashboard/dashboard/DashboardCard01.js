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
          src="https://charts.mongodb.com/charts-mongodb-e-commerce-pbnsa/embed/charts?id=f8f62ebd-a046-4800-990e-6f127e16e78e&maxDataAge=3600&theme=light&autoRefresh=true"
        ></iframe>
      </div>
    </div>
  );
}

export default DashboardCard01;
