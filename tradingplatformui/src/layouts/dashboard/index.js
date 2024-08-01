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

import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
const SERVER_API = "http://127.0.0.1:8000/app/";

function extractTimeFromLabels(labels) {
  return labels.map(label => label.split('T')[1].split('-')[0]);
}

function Dashboard() {
  const [stockData, setStockData] = useState([])
  const [ibmData, setIbmData] = useState({})
  const [tslaData, setTslaData] = useState({})
  const [msftData, setMsftData] = useState({})
  const [raceData, setRaceData] = useState({})

  useEffect(() => {
    const checkCookie = () => {
      const userEmail = Cookies.get('userEmail');
      if (userEmail) {
        console.log('User email cookie:', userEmail);
      } else {
        console.log('User email cookie is not set');
      }
    };
    checkCookie();

    const fetchStockData = async() =>{
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      };
  
      try {
        const response = await fetch( SERVER_API + "price_history/", requestOptions);
        if (response.ok) {
          let data = await response.json();
          let prices = data["prices"];
          prices.forEach(stock => {
              stock.labels = extractTimeFromLabels(stock.labels);
          });
          setStockData(prices);
          for (let priceData of data["prices"]) {
            switch(priceData["datasets"]["label"]) {
              case "IBM":
                setIbmData(priceData["datasets"]);
                break;
              case "TSLA":
                setTslaData(priceData["datasets"]);
                break;
              case "MSFT":
                setMsftData(priceData["datasets"]);
                break;
              case "RACE":
                setRaceData(priceData["datasets"]);
                break;
              default:
                break;
            }
          }
      }
    }
      catch(error){
        console.error(
          'There was a problem fetching stock prices:',
          error
        );
      }
    }

    fetchStockData();
  }, []);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <div sx={{float:"right"}}>
            <PopoverElement sx={{float:"right"}} ibmData={ibmData} tslaData={tslaData} raceData={raceData} msftData={msftData}/>
          </div>
          <br/>
        <Grid container spacing={6}>


          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="ibm-svgrepo-com.svg"
                title="IBM"
                count={ibmData["data"]? ibmData["data"][ibmData["data"].length-1] : -1}
                highest={{
                   color: "success",
                   amount: ibmData["highest_price"],
                 }}
                lowest={{
                  color: "error",
                  amount: ibmData["lowest_price"],
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="microsoft-logo.svg"
                title="MSFT"
                count={msftData["data"]? msftData["data"][msftData["data"].length-1]: -1}
                highest={{
                  color: "success",
                  amount: msftData["highest_price"],
                }}
               lowest={{
                 color: "error",
                 amount: msftData["lowest_price"],
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
                count={tslaData["data"] ? tslaData["data"][tslaData["data"].length-1]: -1}
                highest={{
                  color: "success",
                  amount: tslaData["highest_price"],
                }}
               lowest={{
                 color: "error",
                 amount: tslaData["lowest_price"],
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
                count={raceData["data"]? raceData["data"][raceData["data"].length-1]: -1}
                highest={{
                  color: "success",
                  amount: raceData["highest_price"],
                }}
               lowest={{
                 color: "error",
                 amount: raceData["lowest_price"],
               }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}> 
            {stockData.length > 0? stockData.map((stock, index) => (
              <Grid item xs={6} key={index}>
                <MDBox mb={1.5}>
                  <ReportsLineChart
                    color="dark"
                    title={stock.datasets.label}
                    date="updated 2 seconds ago"
                    chart={stock}
                  />
                </MDBox>
              </Grid>
            )) : <></> }
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
