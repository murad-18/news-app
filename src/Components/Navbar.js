import React, { Component } from "react";
// import "./Navbar.css";
export class Navbar extends Component {
  render() {
    return (
      <div>
        {/* <nav class="navbar bg-primary" data-bs-theme="dark"> */}
        <nav
          className="navbar bg-dark border-bottom border-body"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              News-HUB
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/About">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Sports">
                    Sports
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="/Live">
                    Live
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
