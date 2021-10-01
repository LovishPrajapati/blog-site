import React, { useContext } from "react";
import { DataLayer } from "../DataLayer";

function Header() {
  const { user } = useContext(DataLayer);

  return (
    <div className="container mt-2">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
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
          <a className="navbar-brand" href="/">
            Blog-It
          </a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <form className="d-flex">
              <input
                className="form-control me-2 search-header"
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
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
