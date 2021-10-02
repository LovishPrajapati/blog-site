import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../header/Header";
import Spinner from "../spinner/Spinner";
import { DataLayer } from "../../DataLayer";
import axios from "axios";
import "./signup.css";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { user, setUser } = useContext(DataLayer);

  const history = useHistory();
  useEffect(() => {
    if (user) history.push("/posts");
  });

  const signupHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const { data } = await axios.post(
        "/api/register",
        {
          firstname: firstName,
          lastname: lastName,
          email,
          password,
          cpassword: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUser(data);
      setisLoading(false);
      localStorage.setItem("userData", JSON.stringify(data));
      alert(`${data.name}, You are successfully registered `);
      history.push(`/posts`);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.error);
      setisLoading(false);
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="signup-form container">
          <form onSubmit={signupHandler}>
            <h2>Sign Up</h2>
            <p>Please fill in this form to create an account!</p>
            <span style={{ color: "red" }}>{errors.error}</span>
            <hr />
            <div className="form-group">
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <span style={{ color: "red" }}>{errors.name}</span>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span style={{ color: "red" }}>{errors.email}</span>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span style={{ color: "red" }}>{errors.password}</span>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="confirm_password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span style={{ color: "red" }}>{errors.cpassword}</span>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-success">
                Sign Up
              </button>
              <Link to="/" style={{ marginLeft: "10px" }}>
                <button className="btn btn-danger ">Go Back</button>
              </Link>
            </div>
          </form>
          <div className="hint-text">
            Already have an account? <Link to="/login">Login</Link>
          </div>
          <hr />
        </div>
      )}
    </>
  );
}

export default Signup;
