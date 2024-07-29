// PopoverElement.js
import React, { useState } from 'react';
import { Popover, Box, Typography,TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { red, green } from '@mui/material/colors';

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


const PopoverElement = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [symbol, setSymbol] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setSymbol(event.target.value)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div >
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        Trade
      </Button>
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
                <MenuItem value={"IBM"}>IBM</MenuItem>
                <MenuItem value={"MSFT"}>Microsoft</MenuItem>
                <MenuItem value={"TSLA"}>Tesla</MenuItem>
                <MenuItem value={"RACE"}>Race</MenuItem>

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
                label="quantity"
            />
            <br/>
          <div style={{display:'inline-block', margin:2, backgroundColor:'white'}}>
            <BuyButton>Buy</BuyButton>
            <SellButton>Sell</SellButton>
          </div>
          <br/>
          <Button variant="contained" size="medium" onClick={()=>window.confirm("Are you sure you want to execute this trade?")}>
          Submit
        </Button>
        </FormControl>
        </Box>
        </div>
      </Popover>
      </div>
  );
};

export default PopoverElement;
