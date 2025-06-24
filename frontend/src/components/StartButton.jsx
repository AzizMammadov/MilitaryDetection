import React from "react";
import Button from "@mui/material/Button";
//import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';

const StartButton = ({ text = "Başla", onClick, color = "primary", variant = "contained", style = {} }) => {
  return (
    <Button
      variant={variant}
      color={color}
      endIcon={<PlayCircleOutlineOutlinedIcon sx={{color: "primary"}}/>}
      onClick={onClick}
      style= {{ 
        width: "120px",
        borderRadius: "20px", 
        height: '43px',
        textTransform: 'none', 
        fontSize: '15px',
        ...style 
    }} 
    >
      {text}
    </Button>
  );
};

export default StartButton;
