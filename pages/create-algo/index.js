import React from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import CreateAlgo from "@/components/dashboard/CreateAlgo";

function Test() {
  return (
    <div style={{ backgroundColor: "#F1F1F1" }}>
      <Header />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Sidebar />
        <CreateAlgo />
      </div>
    </div>
  );
}

export default Test;
