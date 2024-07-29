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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Cover() {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  const [usernameError, setUsernameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const usernameRegex = /^[^\s]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z]).{8,}$/;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');

    const apiUrl = `http://127.0.0.1:8000/app/signup/`;

    if (!usernameRegex.test(username)) {
      setUsernameError('Usernames must be between 3 and 20 characters long and cannot contain space.');
      return;
    } else {
      setUsernameError('');
    }

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter and be at least 8 characters long.');
      return;
    } else {
      setPasswordError('');
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();

      const message = data.message;

      if (message === "Successfully Registered!") {
        setAlertSeverity('success');
        setAlertMessage(message);
        setOpen(true);
        setTimeout(() => {
          window.open('/authentication/sign-in', '_self');
        }, 800);
      } else {
        setAlertSeverity('error');
        setAlertMessage(message);
        setOpen(true);
      }
    } catch (error) {
      setAlertSeverity('error');
      setAlertMessage('An error occurred while processing your request. Please try again.');
      setOpen(true);
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your username, email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput 
                  type="text" 
                  name="username"
                  label="Username" 
                  variant="standard" 
                  value={formData.username}
                  onChange={handleChange}
                  error={!!usernameError}
                  helperText={usernameError}
                  fullWidth 
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                  type="email" 
                  name="email"
                  label="Email" 
                  variant="standard" 
                  value={formData.email}
                  onChange={handleChange}
                  error={!!emailError}
                  helperText={emailError}
                  fullWidth 
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                  type="password" 
                  name="password"
                  label="Password" 
                  variant="standard" 
                  value={formData.password}
                  onChange={handleChange}
                  error={!!passwordError}
                  helperText={passwordError}
                  fullWidth 
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
                {alertMessage}
              </Alert>
            </Snackbar>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
