import React, { useEffect, useState } from "react";
import AdminService from "../Service/Adminservice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Driver.css";
function AddDriver() {
  const navigate = useNavigate();
  const driverID = window.location.pathname.split("/")[2];

  const [driver, setdriver] = useState({});
  const [vehicle, setvehicle] = useState([]);
  const [id, setid] = useState();

  useEffect(() => {
    AdminService.getVehicle().then((res) => setvehicle(res));
  }, []);

  useEffect(() => {
    if (id !== null && id !== undefined) {
      AdminService.getVehicelById(id).then((res) =>
        setdriver({
          ...driver,
          vehicleBean: {
            name: res.name,
            registrationNumber: res.registrationNumber,
            seatingapacity: res.seatingapacity,
            farePerKM: res.farePerKM,
            type: res.type,
            vehicleID: res.vehicleID,
          },
        })
      );
    }
  }, [id, driver]);

  useEffect(() => {
    if (driverID) {
      AdminService.getDriverById(driverID).then((res) =>
        res.vehicleBean
          ? setdriver({
              driverID: res.driverID,
              name: res.name,
              licenseNumber: res.licenseNumber,
              mobileno: res.mobileno,
              location: res.location,
              street: res.street,
              state: res.state,
              vehicleBean: {
                name: res.name,
                registrationNumber: res.vehicleBean.registrationNumber,
                seatingapacity: res.vehicleBean.seatingapacity,
                farePerKM: res.vehicleBean.farePerKM,
                type: res.vehicleBean.type,
                vehicleID: res.vehicleBean.vehicleID,
              },
            })
          : setdriver({
              driverID: res.driverID,
              name: res.name,
              licenseNumber: res.licenseNumber,
              mobileno: res.mobileno,
              location: res.location,
              street: res.street,
              state: res.state,
            })
      );
    }
  }, [driverID]);

  const handleselect = (e) => {
    setid(parseInt(e.target.value));
  };

  const handlechange = (e) => {
    setdriver({ ...driver, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (driverID) {
      AdminService.putDriver(driver).then((res) => {
        alert("Driver is Updated");
        navigate("/driverlist");
      });
    } else {
      AdminService.postDriver(driver).then((res) => {
        alert("Driver is Added");
        navigate("/driverlist");
      });
    }
  };

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
        <h3>{driverID ? "EditDriver" : "Add Driver"}</h3>
        <form onSubmit={handleSubmit} className="driver-form">
          <label className="form-label">Driver-Name</label>
          <input
            type="text"
            id="name"
            onChange={handlechange}
            required
            className="form-control"
            value={driver.name}
          />
          <br />
          <label className="form-label">LicenseNumber</label>
          <input
            type="text"
            id="licenseNumber"
            onChange={handlechange}
            required
            className="form-control"
            value={driver.licenseNumber}
          />
          <br />
          <label
            className="form-label"
            style={{ marginRight: "550px", color: "black" }}
          >
            Mobileno
          </label>
          <input
            type="text"
            id="mobileno"
            onChange={handlechange}
            required
            className="form-control"
            value={driver.mobileno}
          />
          <br />
          <label className="form-label" style={{ marginRight: "550px" }}>
            Location
          </label>
          <input
            type="text"
            id="location"
            onChange={handlechange}
            required
            className="form-control"
            value={driver.location}
          />
          <br />
          <label className="form-label" style={{ marginRight: "550px" }}>
            Street
          </label>
          <input
            type="text"
            id="street"
            onChange={handlechange}
            required
            className="form-control"
            value={driver.street}
          />
          <br />
          <label className="form-label" style={{ marginRight: "550px" }}>
            State
          </label>
          <input
            type="text"
            id="state"
            onChange={handlechange}
            required
            className="form-control"
            value={driver.state}
          />
          <br />
          <label className="form-label" style={{ marginRight: "480px" }}>
            Select Vehicle
          </label>
          <select
            id="vehicleBean"
            onChange={handleselect}
            required
            className="form-select"
            value={driver.vehicleBean?.vehicleID}
          >
            <option>---Select-Vehicle---</option>
            {vehicle.map((v) => {
              return (
                <option value={v.vehicleID} key={v.vehicleID}>
                  {v.name}
                  <span> - </span>
                  {v.registrationNumber}
                </option>
              );
            })}
          </select>
          <br />

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginBottom: "50px" }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddDriver;
