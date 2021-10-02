import React, { useContext } from "react";
import { DataLayer } from "../../DataLayer";
import "./header.css";

function Header() {
  const { user } = useContext(DataLayer);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-2">
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark ">
        <div className="container-fluid">
          {window.location.pathname === "/posts" ? (
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo03"
              aria-controls="navbarTogglerDemo03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          ) : null}

          <a className="navbar-brand ml-auto" href="/">
            Blog-It
          </a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            {window.location.pathname === "/posts" ? (
              <form className="d-flex">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success header-search-button"
                  type="submit"
                >
                  Search
                </button>
                <span className="user-name">{user.name.split(" ")[0]}</span>
                <i
                  className="fas fa-sign-out-alt fa-2x user-logout"
                  onClick={(e) => logout(e)}
                ></i>
              </form>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
