import React, { useEffect, useState } from "react";
import AdminService from "../Service/Adminservice";
import Navbar from "./Navbar";

function Reservationlist() {
  const [resv, setresv] = useState([]);

  useEffect(() => {
    AdminService.viewReservation().then((res) => setresv(res));
  }, []);
  console.log(resv);
  return (
    <>
      <Navbar />
      <div className="container-sm ">
        <h3 style={{ color: "Black", marginTop: "20px", marginBottom: "10px" }}>
          View Booking
        </h3>
        <table
          cellPadding="2px"
          border="1px"
          align="center"
          className="table table-dark table-hover"
          // style={{ color: "white", borderColor: "black", borderWidth: "5px" }}
        >
          <thead>
            <tr>
              <th>ReservationID</th>
              <th>JourneyDate</th>
              <th>BookingDate</th>
              <th>BookingStatus</th>
              <th>BoardingPoint</th>
              <th>DropPoint</th>
              <th>UserId</th>
              <th>driverID</th>
              <th>Driver - name</th>
              <th>vehicle - name</th>
              <th>vehicleID</th>
              <th>vehicle - registrationNumber</th>
            </tr>
          </thead>
          <tbody>
            {resv.map((r) => {
              return (
                <tr style={{ color: "white" }}>
                  <td>{r.reservationID}</td>
                  <td>{r.journeyDate}</td>
                  <td>{r.bookingDate}</td>
                  <td>{r.bookingStatus}</td>
                  <td>{r.boardingPoint}</td>
                  <td>{r.dropPoint}</td>
                  <td>{r.credentialsBean.userId}</td>
                  <td>{r.driverBean.driverID}</td>
                  <td>{r.driverBean.name}</td>
                  <td>{r.driverBean.vehicleBean.name}</td>
                  <td>{r.driverBean.vehicleBean.vehicleID}</td>
                  <td>{r.driverBean.vehicleBean.registrationNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Reservationlist;
