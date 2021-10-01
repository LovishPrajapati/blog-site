import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Header />
      <div className="container">
        <form className="login-form">
          <h2>Login</h2>
          <hr />
          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Email
            </label>
            <div class="col-sm-10">
              <input
                type="email"
                class="form-control"
                id="inputEmail3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputPassword3" class="col-sm-2 col-form-label">
              Password
            </label>
            <div class="col-sm-10">
              <input
                type="password"
                class="form-control"
                id="inputPassword3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" class="btn btn-success">
            Sign in
          </button>

          <div class="hint-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
          <hr />
        </form>
      </div>
    </>
  );
}

export default Login;
