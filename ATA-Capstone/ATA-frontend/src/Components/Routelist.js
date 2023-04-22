import React, { useEffect, useState } from "react";
import AdminService from "../Service/Adminservice";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Route.css";

function Routelist() {
  const navigate = useNavigate();
  const [route, setroute] = useState([]);
  useEffect(() => {
    AdminService.getRoute().then((res) => {
      setroute(res);
    });
  }, []);

  const create = () => {
    navigate("/createroute");
  };
  const deleteroute = (id) => {
    let ans = window.confirm(`Do you want Delete ${id} `);
    if (ans) {
      AdminService.deleteRoute(id).then(() => {
        setroute(route.filter((item) => item.routeID !== id));
      });
    } else {
      return;
    }
  };
  return (
    <>
      <Navbar />
      <div className="container-sm ">
        <h2>Availabele Routes</h2>
        <button
          onClick={create}
          className="btn btn-primary"
          style={{
            marginBottom: "25px",
            marginTop: "10px",
          }}
        >
          Create
        </button>
        <table
          cellPadding="2px"
          border="1px"
          align="center"
          className="table table-dark table-hover"
        >
          <thead>
            <tr>
              <th>Route NO</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Distance</th>
              <th>TravelDuration</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {route.map((route) => {
              return (
                <tr key={route.routeID}>
                  <td>{route.routeID}</td>
                  <td>{route.source}</td>
                  <td>{route.destination}</td>
                  <td>{route.distance}</td>
                  <td>{route.travelDuration}</td>
                  <td>
                    <Link
                      to={`/editroute/${route.routeID}`}
                      className="btn btn-success"
                      style={{ width: "65px" }}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteroute(route.routeID)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Routelist;
