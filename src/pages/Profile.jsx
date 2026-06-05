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

        <div className="card-header">
          Profile Summary
        </div>

        <div className="profile-display">
          <strong>Name:</strong> {name}
        </div>

        <div className="profile-display">
          <strong>Age:</strong> {age}
        </div>

        <div className="profile-display">
          <strong>Monthly Income:</strong> R{income.toLocaleString("en-ZA")}
        </div>

        <div className="profile-display">
          <strong>Risk Tolerance:</strong> {riskTolerance}
        </div>

        <div className="profile-display">
          <strong>Primary Goal:</strong> {goal}
        </div>

      </div>

      <BackToTop />
    </div>
  );
}