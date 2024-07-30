// PopoverElement.js
import React, { useEffect, useState } from 'react';
import { Popover, Box, Typography,TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { red, green, blue } from '@mui/material/colors';
import Cookies from 'js-cookie';
const SERVER_API = "http://127.0.0.1:8000/app/";

const BuyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  '&:hover': {
    backgroundColor: red[700],
  },
  width:"120px",
  marginRight:"20px"
}));
const SellButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: green[500],
  '&:hover': {
    backgroundColor: green[700],

  },
  width:"120px",
}));

const CustomButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  textColor: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  width:"260px",
}));



const PopoverElement = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [operation, setOperation] = useState(null); 
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(()=> {
    const checkCookie = () => {
      const email = Cookies.get('userEmail');
      if (email) {
        setEmail(email);
      } else {
        console.log('User email cookie is not set');
      }
    };
    checkCookie();
  })


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setSymbol(event.target.value)
  }

  const handleOperation = (event) =>{
    if (event.target.text === "buy"){
      setOperation("Buy");
    }
    else {
      setOperation("Sell");
    }
  }

  const handleQuantity = (event) =>{
    setQuantity(Number(event.target.value));
  }

  const handleTradeSubmit= async() => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "email": email, "stock_symbol": symbol, "quantity":quantity })
    };
    try {
      let response;
      let apiUrl = operation === "Buy" ? SERVER_API + "buy/" : SERVER_API + "sell/"; 
      response = await fetch( apiUrl, requestOptions);
      if (response.ok){
        alert("Trade success!");
      }
  
    } catch(error) {
      alert("Trade failed!");
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to execute this trade?")) {
      handleTradeSubmit(); 
    }
    else {
      return; 
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div >
      <CustomButton aria-describedby={id} onClick={handleClick} variant="contained" size="large">
        Trade
      </CustomButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{zindex:100, backgroundColor:'white'}}
      >
        <div 
          style={{ 
            width: '300px', 
            backgroundColor:'white'
          }}
        >
        <Box sx={{ p: 2 ,}}>
          <Typography variant="h5" component="h2">
            Make a Trade 
          </Typography>
          
          <FormControl variant="standard" sx={{minWidth: 200}}>
            <InputLabel  id="demo-simple-select-helper-label"> Symbol</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={symbol}
              onChange={handleChange}
              sx={{minWidth:250, minHeight:50}}
            >
                <MenuItem value={"ibm"}>IBM</MenuItem>
                <MenuItem value={"msft"}>Microsoft</MenuItem>
                <MenuItem value={"tsla"}>Tesla</MenuItem>
                <MenuItem value={"race"}>Race</MenuItem>

            </Select>
            <br/>
            <TextField 
                sx={{minWidth:250}}
                variant="standard"
                type="number"
                InputProps={{
                    inputProps: { 
                        max: 500, min: 0
                    }
                }}
                label="Quantity"
                onChange={handleQuantity}
            />
            <br/>
            <TextField  sx={{minWidth:250}}
                variant="standard"
                type="number"
                label="Price"
                value="100"
              />
              <br/>
          <div style={{display:'inline-block', margin:2, backgroundColor:'white'}}>
            <BuyButton value={"buy"} onClick={handleOperation}>Buy</BuyButton>
            <SellButton value={"sell"} onClick={handleOperation}>Sell</SellButton>
          </div>
          <br/>
          <CustomButton variant="contained" size="medium" onClick={handleSubmit}>
          Submit
        </CustomButton>
        </FormControl>
        </Box>
        </div>
      </Popover>
      </div>
  );
};

export default PopoverElement;
