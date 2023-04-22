import React, { useEffect, useState } from "react";
import AdminService from "../Service/Adminservice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Route.css";
function Addroute() {
  const routeID = window.location.pathname.split("/")[2];

  const navigate = useNavigate();
  const [data, setdata] = useState({
    source: "",
    destination: "",
    distance: 0,
    travelDuration: 0,
    // routeID: 0,
  });

  useEffect(() => {
    if (routeID) {
      AdminService.getRouteById(routeID).then((res) =>
        setdata({
          source: res.source,
          destination: res.destination,
          distance: res.distance,
          travelDuration: res.travelDuration,
          routeID: res.routeID,
        })
      );
    }
  }, [routeID]);

  // console.log(data);
  // console.log(routeID);
  // console.log(routeID.id);

  const handlechange = (e) => {
    setdata({ ...data, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (routeID) {
      AdminService.putRoute(data).then((res) => alert("Data is updated"));
      navigate("/routeList");
      window.location.reload();
    } else {
      AdminService.postRoute(data).then((res) => alert("Route is Added"));
      navigate("/routeList");
      window.location.reload();
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
        <form onSubmit={handleSubmit} id="route_form">
          <h3>{routeID ? "EditRoute" : "AddRoute"}</h3>
          <label className="form-label">Source</label>
          <input
            type="text"
            id="source"
            onChange={handlechange}
            value={data.source}
            required
            className="form-control"
          />
          <br />
          <label className="form-label">Destination</label>
          <input
            type="text"
            id="destination"
            onChange={handlechange}
            value={data.destination}
            required
            className="form-control"
          />
          <br />
          <label className="form-label">
            Distance<span style={{ marginLeft: "10px" }}>KM</span>
          </label>
          <input
            type="text"
            id="distance"
            maxLength="4"
            pattern="[0-9]*"
            onChange={handlechange}
            value={data.distance}
            required
            className="form-control"
          />

          <br />
          <label className="form-label" style={{ marginRight: "430px" }}>
            TravelDuration <span>in Hrs</span>
          </label>

          <input
            type="text"
            id="travelDuration"
            maxLength="2"
            pattern="[0-9]*"
            onChange={handlechange}
            value={data.travelDuration}
            required
            className="form-control"
          />

          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Addroute;
