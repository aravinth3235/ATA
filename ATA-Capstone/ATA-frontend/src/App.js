import { Routes, Route } from "react-router-dom";
import "./App.css";
import Addroute from "./Components/Addroute";
import Routelist from "./Components/Routelist";
import Vehiclelist from "./Components/Vehiclelist";
import Addvehicle from "./Components/Addvehicle";

import DriverList from "./Components/DriverList";
import AddDriver from "./Components/AddDriver";
import Reservationlist from "./Components/Reservationlist";
import Booking from "./Components/Booking";
import Login from "./Components/Login";
import Addprofile from "./Components/Addprofile";
import ReservationById from "./Components/ReservationById";
import AddAdmin from "./Components/AddAdmin";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div
      className="App"
      style={{
        margin: "0",
        padding: "0",
        height: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url()",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // color: "white",
        overflowY: "auto",
        fontWeight: "800px",
      }}
    >
      <Routes>
        <Route path="/profileadd" element={<Addprofile />} />
        <Route path="/" element={<Login />} />
        <Route path="/routeList" element={<Routelist />} />
        <Route path="/editroute/:id" element={<Addroute />} />
        <Route path="/createroute" element={<Addroute />} />
        <Route path="/vehiclelist" element={<Vehiclelist />} />
        <Route path="/editvehicle/:id" element={<Addvehicle />} />
        <Route path="/addvehicle" element={<Addvehicle />} />
        <Route path="/driverlist" element={<DriverList />} />
        <Route path="/adddriver" element={<AddDriver />} />
        <Route path="/editdriver/:id" element={<AddDriver />} />
        <Route path="/viewreservation" element={<Reservationlist />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/resrvationbyuseid/:id" element={<ReservationById />} />
        <Route path="/addadmin" element={<AddAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
