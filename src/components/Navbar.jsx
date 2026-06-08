import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "./navbar.css";

export default function Navbar() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {

    if (!menuRef.current) return;

    if (window.innerWidth > 768) return;

    if (menuOpen) {

      gsap.fromTo(
        menuRef.current,
        {
          height: 0,
        },
        {
          height: menuRef.current.scrollHeight,
          duration: 0.45,
          ease: "power2.out",
        }
      );

    }

  }, [menuOpen]);

  useEffect(() => {

  const handleResize = () => {

    if (window.innerWidth > 768) {

      setMenuOpen(false);

      gsap.set(menuRef.current, {
        clearProps: "all",
      });

    }

  };

  window.addEventListener(
    "resize",
    handleResize
  );

  return () =>
    window.removeEventListener(
      "resize",
      handleResize
    );

}, []);

gsap.fromTo(
  linksRef.current,
  {
    opacity: 0,
    y: -10,
  },
  {
    opacity: 1,
    y: 0,
    stagger: 0.08,
    duration: 0.25,
    ease: "power2.out",
    delay: 0.1,
  }
);


  return (
    <div className="navbar-wrapper">

      <nav className="navbar">

        <div className="navbar-top">

          <h3 className="logo">NextGen</h3>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        <div
          ref={menuRef}
          className={`nav-links ${menuOpen ? "open" : ""}`}
        >

          <Link
            ref={(el) => (linksRef.current[0] = el)}
            className={location.pathname === "/home" ? "active" : ""}
            to="/home"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            ref={(el) => (linksRef.current[1] = el)}
            className={location.pathname === "/dashboard" ? "active" : ""}
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
          >
            MoneyShot
          </Link>

          <Link
            ref={(el) => (linksRef.current[2] = el)}
            className={location.pathname === "/tracks" ? "active" : ""}
            to="/tracks"
            onClick={() => setMenuOpen(false)}
          >
            Tracks
          </Link>

          <Link
            ref={(el) => (linksRef.current[3] = el)}
            className={location.pathname === "/simulations" ? "active" : ""}
            to="/simulations"
            onClick={() => setMenuOpen(false)}
          >
            Simulations
          </Link>

          <Link
            ref={(el) => (linksRef.current[4] = el)}
            className={location.pathname === "/profile" ? "active" : ""}
            to="/profile"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>

        </div>

      </nav>

    </div>
  );
}