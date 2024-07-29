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
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import PopoverElement from "layouts/billing/components/Popover";

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
      <div sx={{float:"right"}}>
        <PopoverElement sx={{float:"right"}}/>
      </div>
     
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
    </DashboardLayout>
  );
}

export default Dashboard;
