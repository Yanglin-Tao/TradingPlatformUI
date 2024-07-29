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
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import PopoverElement from "layouts/billing/components/Popover";

function Dashboard() {
  const { sales } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid> 
            <Grid item xs={12} md={6} lg={4}>
              <PopoverElement/>
            </Grid>
          </Grid>
        </MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="ibm-svgrepo-com.svg"
                title="IBM"
                count={192.3}
                highest={{
                   color: "success",
                   amount: "180.6",
                 }}
                lowest={{
                  color: "error",
                  amount: "203.1",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="microsoft-logo.svg"
                title="MSFT"
                count="423.8"
                highest={{
                  color: "success",
                  amount: "410.6",
                }}
               lowest={{
                 color: "error",
                 amount: "431.1",
               }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
             <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="tesla.svg"
                title="TSLA"
                count="216.92"
                highest={{
                  color: "success",
                  amount: "188.6",
                }}
               lowest={{
                 color: "error",
                 amount: "230.1",
               }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="race.jpg"
                title="RACE"
                count="412.65"
                highest={{
                  color: "success",
                  amount: "450.2",
                }}
               lowest={{
                 color: "error",
                 amount: "410.1",
               }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
