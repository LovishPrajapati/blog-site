import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./Header";
import { DataLayer } from "../DataLayer";
import axios from "axios";
import Spinner from "./Spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, setUser } = useContext(DataLayer);

  const history = useHistory();

  useEffect(() => {
    if (user) history.push("/posts");
  }, [user, history]);

  const loginHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const { data } = await axios.post(
        "/api/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUser(data);
      localStorage.setItem("userData", JSON.stringify(data));
      setisLoading(false);
      history.push(`/posts`);
    } catch (e) {
      setisLoading(false);
      console.log(e);
      setError(e.response.data.error);
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container">
          <form className="login-form" onSubmit={loginHandler}>
            <h2>Login</h2>
            <hr />
            <span style={{ color: "red" }}>{error}</span>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success">
              Sign in
            </button>
            <Link to="/" style={{ marginLeft: "10px" }}>
              <button className="btn btn-danger ">Go Back</button>
            </Link>
            <div className="hint-text">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
            <hr />
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
