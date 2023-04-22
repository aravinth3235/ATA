import React, { useEffect, useState } from "react";
import AdminService from "../Service/Adminservice";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Vehicle.css";
function Vehiclelist() {
  const navigate = useNavigate();
  const [vehicle, setvehicle] = useState([]);

  useEffect(() => {
    AdminService.getVehicle().then((res) => setvehicle(res));
  }, []);

  const create = () => {
    navigate("/addvehicle");
  };
  const deletevehicle = (id) => {
    let ans = window.confirm(`Do you want Delete ${id} `);
    if (ans) {
      AdminService.deleteVehicle(id).then(() => {
        setvehicle(vehicle.filter((item) => item.vehicleID !== id));
      });
    } else {
      return;
    }
  };
  return (
    <>
      <Navbar />
      <div className="container-sm ">
        <h1>Vehicles</h1>
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
              <th>VehicleID</th>
              <th>Vehicle-Name</th>
              <th>Vehicle-No</th>
              <th>Vehicle-Capacity</th>
              <th>Vehicle-Fare/Km</th>
              <th>Vehicle-Type</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {vehicle.map((v) => {
              return (
                <tr key={v.vehicleID}>
                  <td>{v.vehicleID}</td>
                  <td>{v.name}</td>
                  <td>{v.registrationNumber}</td>
                  <td>{v.seatingapacity}</td>
                  <td>
                    <span>Rs - </span>
                    {v.farePerKM}
                  </td>
                  <td>{v.type}</td>
                  <td>
                    <Link
                      to={`/editvehicle/${v.vehicleID}`}
                      className="btn btn-success"
                      style={{ width: "65px" }}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => deletevehicle(v.vehicleID)}
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

export default Vehiclelist;
