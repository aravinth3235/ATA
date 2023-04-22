import React from "react";
import { Link } from "react-router-dom";

function Navbar2() {
  return (
    <div
      style={{
        paddingTop: "15px",
        paddingLeft: "10px",
        paddingRight: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#dc3545",
      }}
    >
      <h2>ATA Travel Agency</h2>
      <Link to="/" style={{ width: "100px" }} className="btn btn-danger">
        Logout
      </Link>
    </div>
  );
}

export default Navbar2;
