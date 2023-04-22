import React, { useState } from "react";
import CustomerService from "../Service/Customerservice";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./Navbar2";
import "./Addprofile.css";

function Addprofile() {
  const navigate = useNavigate();
  const [profile, setprofile] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    street: "",
    location: "",
    city: "",
    state: "",
    pincode: "",
    mobileNo: "",
    emailID: "",
    password: "",
    credentialBean: {
      userId: "",
      password: "",
      userType: "C",
      loginStatus: "True",
    },
  });

  const handlechange = (e) => {
    setprofile({ ...profile, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    CustomerService.Addprofile(profile).then((res) => {
      alert("Profile is added");
      navigate("/");
    });
  };
  return (
    <>
      <Navbar2 />

      <div style={{ marginTop: "35px" }}>
        <h4 style={{ marginBottom: "25px" }}>
          Add Your profile in ATA Travel Agency
        </h4>
        <form onSubmit={handleSubmit} className="profilesd">
          <div className="profile-form">
            <div className="profileform1">
              <label class="form-label">First Name</label>
              <input
                id="firstName"
                onChange={handlechange}
                required
                className="form-control"
              />
              <label class="form-label">last Name</label>
              <input
                id="lastName"
                onChange={handlechange}
                required
                className="form-control"
              />
              <label class="form-label">Date of Birth</label>
              <input
                id="dateOfBirth"
                onChange={handlechange}
                required
                className="form-control"
              />
              <label class="form-label">Gender</label>
              <input
                id="gender"
                onChange={handlechange}
                required
                className="form-control"
              />
              <label class="form-label">Street</label>
              <input
                id="street"
                onChange={handlechange}
                required
                className="form-control"
              />
              <label class="form-label">Location</label>
              <input
                id="location"
                onChange={handlechange}
                required
                className="form-control"
              />
            </div>
            <div>
              <label class="form-label">City</label>
              <input
                id="city"
                onChange={handlechange}
                required
                className="form-control"
              />

              <label class="form-label">State</label>
              <input
                id="state"
                onChange={handlechange}
                required
                className="form-control"
              />
              <label class="form-label">Pincode</label>
              <input
                id="pincode"
                onChange={handlechange}
                required
                className="form-control"
              />
              <label class="form-label">Mobile No</label>
              <input
                id="mobileNo"
                onChange={handlechange}
                required
                className="form-control"
              />
              <label class="form-label">Email-ID</label>
              <input
                id="emailID"
                type="email"
                onChange={handlechange}
                required
                className="form-control"
              />
              <label class="form-label">UserName</label>
              <input
                id="userId"
                onChange={(e) => {
                  setprofile({
                    ...profile,
                    credentialBean: {
                      ...profile.credentialBean,
                      [e.target.id]: e.target.value,
                    },
                  });
                }}
                required
                className="form-control"
              />
            </div>
          </div>
          <label class="form-label">Password</label>
          <input
            id="password"
            onChange={(e) => {
              setprofile({
                ...profile,
                credentialBean: {
                  ...profile.credentialBean,
                  [e.target.id]: e.target.value,
                },
              });
            }}
            required
            className="form-control"
            style={{ width: "400px", marginLeft: "37%" }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Addprofile;
