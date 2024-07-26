/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const stockData = [
    {
      labels: [
        "00:00:00",
        "00:00:02", 
        "00:00:04", 
        "00:00:06", 
        "00:00:08", 
        "00:00:10", 
        "00:00:12", 
        "00:00:14", 
        "00:00:16", 
        "00:00:18"
      ],
      datasets: {
        label: "IBM",
        data: [181.44, 182.44, 183.44, 181.44, 183.44, 181.44, 184.44, 182.44, 183.44]
      }
    },
    {
      labels: [
        "00:00:00",
        "00:00:02", 
        "00:00:04", 
        "00:00:06", 
        "00:00:08", 
        "00:00:10", 
        "00:00:12", 
        "00:00:14", 
        "00:00:16", 
        "00:00:18"
      ],
      datasets: {
        label: "MSFT",
        data: [407.73, 401.73, 406.73, 405.73, 402.73, 403.73, 401.73, 406.73, 405.73]
      }
    },
    {
      labels: [
        "00:00:00",
        "00:00:02", 
        "00:00:04", 
        "00:00:06", 
        "00:00:08", 
        "00:00:10", 
        "00:00:12", 
        "00:00:14", 
        "00:00:16", 
        "00:00:18"
      ],
      datasets: {
        label: "TSLA",
        data: [141.73, 144.73, 142.73, 141.73, 143.73, 141.73, 144.73, 143.73, 144.73]
      }
    },
    {
      labels: [
        "00:00:00",
        "00:00:02", 
        "00:00:04", 
        "00:00:06", 
        "00:00:08", 
        "00:00:10", 
        "00:00:12", 
        "00:00:14", 
        "00:00:16", 
        "00:00:18"
      ],
      datasets: {
        label: "RACE",
        data: [425.6, 426.6, 427.6, 423.6, 422.6, 423.6, 424.6, 426.6, 421.6]
      }
    }
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}> 
            {stockData.map((stock, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="dark"
                    title={stock.datasets.label}
                    date="updated 2 seconds ago"
                    chart={stock}
                  />
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
             <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
