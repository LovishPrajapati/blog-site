import React from "react";
import "./header.css";

function Header() {
  return (
    <div className="header-container">
      <div className="header-logo">
        <i class="fas fa-2x fa-book-reader"></i> <h4>Blog</h4>
      </div>
      <div className="header-search">
        <input type="text"></input>
        <button>Search</button>
      </div>
      <div className="header-buttons">
        <a href="/">Login</a>
        <a href="/">Sign Up</a>
      </div>
    </div>
  );
}

export default Header;
