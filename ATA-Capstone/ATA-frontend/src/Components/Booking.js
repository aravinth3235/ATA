import React, { useEffect, useState } from "react";
import CustomerService from "../Service/Customerservice";
import AdminService from "../Service/Adminservice";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./Navbar2";

function Booking() {
  const navigate = useNavigate();
  const [route, setroute] = useState([]);
  const [driver, setdriver] = useState([]);
  const [routeid, setrouteid] = useState();
  const [driverid, setdriverid] = useState();
  const [customerset, setcustomerset] = useState({});
  const [routeidset, setrouteidset] = useState({});
  const [driveridset, setdriveridset] = useState({
    driverID: 0,
    name: "",
    licenseNumber: "",
    mobileno: "",
    location: "",
    street: "",
    state: "",
    vehicleBean: {
      name: "",
      registrationNumber: "",
      seatingapacity: 0,
      farePerKM: "",
      type: "",
      vehicleID: 0,
    },
  });
  const customerid = window.location.pathname.split("/")[2];
  useEffect(() => {
    if (customerid) {
      AdminService.getusrById(customerid).then((res) => {
        setcustomerset({
          userId: res.userId,
          password: res.password,
          userType: res.userType,
          loginStatus: res.loginStatus,
        });
      });
    }
  }, [customerid]);

  const [reserv, setreserv] = useState({
    journeyDate: "",
    bookingDate: "",
    bookingStatus: "",
    totalFare: "",
    boardingPoint: "",
    dropPoint: "",
    routeBean: {
      source: "",
      destination: "",
      distance: "",
      travelDuration: "",
      routeID: 0,
    },
    driverBean: {
      driverID: 0,
      name: "",
      licenseNumber: "",
      mobileno: "",
      location: "",
      street: "",
      state: "",
      vehicleBean: {
        name: "",
        registrationNumbe: "",
        seatingapacit: "",
        farePerKM: "",
        type: "",
        vehicleID: 0,
      },
    },
  });

  useEffect(() => {
    CustomerService.getRoute().then((res) => setroute(res));
  }, []);
  // console.log(route);
  useEffect(() => {
    CustomerService.getDriver().then((res) => setdriver(res));
  }, []);
  // console.log(driver);
  useEffect(() => {
    if (routeid)
      CustomerService.getRouteById(routeid).then((res) =>
        setrouteidset({
          source: res.source,
          destination: res.destination,
          distance: res.distance,
          travelDuration: res.travelDuration,
          routeID: res.routeID,
        })
      );
  }, [routeid]);
  // console.log(routeidset);

  useEffect(() => {
    if (driverid)
      CustomerService.getDriverById(driverid).then((res) =>
        setdriveridset({
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
      );
  }, [driverid]);
  // console.log(driveridset);
  const handleselect = (e) => {
    setrouteid(e.target.value);
  };
  const handleselect1 = (e) => {
    setdriverid(e.target.value);
  };
  const handlechange = (e) => {
    setreserv({
      ...reserv,
      [e.target.id]: e.target.value,
      bookingDate: Date().slice(0, 10),
      bookingStatus: "true",
      totalFare:
        parseInt(driveridset.vehicleBean.farePerKM) *
        parseInt(routeidset.distance),
      boardingPoint: routeidset.source,
      dropPoint: routeidset.destination,
      routeBean: {
        source: routeidset.source,
        destination: routeidset.destination,
        distance: routeidset.distance,
        travelDuration: routeidset.travelDuration,
        routeID: routeidset.routeID,
      },
      credentialsBean: {
        userId: customerset.userId,
        password: customerset.password,
        userType: customerset.userType,
        loginStatus: customerset.loginStatus,
      },
      driverBean: {
        driverID: driveridset.driverID,
        name: driveridset.name,
        licenseNumber: driveridset.licenseNumber,
        mobileno: driveridset.mobileno,
        location: driveridset.location,
        street: driveridset.street,
        state: driveridset.state,
        vehicleBean: {
          name: driveridset.vehicleBean.name,
          registrationNumber: driveridset.vehicleBean.registrationNumber,
          seatingapacit: driveridset.vehicleBean.seatingapacity,
          farePerKM: driveridset.vehicleBean.farePerKM,
          type: driveridset.vehicleBean.type,
          vehicleID: driveridset.vehicleBean.vehicleID,
        },
      },
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    CustomerService.Bookvehicle(reserv).then((res) => alert("Vehicel Booked"));
    console.log(JSON.stringify(reserv));
  };

  const showBooking = () => {
    alert("your booking");
    navigate(`/resrvationbyuseid/${customerid}`);
  };
  return (
    <>
      <Navbar2 />
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="container-sm" style={{ marginTop: "50px" }}>
            <button
              onClick={showBooking}
              className="btn btn-primary"
              style={{ marginRight: "20px", marginBottom: "25px" }}
            >
              show Your Booking
            </button>
            <br></br>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "25px",
              }}
            >
              <select
                onChange={handleselect}
                className="form-select"
                style={{ width: "400px" }}
              >
                <option>--Select-Route---</option>
                {route.map((r) => {
                  return (
                    <option value={r.routeID} key={r.routeID}>
                      {r.source}--{r.destination}
                    </option>
                  );
                })}
              </select>

              <select
                onChange={handleselect1}
                className="form-select"
                style={{ width: "400px" }}
              >
                <option>--Select-Vehicle---</option>
                {driver.map((d) => {
                  return (
                    <option value={d.driverID} key={d.driverID}>
                      Vehicle - {d.vehicleBean.name} --- Fare -{" "}
                      {d.vehicleBean.farePerKM}
                      Rs/-
                    </option>
                  );
                })}
              </select>
            </div>
            <div
              style={{
                width: "800px",
                display: "flex",
                flexDirection: "row",
                marginLeft: "300px",
                gap: "40px",
              }}
            >
              {routeid ? (
                <div>
                  <h5 style={{ marginTop: "20px" }}>Route Detail</h5>
                  <br />
                  <label>Destination</label>
                  <input
                    value={routeidset.destination}
                    readOnly
                    className="form-control"
                  />
                  <br />
                  <label class="form-label">Source</label>
                  <input
                    value={routeidset.source}
                    readOnly
                    className="form-control"
                  />
                  <br />
                  <label class="form-label">Distance</label>
                  <input
                    value={routeidset.distance + " Km"}
                    readOnly
                    className="form-control"
                  />
                  <br />
                  <label class="form-label">Travel-Duration</label>
                  <input
                    value={routeidset.travelDuration + " Hrs"}
                    readOnly
                    className="form-control"
                  />
                  <br />
                </div>
              ) : (
                <span></span>
              )}

              {driverid ? (
                <div>
                  <h5 style={{ marginTop: "10px" }}>Vehicle Details</h5>
                  <br />
                  <label class="form-label">Vehicle - Name</label>
                  <input
                    defaultValue={driveridset.vehicleBean.name}
                    readOnly
                    className="form-control"
                  />
                  <br />
                  <label class="form-label">Vehicle - Type</label>
                  <input
                    value={driveridset.vehicleBean.type}
                    readOnly
                    className="form-control"
                  />
                  <br />
                  <label class="form-label">Registration - Number</label>
                  <input
                    value={driveridset.vehicleBean.registrationNumber}
                    readOnly
                    className="form-control"
                  />
                  <br />
                  <label class="form-label">Seating-Capacity</label>
                  <input
                    value={driveridset.vehicleBean.seatingapacity}
                    readOnly
                    className="form-control"
                  />
                  <br />
                  <label class="form-label">Driver-Name</label>
                  <input
                    value={driveridset.name}
                    readOnly
                    className="form-control"
                  />
                  <br />
                  <label class="form-label">Driver-MobileNo</label>
                  <input
                    value={driveridset.mobileno}
                    readOnly
                    className="form-control"
                  />
                  <br />
                </div>
              ) : (
                <span></span>
              )}
              <br />
              {driverid && routeid ? (
                <div>
                  <br />
                  <h5 style={{ marginTop: "5px" }}>JOURNEY DETAILS</h5>
                  <form onSubmit={handlesubmit}>
                    <label class="form-label" style={{ fontWeight: "bolder" }}>
                      Pick your Journey Date
                    </label>
                    <input
                      type="date"
                      id="journeyDate"
                      onChange={handlechange}
                      required
                      className="form-control"
                    />
                    <label class="form-label">Booking -Date</label>
                    <input
                      value={Date().slice(0, 10)}
                      readOnly
                      className="form-control"
                      id="bookingDate"
                    />
                    <label class="form-label">Boarding-Point</label>
                    <input
                      type="text"
                      id="boardingPoint"
                      value={routeidset.source}
                      readOnly
                      className="form-control"
                    />
                    <label class="form-label">Drop-Point</label>
                    <input
                      type="text"
                      id="dropPoint"
                      defaultValue={routeidset.destination}
                      readOnly
                      className="form-control"
                    />
                    <label class="form-label">Total fare in RS</label>
                    <input
                      value={
                        "₹" +
                        " " +
                        parseInt(driveridset.vehicleBean.farePerKM) *
                          parseInt(routeidset.distance)
                      }
                      id="totalFare"
                      readOnly
                      className="form-control"
                    />
                    <h5 style={{ marginTop: "20px" }}>TOTAL FARE</h5>
                    <input
                      value={
                        parseInt(driveridset.vehicleBean.farePerKM) *
                          parseInt(routeidset.distance) +
                        " Rs only"
                      }
                      readOnly
                      className="form-control"
                      style={{ fontWeight: "bolder", fontSize: "18px" }}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ margin: "20px", width: "200px" }}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;
