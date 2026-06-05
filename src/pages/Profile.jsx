import Navbar from "../components/Navbar";
import BackToTop from "../components/BackToTop";

import { useFinancial } from "../context/FinancialContext";

import "./profile.css";

export default function Profile() {
  const {
    name,
    age,
    income,
    riskTolerance,
    goal,
  } = useFinancial();

  return (
    <div className="profile-page">
      <Navbar />

      <div className="header">
        My Profile
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

      <BackToTop />
    </div>
  );
}