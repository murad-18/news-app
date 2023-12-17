import React, { Component } from "react";
import magnifyLoading from "./magnifyLoading.gif";

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={magnifyLoading} alt="loading-spinner.gif" />
      </div>
    );
  }
}
export default Spinner;
