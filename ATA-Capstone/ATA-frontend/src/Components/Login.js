import React, { useEffect, useState } from "react";
import AdminService from "../Service/Adminservice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userId, setuserId] = useState();
  const [password, setpassword] = useState();
  const [submit, setsubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (submit) {
      AdminService.getLogin(userId, password).then((res) => {
        // alert(res);
        if (res === true) {
          AdminService.getusrById(userId).then((res) => {
            if (res.userType === "C") {
              navigate(`/booking/${userId}`);
            } else if (res.userType === "A") {
              navigate(`/routeList`);
            }
          });
        } else if (res === false) {
          setsubmit(false);
          alert("Sign up first");
          navigate(`/profileadd`);
        }
      });
    }
  }, [submit, userId, password, navigate]);

  // useEffect(() => {

  // }, [])

  const handleuser = (e) => {
    setuserId(e.target.value);
  };
  const handlepassword = (e) => {
    setpassword(e.target.value);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setsubmit(true);
  };

  const signup = () => {
    navigate(`/profileadd`);
  };
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <h1
        style={{
          paddingRight: "70%",
          paddingTop: "10px",
          paddingBottom: "10px",
          color: "black",
          backgroundColor: "#dc3545",
        }}
      >
        ATA Travel Agency
      </h1>
      <div
        className="formlogin"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "150px",
        }}
      >
        <form onSubmit={handlesubmit} style={{ width: "400px" }}>
          <label
            class="form-label"
            style={{ marginRight: "480px", fontSize: "18px", color: "black" }}
          >
            UserName
          </label>
          <input
            type="text"
            onChange={handleuser}
            required
            className="form-control"
          />
          <label
            class="form-label"
            style={{ marginRight: "480px", fontSize: "18px", color: "black" }}
          >
            Password
          </label>
          <input
            type="password"
            onChange={handlepassword}
            required
            className="form-control"
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ margin: "15px" }}
          >
            Login
          </button>
          <button onClick={signup} className="btn btn-primary">
            Sign-up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
