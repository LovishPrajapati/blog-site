// Default Error page

import React from "react";
import { Link } from "react-router-dom";
import "./error.css";

function Err() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="error-main">
            <h1>Oops!</h1>
            <h2>Something Went Wrong</h2>
            <div>Sorry, an error has occured, Try again later!</div>
            <div className="mt-3">
              <Link to="/">
                <button className="btn btn-danger">Take Me Home </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Err;
