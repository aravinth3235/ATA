import React, { useEffect, useState } from "react";
import AdminService from "../Service/Adminservice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Addvehicle() {
  const navigate = useNavigate();
  const vehicleID = window.location.pathname.split("/")[2];

  const [data, setdata] = useState({
    name: "",
    registrationNumber: "",
    seatingapacity: "",
    farePerKM: "",
    type: "",
  });
  useEffect(() => {
    if (vehicleID) {
      AdminService.getVehicelById(vehicleID).then((res) => {
        setdata({
          name: res.name,
          registrationNumber: res.registrationNumber,
          seatingapacity: res.seatingapacity,
          farePerKM: res.farePerKM,
          type: res.type,
          vehicleID: res.vehicleID,
        });
      });
    }
  }, [vehicleID]);

  const handlechange = (e) => {
    setdata({ ...data, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (vehicleID) {
      AdminService.putVehicle(data).then((res) => {
        alert("Vehicle is Updated");
        navigate("/vehiclelist");
      });
    } else {
      AdminService.postVehicle(data).then((res) => {
        alert("Vehicle is Added");
        navigate("/vehiclelist");
      });
    }
  };
  console.log(data);
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>{vehicleID ? "EditVehicle" : "AddVehicle"}</h3>
        <form onSubmit={handleSubmit} className="vehicle-form">
          <label class="form-label">Vehicle-Name</label>
          <input
            type="text"
            onChange={handlechange}
            id="name"
            required
            className="form-control"
            value={data.name}
          />
          <br />
          <label class="form-label">Vehicle-Rg-No</label>
          <input
            type="text"
            onChange={handlechange}
            id="registrationNumber"
            required
            className="form-control"
            value={data.registrationNumber}
          />
          <br />
          <label class="form-label" style={{ marginRight: "450px" }}>
            Vehicle-Capacity
          </label>
          <input
            type="text"
            onChange={handlechange}
            id="seatingapacity"
            required
            className="form-control"
            value={data.seatingapacity}
          />
          <br />
          <label class="form-label" style={{ marginRight: "450px" }}>
            Vehicle-Fare/Km
          </label>
          <input
            type="text"
            onChange={handlechange}
            id="farePerKM"
            required
            className="form-control"
            value={data.farePerKM}
          />
          <br />
          <label class="form-label" style={{ marginRight: "470px" }}>
            Vehicle-Type
          </label>
          <input
            type="text"
            onChange={handlechange}
            id="type"
            required
            className="form-control"
            value={data.type}
          />
          <br />
          <button type="submit" className="btn btn-primary ">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Addvehicle;
