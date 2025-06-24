import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner = () => (
  <div id="loading" className="loading-container">
    <CircularProgress size="60px" color="white"/>
  </div>
);

export default LoadingSpinner;
