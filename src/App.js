import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  // pageSize = 12;
  constructor() {
    super();
    this.state = {
      query: "",
      pageSize: 12,
    };
  }
  handleSearch = (newQuery) => {
    this.setState({ query: newQuery });
  };
  render() {
    return (
      <div>
        <Router>
          <Navbar onSearch={this.handleSearch} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  query={this.state.query}
                  key="general"
                  pageSize={this.state.pageSize}
                  country="us"
                  category="general"
                />
              }
            ></Route>
            <Route
              exact
              path="/general"
              element={
                <News
                  query={this.state.query}
                  key="general"
                  pageSize={this.state.pageSize}
                  country="us"
                  category="general"
                />
              }
            ></Route>
            <Route
              exact
              path="/business"
              element={
                <News
                  query={this.state.query}
                  key="business"
                  pageSize={this.state.pageSize}
                  country="us"
                  category="business"
                />
              }
            ></Route>
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  query={this.state.query}
                  key="entertainment"
                  pageSize={this.state.pageSize}
                  country="us"
                  category="entertainment"
                />
              }
            ></Route>
            <Route
              exact
              path="/health"
              element={
                <News
                  query={this.state.query}
                  key="health"
                  pageSize={this.state.pageSize}
                  country="us"
                  category="health"
                />
              }
            ></Route>
            <Route
              exact
              path="/science"
              element={
                <News
                  query={this.state.query}
                  key="science"
                  pageSize={this.state.pageSize}
                  country="us"
                  category="science"
                />
              }
            ></Route>
            <Route
              exact
              path="/sports"
              element={
                <News
                  query={this.state.query}
                  key="sports"
                  pageSize={this.state.pageSize}
                  country="us"
                  category="sports"
                />
              }
            ></Route>
            <Route
              exact
              path="/technology"
              element={
                <News
                  query={this.state.query}
                  key="technology"
                  pageSize={this.state.pageSize}
                  country="us"
                  category="technology"
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
