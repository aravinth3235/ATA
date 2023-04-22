import React, { useEffect, useState } from "react";
import CustomerService from "../Service/Customerservice";
import Navbar2 from "./Navbar2";
import { Link } from "react-router-dom";

function ReservationById() {
  const [resv, setresv] = useState([]);
  const userId = window.location.pathname.split("/")[2];

  useEffect(() => {
    if (userId) {
      CustomerService.getReservationByusrId(userId).then((res) => setresv(res));
    }
  }, [userId]);
  const cancelreservation = (id) => {
    let ans = window.confirm(
      `Do you want Delete your Booking and the Booking ID is ${id}  `
    );

    if (ans) {
      CustomerService.deleteResrvation(id).then((res) => {
        setresv(resv.filter((item) => item.reservationID !== id));
      });
    }
  };
  return (
    <>
      <Navbar2 />
      <div className="container-sm">
        <h4 style={{ marginTop: "25px", marginBottom: "50px" }}>
          View Reservation
        </h4>
        <Link
          to={`/booking/${userId}`}
          className="btn btn-primary"
          style={{ marginBottom: "20px" }}
        >
          Book Vehicle
        </Link>

        {resv.length ? (
          <table
            cellPadding="2px"
            border="1px"
            align="center"
            className="table table-bordered"
          >
            <thead>
              <tr>
                <th>BookingID</th>
                <th>JourneyDate</th>
                <th>BookingDate</th>

                <th>BoardingPoint</th>
                <th>DropPoint</th>

                <th>Driver - name</th>
                <th>vehicle - name</th>

                <th>vehicle - registrationNumber</th>
              </tr>
            </thead>
            <tbody>
              {resv.map((r) => {
                return (
                  <tr>
                    <td>{r.reservationID}</td>
                    <td>{r.journeyDate}</td>
                    <td>{r.bookingDate}</td>

                    <td>{r.boardingPoint}</td>
                    <td>{r.dropPoint}</td>

                    <td>{r.driverBean.name}</td>
                    <td>{r.driverBean.vehicleBean.name}</td>

                    <td>{r.driverBean.vehicleBean.registrationNumber}</td>
                    <td>
                      <button
                        onClick={() => cancelreservation(r.reservationID)}
                        className="btn btn-danger"
                      >
                        Cancel - Booking
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <span>You Have No Booking</span>
        )}
      </div>
    </>
  );
}

export default ReservationById;
