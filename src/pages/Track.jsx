import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./tracks.css";
import BackToTop from "../components/BackToTop";
import { useFinancial } from "../context/FinancialContext";


import gsap from "gsap";

export default function Track() {
  const { id } = useParams();
  const { income, riskTolerance } = useFinancial();

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

tradeOffs: [
  "Less disposable income whilst saving for a deposit",
  "Property ownership includes maintenance costs",
  "Less flexibility to relocate"
],

warnings: [
  "Interest rates can increase over time",
  "Property values do not always rise",
  "Unexpected repairs can be expensive"
],

education:
  "Property ownership builds equity over time and can provide long-term financial stability. However, it requires patience, discipline, and a strong emergency fund.",

timeline: [
  "R120 000",
  "R240 000",
  "R360 000",
  "R480 000",
  "R600 000"
],
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

tradeOffs: [
  "Slower wealth growth than aggressive investing",
  "Requires consistent budgeting",
  "Lifestyle spending can delay goals"
],

warnings: [
  "Lifestyle inflation can reduce savings",
  "Emergency funds should not be neglected",
  "Consistency is more important than perfection"
],

education:
  "A balanced strategy aims to enjoy life today whilst still building wealth. It suits people who want flexibility and sustainable financial habits.",

timeline: [
  "R80 000",
  "R160 000",
  "R240 000",
  "R320 000",
  "R400 000"
],
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

tradeOffs: [
  "Higher investment risk",
  "Short-term market volatility",
  "Requires strong emotional discipline"
],

warnings: [
  "Portfolio values can fall temporarily",
  "Growth is never guaranteed",
  "Market downturns can be stressful"
],

education:
  "Aggressive investing focuses on maximising long-term growth through equities and global markets. It is best suited to investors with higher risk tolerance.",

timeline: [
  "R150 000",
  "R300 000",
  "R500 000",
  "R700 000",
  "R1 000 000"
],
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
  ".track-badge",
  {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.5,
    ease: "back.out(1.7)",
    delay: 0.2
  }
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

<div className="track-badge">

  {id === "property" &&
    "🏠 Recommended for Low–Moderate Risk Investors"}

  {id === "balanced" &&
    "⚖️ Recommended for Moderate Risk Investors"}

  {id === "aggressive" &&
    "🚀 Recommended for High Risk Investors"}

</div>

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
          <li
            key={i}
            className={completed.includes(i) ? "done" : ""}
          >
            {completed.includes(i) ? "✅ " : "⬜ "}
            {m}
          </li>
        ))}
      </ul>
    </div>

    <div className="big-card">
      <div className="card-header">Recommendation</div>

      <p>{track.recommendation}</p>

      <hr />

      {income < 20000 && (
        <p>
          Based on your income, focus on building an
          emergency fund before taking on large
          financial commitments.
        </p>
      )}

      {income >= 20000 && income < 50000 && (
        <p>
          You may be in a position to balance saving
          and investing whilst pursuing this strategy.
        </p>
      )}

      {income >= 50000 && (
        <p>
          Your income suggests you may be able to
          pursue this strategy more aggressively.
        </p>
      )}

      <p>
        <strong>Risk Profile:</strong>{" "}
        {riskTolerance}
      </p>
    </div>

  </div>

  <div className="track-right">

    <div className="big-card">
  <div className="card-header">
    Timeline
  </div>

  <p className="timeline-intro">
    Estimated milestones based on consistently
    following this strategy over the next five years. Click on the projected amount saved once you have saved the required amount of money.
  </p>

  {track.timeline.map((amount, i) => (
        <div
          key={i}
          className="timeline-row"
        >
          <h3>Year {i + 1}</h3>

          <div
            className={`timeline-box ${
              completed.includes(i)
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleClick(i)
            }
          >
            {amount}
          </div>
        </div>
      ))}


    </div>

  </div>

</div>

<div className="track-bottom">

  <div className="track-bottom-row">

    <div className="big-card">
      <div className="card-header">
        Trade-Offs
      </div>

      <div className="callout-list">

  {track.tradeOffs.map((item, i) => (

    <div
      key={i}
      className="callout tradeoff-callout"
    >
      💸 {item}
    </div>

  ))}

</div>
    </div>

    <div className="big-card">
      <div className="card-header">
        Warnings
      </div>

      <div className="callout-list">

  {track.warnings.map((item, i) => (

    <div
      key={i}
      className="callout warning-callout"
    >
      ⚠️ {item}
    </div>

  ))}

</div>
    </div>

  </div>

  <div className="big-card">
    <div className="card-header">
      Why This Strategy Works
    </div>

    <p>{track.education}</p>
  </div>

</div>

<BackToTop />
    </div>
  );
}