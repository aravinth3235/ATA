import React, { useState } from "react";
import AdminService from "../Service/Adminservice";
import Navbar from "./Navbar";
import "./AddAdmin.css";

function AddAdmin() {
  const [admin, setadmin] = useState({
    userId: "",
    password: "",
    userType: "A",
    loginStatus: "True",
  });

  const handleChange = (e) => {
    setadmin({ ...admin, [e.target.id]: e.target.value });
  };
  const handlesubmmit = (e) => {
    e.preventDefault();
    AdminService.addAdmin(admin).then((res) => alert("Admin is Addes"));
  };
  return (
    <>
      <Navbar />
      <h3>Add Admin for access Admin Dashboard</h3>
      <div className="container" style={{ width: "600px" }}>
        <form onSubmit={handlesubmmit} className="form-addadmin">
          <label className="form-label">UserName for admin</label>
          <input
            type="text"
            required
            id="userId"
            onChange={(e) => {
              setadmin({ ...admin, userId: e.target.value });
            }}
            className="form-control"
          />
          <label className="form-label">Password for Admin</label>
          <input
            type="password"
            required
            id="password"
            onChange={handleChange}
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">
            Add Admin
          </button>
        </form>
      </div>
    </>
  );
}

export default AddAdmin;
