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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function Invoices() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [dailySpread, setDailySpread] = useState({});

  useEffect(() => {
    const getOrderHistory = async () => {
      const userEmail = Cookies.get('userEmail');
      const apiUrl = `http://127.0.0.1:8000/app/order_history/`;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      };

      try {
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setOrderHistory(data.orders)
        calculateDailySpread(data.orders);
      } catch (error) {
        console.error(
          'There was a problem fetching order history:',
          error
        );
      }
    };
    getOrderHistory();
  }, []);

  const calculateDailySpread = (orders) => {
    const spread = {};
    orders.forEach(order => {
      const date = new Date(order.time).toLocaleDateString().split('T')[0]; // Extract date part
      const value = order.order_operation === 'buy' ? -order.total_price : order.total_price;
      if (spread[date]) {
        spread[date] += value;
      } else {
        spread[date] = value;
      }
    });
    setDailySpread(spread);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Spread Summary
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {Object.entries(dailySpread).map(([date, spread], index) => (
            <Invoice 
              key={index}
              date={new Date(date).toLocaleDateString()} 
              price={`$${spread.toFixed(2)}`} 
            />
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Invoices;
