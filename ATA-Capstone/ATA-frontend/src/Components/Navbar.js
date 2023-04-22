import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar1">
      <h2 style={{ color: "black", paddingLeft: "10px" }}>ATA Travel Agency</h2>
      <div className="navbarss">
        <Link
          to="/routeList"
          style={{ textDecoration: "none", margin: "5px" }}
          className="btn btn-primary"
        >
          Routes
        </Link>
        <Link
          to="/vehiclelist"
          style={{ textDecoration: "none", margin: "5px" }}
          className="btn btn-primary"
        >
          Vehicles
        </Link>
        <Link
          to="/driverlist"
          style={{ textDecoration: "none", margin: "5px" }}
          className="btn btn-primary"
        >
          Drivers
        </Link>
        <Link
          to="/viewreservation"
          style={{ textDecoration: "none", margin: "5px" }}
          className="btn btn-primary"
        >
          Reservations
        </Link>
        <Link
          to="/addadmin"
          style={{ textDecoration: "none", margin: "5px" }}
          className="btn btn-primary"
        >
          Add Admin
        </Link>
        <Link to="/" class="btn btn-danger">
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
