import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import "./simulation.css";
import BackToTop from "../components/BackToTop";


import gsap from "gsap";

export default function SimulationsOverview() {

  useEffect(() => {
    
    gsap.fromTo(
      ".header",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );

   
    gsap.fromTo(
      ".intro-card",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.1,
      }
    );

    
    gsap.fromTo(
      ".sim-grid .big-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.2,
      }
    );

  }, []);

  return (
    <div className="simulation">
      <Navbar />

    
      <div className="header">Simulation Lab</div>

      
      <div className="big-card intro-card">
        <div className="card-header">Explore Financial Decisions</div>

        <p className="intro-text">
          Simulations allow you to test real financial decisions and see how
          they impact your future. Adjust values and explore different paths
          before making real-world choices.
        </p>
      </div>

     
      <div className="sim-grid">

       
        <div className="big-card">
          <div className="card-header">Property vs Rent</div>

          <p className="sim-description">
            Should you rent or buy a property?
          </p>

          <button className="sim-button" disabled>
            Calculate
          </button>
        </div>

       
        <div className="big-card">
          <div className="card-header">Car vs Investment</div>

          <p className="sim-description">
            Should you buy a car or invest instead?
          </p>

          <Link to="/simulation">
            <button className="sim-button">
              Calculate
            </button>
          </Link>
        </div>

       
        <div className="big-card">
          <div className="card-header">Local vs Offshore</div>

          <p className="sim-description">
            Invest in local or offshore accounts?
          </p>

          <button className="sim-button" disabled>
            Calculate
          </button>
        </div>

      </div>

      <BackToTop />
    </div>
  );
}