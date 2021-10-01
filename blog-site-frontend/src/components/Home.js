import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { DataLayer } from "../DataLayer";

function Home() {
  const { user } = useContext(DataLayer);
  const history = useHistory();
  useEffect(() => {
    if (user) history.push("/posts");
  });
  return (
    <div className="container mt-5">
      <div className="row home-row">
        <div className="col-md-6 ">
          <div className="card text-center">
            <div className="card-body mt-5">
              <h5 className="card-title">Login</h5>
              <p className="card-text">Login now to create amazing blogs.</p>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body mt-5">
              <h5 className="card-title">Sign Up</h5>
              <p className="card-text">
                Don't have an account. Create one now.
              </p>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
