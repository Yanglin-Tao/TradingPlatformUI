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
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function Transactions() {

  const [orderHistory, setOrderHistory] = useState([]);

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
      } catch (error) {
        console.error(
          'There was a problem fetching order history:',
          error
        );
      }
    };
    getOrderHistory();
  }, []);

  return (
    <Card sx={{ height: "100%", width: '100%'}}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Your Trades
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
          <MDBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            newest
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {orderHistory.map((order, index) => (
            <Transaction
              key={index}
              color={order.order_operation === 'buy' ? 'error' : 'success'}
              icon={order.order_operation === 'buy' ? 'expand_more' : 'expand_less'}
              name={order.symbol}
              description={new Date(order.time).toLocaleString()}
              quantity={order.quantity.toString()}
              price={order.stock_price.toString()}
              value={`${order.order_operation === 'buy' ? '-' : '+'} $ ${order.total_price.toFixed(2)}`}
            />
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Transactions;
