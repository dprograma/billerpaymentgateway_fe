// Spinner.js
import React from "react";
import '../css/Spinner.css'; 


type isLoadingType = {
  isLoading: boolean;
};

const Spinner = ({ isLoading }:isLoadingType) => {
  if (!isLoading) return null;

  return (
    <div className="spinner-overlay">
      <div className="spinner">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
