import { useState, useEffect } from "react";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import WelcomeBanner from "../../components/dashboard/dashboard/WelcomeBanner";
// import DashboardAvatars from '../../components/dashboard/dashboard/DashboardAvatars';
import FilterButton from "../../components/dashboard/actions/FilterButton";
import Datepicker from "../../components/dashboard/actions/Datepicker";
// import DashboardCard01 from '../components/dashboard/dashboard/DashboardCard01';
// import DashboardCard02 from '../components/dashboard/dashboard/DashboardCard02';
// import DashboardCard03 from '../components/dashboard/dashboard/DashboardCard03';
// import DashboardCard04 from '../components/dashboard/dashboard/DashboardCard04';
// import DashboardCard05 from '../components/dashboard/dashboard/DashboardCard05';
// import DashboardCard06 from '../components/dashboard/dashboard/DashboardCard06';
// import DashboardCard07 from '../components/dashboard/dashboard/DashboardCard07';
// import DashboardCard08 from '../components/dashboard/dashboard/DashboardCard08';
// import DashboardCard09 from '../components/dashboard/dashboard/DashboardCard09';
// import DashboardCard10 from '../components/dashboard/dashboard/DashboardCard10';
// import DashboardCard11 from '../components/dashboard/dashboard/DashboardCard11';
// import DashboardCard12 from '../components/dashboard/dashboard/DashboardCard12';
// import DashboardCard13 from '../components/dashboard/dashboard/DashboardCard13';
import Banner from "../../components/dashboard/Banner";

function Dashboard() {
  const { user, error, isLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(async () => {
    const response = await fetch("/api/dashboard");
    const data = await response.json();
    // console.log(data);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-end sm:items-center mb-8">
              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                <Datepicker />
              </div>
            </div>

            {/* Cards */}
            {/* <div className="grid grid-cols-12 gap-6"> */}
            <div id="atlasCharts">
              <img src="/images/charts.jpg" alt="charts" className="w-full" />
              {/* Line chart (Acme Plus) */}
              {/* <DashboardCard01 /> */}
              {/* Line chart (Acme Advanced) */}
              {/* <DashboardCard02 /> */}
              {/* Line chart (Acme Professional) */}
              {/* <DashboardCard03 /> */}
              {/* Bar chart (Direct vs Indirect) */}
              {/* <DashboardCard04 /> */}
              {/* Line chart (Real Time Value) */}
              {/* <DashboardCard05 /> */}
              {/* Doughnut chart (Top Countries) */}
              {/* <DashboardCard06 /> */}
              {/* Table (Top Channels) */}
              {/* <DashboardCard07 /> */}
              {/* Line chart (Sales Over Time) */}
              {/* <DashboardCard08 /> */}
              {/* Stacked bar chart (Sales VS Refunds) */}
              {/* <DashboardCard09 /> */}
              {/* Card (Customers) */}
              {/* <DashboardCard10 /> */}
              {/* Card (Reasons for Refunds) */}
              {/* <DashboardCard11 /> */}
              {/* Card (Recent Activity) */}
              {/* <DashboardCard12 /> */}
              {/* Card (Income/Expenses) */}
              {/* <DashboardCard13 /> */}
            </div>
          </div>
        </main>

        {/* <Banner /> */}
      </div>
    </div>
  );
}

export default Dashboard;

export const getServerSideProps = withPageAuthRequired();
