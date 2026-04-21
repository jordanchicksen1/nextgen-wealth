import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import "./tracks.css";
import BackToTop from "../components/BackToTop";


import gsap from "gsap";

export default function TracksOverview() {

  useEffect(() => {
    
    gsap.fromTo(
      ".tracks-intro",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    );

   
    gsap.fromTo(
      ".track-card",
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
    <div className="tracks">
      <Navbar />

      
      <div className="header">Strategy Tracks</div>

      
      <div className="tracks-intro">
        <div className="card-header">Choose Your Financial Path</div>
        <p>
          Strategy Tracks guide you through structured financial decisions over
          time. Each path focuses on a different goal — whether it's buying
          property, balancing lifestyle and savings, or maximising long-term
          wealth.
        </p>
      </div>

      
      <div className="track-list">

        <Link to="/tracks/property" className="track-card property">
          <div className="track-icon">🏠</div>
          <div className="card-header">Property First</div>
          <p>Focus on securing a property early</p>
          <button>Select</button>
        </Link>

        <Link to="/tracks/balanced" className="track-card balanced">
          <div className="track-icon">⚖️</div>
          <div className="card-header">Balanced Lifestyle</div>
          <p>Live a moderate lifestyle whilst saving</p>
          <button>Select</button>
        </Link>

        <Link to="/tracks/aggressive" className="track-card aggressive">
          <div className="track-icon">🌍</div>
          <div className="card-header">Global Wealth</div>
          <p>Build wealth through global investments</p>
          <button>Select</button>
        </Link>

      </div>

      <BackToTop />
    </div>
  );
}