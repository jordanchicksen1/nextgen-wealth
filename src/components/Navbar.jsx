import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <h3 className="logo">NextGen</h3>

        <div className="nav-links">
          <Link className={location.pathname === "/" ? "active" : ""} to="/">
            Home
          </Link>

          <Link className={location.pathname === "/dashboard" ? "active" : ""} to="/dashboard">
            MoneyShot
          </Link>

          <Link className={location.pathname === "/tracks" ? "active" : ""} to="/tracks">
            Tracks
          </Link>

          <Link className={location.pathname === "/simulations" ? "active" : ""} to="/simulations">
            Simulations
          </Link>
        </div>
      </nav>
    </div>
  );
}