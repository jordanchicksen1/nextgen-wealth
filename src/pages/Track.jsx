import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./tracks.css";
import BackToTop from "../components/BackToTop";


import gsap from "gsap";

export default function Track() {
  const { id } = useParams();

  const [completed, setCompleted] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const tracks = {
    property: {
      title: "Track: Property First",
      summary: "This track focuses on saving for property",
      milestones: [
        "Emergency Fund",
        "Deposit saved",
        "Bond approved",
        "Property purchased",
        "Move in",
      ],
      recommendation: "Avoid large purchases",
      timeline: ["R120 000", "R240 000", "R360 000", "R480 000", "R600 000"],
    },

    balanced: {
      title: "Track: Balanced Lifestyle",
      summary: "Balance lifestyle and consistent investing",
      milestones: [
        "Budget created",
        "TFSA started",
        "Emergency fund built",
        "Increase contributions",
        "Portfolio growth",
      ],
      recommendation: "Keep spending disciplined",
      timeline: ["R80 000", "R160 000", "R240 000", "R320 000", "R400 000"],
    },

    aggressive: {
      title: "Track: Global Wealth",
      summary: "Focus on aggressive investing and growth",
      milestones: [
        "Cut expenses",
        "Max TFSA",
        "Invest offshore",
        "Scale investments",
        "Wealth accumulation",
      ],
      recommendation: "Prioritise long-term gains",
      timeline: ["R150 000", "R300 000", "R500 000", "R700 000", "R1 000 000"],
    },
  };

  const track = tracks[id];
  if (!track) return <div>Track not found</div>;

  const handleClick = (index) => {
    if (completed.includes(index)) {
      setCompleted(completed.filter((i) => i !== index));
    } else {
      setCompleted([...completed, index]);

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }
  };


  useEffect(() => {
    
    gsap.fromTo(
      ".header",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );

    
    gsap.fromTo(
      ".track-left .big-card",
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.1,
      }
    );

    
    gsap.fromTo(
      ".timeline-row",
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <div className="tracks">
      <Navbar />

      
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: Math.random() * 100 + "%",
                animationDelay: Math.random() * 1 + "s",
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

     
      <div className="header">{track.title}</div>

      <div className="track-layout">

   
        <div className="track-left">

          <div className="big-card">
            <div className="card-header">Track Summary</div>
            <p>{track.summary}</p>
          </div>

          <div className="big-card">
            <div className="card-header">Milestones</div>
            <ul>
              {track.milestones.map((m, i) => (
                <li key={i} className={completed.includes(i) ? "done" : ""}>
                  {completed.includes(i) ? "✅ " : "⬜ "}
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="big-card">
            <div className="card-header">Recommendation</div>
            <p>{track.recommendation}</p>
          </div>

        </div>

       
        <div className="track-right">
          <div className="big-card">
            <div className="card-header">Timeline</div>

            {track.timeline.map((amount, i) => (
              <div key={i} className="timeline-row">
                <h3>Year {i + 1}</h3>

                <div
                  className={`timeline-box ${
                    completed.includes(i) ? "active" : ""
                  }`}
                  onClick={() => handleClick(i)}
                >
                  {amount}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <BackToTop />
    </div>
  );
}