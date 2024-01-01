import React from "react";
import magnifyLoading from "./magnifyLoading.gif";

const Spinner = () => {
  return (
    <div className="text-center">
      <img src={magnifyLoading} alt="loading-spinner.gif" />
    </div>
  );
};
export default Spinner;
