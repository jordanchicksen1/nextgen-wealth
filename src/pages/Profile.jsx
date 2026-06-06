import Navbar from "../components/Navbar";
import BackToTop from "../components/BackToTop";
import { useNavigate } from "react-router-dom";
import { useFinancial } from "../context/FinancialContext";
import { useEffect } from "react";
import gsap from "gsap";

import "./profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const {
    name,
    age,
    income,
    riskTolerance,
    goal,
  } = useFinancial();

 useEffect(() => {
  gsap.fromTo(
    ".header",
    { opacity: 0, y: -15 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }
  );

  gsap.fromTo(
    ".profile-intro, .profile-card",
    { opacity: 0, y: 25 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
    }
  );

  gsap.fromTo(
    ".profile-stat-card, .profile-recommendation",
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.45,
      stagger: 0.12,
      delay: 0.5,
      ease: "power2.out",
    }
  );

  gsap.fromTo(
    ".profile-button",
    {
      opacity: 0,
      scale: 0.9,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      delay: 1,
      ease: "back.out(1.7)",
    }
  );
}, []);

  return (
    <div className="profile-page">
      <Navbar />

      <div className="header">
        My Profile
      </div>

      <div className="profile-intro">
  <h2>👋 Hi there, {name}</h2>

  <p>
    Track your progress, review your financial
    profile and explore recommendations
    tailored to your goals.
  </p>
</div>

      <div className="profile-card">

        <div className="profile-grid">

  <div className="profile-stat-card">
    <h2>👤 Profile</h2>

    <p><strong>Name:</strong> {name}</p>
    <p><strong>Age:</strong> {age}</p>
  </div>

  <div className="profile-stat-card">
    <h2>💰 Income</h2>

    <p>
      R{income.toLocaleString("en-ZA")}
    </p>
  </div>

  <div className="profile-stat-card">
    <h2>🛡️ Risk Profile</h2>

    <p>{riskTolerance}</p>
  </div>

  <div className="profile-stat-card">
    <h2>🎯 Goal</h2>

    <p>{goal}</p>
  </div>


<div className="profile-recommendation">

  <h2>📊 Personal Recommendation</h2>

  {goal.includes("Property") && (
    <p>
      Property First may be the most suitable
      strategy track for your current goal.
    </p>
  )}

  {goal.includes("Retirement") && (
    <p>
      Focus on long-term contributions and
      compound growth.
    </p>
  )}

  {goal.includes("Emergency") && (
    <p>
      Building a cash reserve should be your
      first priority before investing heavily.
    </p>
  )}

  {goal.includes("Wealth") && (
    <p>
      Global Wealth may align with your
      long-term objectives.
    </p>
  )}

</div>
</div>
      </div>

<button
  className="profile-button"
  onClick={() => navigate("/")}
>
  Sign Out
</button>

      <BackToTop />
    </div>
  );
}