import React, { setState, useState } from "react";
import { Link } from "react-router-dom";

// import "./Navbar.css";
const Navbar = (props) => {
  const [searchQuery, setsearchQuery] = useState("");

  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setsearchQuery(newQuery);

    // Trigger the action when the search bar is empty
    if (newQuery.trim() === "") {
      // Perform the desired action, e.g., navigate to the main page or any other action
      console.log("Search bar is empty. Triggering action...");
    } else {
      // If the search bar is not empty, call the onSearch prop
      if (props.onSearch) {
        props.onSearch(newQuery);
      }
    }
  };

  // handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   props.onSearch(state.searchQuery);
  // };
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            News Hub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  News Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/business">
                      Business
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/entertainment">
                      Entertainment
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/general">
                      General
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/health">
                      Health
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/science">
                      Science
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/sports">
                      Sports
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/technology">
                      Technology
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" aria-disabled="true">
                  Live News
                </Link>
              </li>
            </ul>
            <form
              // onSubmit={handleSearchSubmit}
              className="d-flex"
              role="search"
            >
              <input
                className="form-control me-2 px-3"
                type="search"
                placeholder="Type To Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {/* <button className="btn btn-outline-light" type="submit">
                  Search
                </button> */}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
