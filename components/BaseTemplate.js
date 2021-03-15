import React from "react";
import Sidebar from "../components/Sidebar";
import { GlobalState } from "../context/GlobalState";

const BaseTemplate = (props) => {
  return (
    // <GlobalState>
    <div className="flex bg-offwhite w-full h-screen">
      <div className="w-3/12 bg-gray rounded">
        <Sidebar />
      </div>

      <div className="flex-1 flex w-9/12 text-gray-500 overflow-hidden">
        {props.children}
      </div>
    </div>
    // </GlobalState>
  );
};

export default BaseTemplate;
