import React from "react";
import "./spinner.css";

function Spinner() {
  return (
    <div className="spinner">
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
