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
import { useState, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import Billing from "layouts/billing";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SERVER_API = "http://127.0.0.1:8000/app/";

function Overview() {
  const [tabValue, setTabValue] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  let navigate = useNavigate();
 
  useEffect( ()=>{
    const checkCookie = async() => {
      const email = Cookies.get('userEmail');
      if (email) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body :JSON.stringify({
            "email" : email
          })
        };
        try {
          const response = await fetch( SERVER_API + "userprofile/", requestOptions);
          let data = await response.json();
          let message = data.message;

          if (message === "Here is the user profile") {
            setUserName(data.user.username);
            setUserEmail(email)
          }
        }catch(error){
          alert("No user found");
        }

      } else {
        console.log('User email cookie is not set');
      }
    };
    checkCookie();
  }, [])

  const handleDeleteAccount = async() =>{
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "email" : userEmail })
    };

    try {
      const response = await fetch( SERVER_API + "deleteaccount/", requestOptions);
      if (response.ok) {
        alert("Account is deleted");
        navigate("/authentication/sign-in");
      }
    }catch(error){
      alert("Delete failed");
    }
  }

  const handleEditUserName = () => {
    let usernameText = document.getElementById("username-text");
    if (usernameText.innerText !== ""){
      usernameText.innerHTML = '<input style="height:30px" value="' +  usernameText.innerText + '">';

      let passwordBox = document.getElementById("username-box");
      let submitButton = document.createElement("Button");
      submitButton.innerText = "Update"
  
      let editText = document.getElementById("edit-username-text");
      editText.innerText = "Update Username"
      
      //passwordBox.appendChild(submitButton)
    }
   
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header updateSelect={setTabValue} userName={userName} userEmail={userEmail}>
        {(tabValue === "" || tabValue === "app") && (
          <>
            <MDBox mt={5} mb={3}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6} xl={4}>
                  <PlatformSettings />
                </Grid>

                <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                  <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                  <ProfileInfoCard
                    title="profile information"
                    description=""
                    info={{
                      fullName: "Alec M. Thompson",
                      mobile: "(44) 123 1234 123",
                      email: "alecthompson@mail.com",
                      location: "USA",
                    }}
                    social={[
                      {
                        link: "https://www.facebook.com/CreativeTim/",
                        icon: <FacebookIcon />,
                        color: "facebook",
                      },
                      {
                        link: "https://twitter.com/creativetim",
                        icon: <TwitterIcon />,
                        color: "twitter",
                      },
                      {
                        link: "https://www.instagram.com/creativetimofficial/",
                        icon: <InstagramIcon />,
                        color: "instagram",
                      },
                    ]}
                    action={{ route: "", tooltip: "Edit Profile" }}
                    shadow={false}
                  />
                  <Divider orientation="vertical" sx={{ mx: 0 }} />
                </Grid>
              </Grid>
            </MDBox>
            <Billing />
          </>
        )}

        {tabValue === "message" && (
          <Grid item xs={12} xl={4}>
            <ProfilesList
              title="conversations"
              profiles={profilesListData}
              shadow={false}
            />
          </Grid>
        )}

        {tabValue === "settings" && (
          <Card id="delete-account">
            <MDBox pt={3} px={2}>
              <MDTypography fontWeight="medium" variant="h6">
                Personal Information
              </MDTypography>
            </MDBox>
            <MDBox pt={1} pb={2} px={2}>
              <MDBox
                component="ul"
                display="flex"
                flexDirection="column"
                p={0}
                m={0}
              >
                <MDBox
                  component="li"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  bgColor={"grey-100"}
                  borderRadius="lg"
                  p={3}
                  mb={1}
                  mt={2}
                >
                  <MDBox width="100%" display="flex" flexDirection="column">
                    <MDBox
                      display="flex"
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", sm: "center" }}
                      flexDirection={{ xs: "column", sm: "row" }}
                      mb={2}
                    >
                      <MDBox width="100%" display="flex" flexDirection="column">
                        <MDBox
                          display="flex"
                          justifyContent="space-between"
                          alignItems={{ xs: "flex-start" }}
                          flexDirection={{ xs: "column", sm: "row" }}
                          mb={2}
                        >
                          <MDTypography
                            variant="button"
                            fontWeight="medium"
                            textTransform="capitalize"
                            id="username-text"
                          >
                            {userName}
                          </MDTypography>

                          <MDBox display="flex" alignItems="center">
                            <MDBox mr={1}>
                              <MDButton variant="text" color="error" onClick={handleDeleteAccount}>
                                <Icon >delete account</Icon>&nbsp;delete account
                              </MDButton>
                            </MDBox>
                            <MDButton variant="text" color={"dark"}  onClick={handleEditUserName} >
                              <Icon>edit username</Icon>&nbsp;<span id="edit-username-text">edit username</span>
                            </MDButton>
                          </MDBox>
                        </MDBox>

                        <MDBox mb={1} lineHeight={0}>
                          <MDTypography variant="caption" color="text">
                            Email Address:&nbsp;&nbsp;&nbsp;
                            <MDTypography variant="caption" fontWeight="medium">
                              {userEmail}
                            </MDTypography>
                          </MDTypography>
                        </MDBox>
                        <MDBox mb={1} lineHeight={0}    id="username-box">
                         
                          {/* <MDTypography variant="caption" color="text" >
                            Password:&nbsp;&nbsp;&nbsp;
                            
                            <MDTypography variant="caption" fontWeight="medium">
                              Password
                            </MDTypography>
                            &nbsp;&nbsp;
                          </MDTypography> */}
                         
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        )}
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
