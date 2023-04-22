import React, { useEffect, useState } from "react";
import AdminService from "../Service/Adminservice";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function DriverList() {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  useEffect(() => {
    AdminService.getDriver().then((res) => {
      setdata(res);
    });
  }, []);
  console.log(data);
  const create = () => {
    navigate("/adddriver");
  };
  const deletedriver = (id) => {
    let ans = window.confirm(`Do you want Delete ${id} `);
    if (ans) {
      AdminService.deleteDriver(id).then(() => {
        setdata(data.filter((item) => item.driverID !== id));
      });
    } else {
      return;
    }
  };
  return (
    <>
      <Navbar />

      <div className="container-sm ">
        <h2>Available Drivers</h2>
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
              <th>DriverID</th>
              <th>Driver-Name</th>
              <th>LicenseNumber</th>
              <th>Mobileno</th>
              <th>Location</th>
              <th>Street</th>
              <th>State</th>
              <th>Assigned-vehicleID</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => {
              return (
                <tr key={d.driverID}>
                  <td>{d.driverID}</td>
                  <td>{d.name}</td>
                  <td>{d.licenseNumber}</td>
                  <td>{d.mobileno}</td>
                  <td>{d.location}</td>
                  <td>{d.street}</td>
                  <td>{d.state}</td>
                  <td>{d.vehicleBean ? d.vehicleBean.vehicleID : ""}</td>
                  <td>
                    <Link
                      to={`/editdriver/${d.driverID}`}
                      className="btn btn-success"
                      style={{ width: "65px" }}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deletedriver(d.driverID)}
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

export default DriverList;
