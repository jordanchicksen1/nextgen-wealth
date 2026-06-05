import { useNavigate } from "react-router-dom";
import { useFinancial } from "../context/FinancialContext";
import { useState } from "react";

import "./profile.css";

export default function ProfileSetup() {
  const navigate = useNavigate();

  const {
    name,
    setName,
    age,
    setAge,
    income,
    setIncome,
    riskTolerance,
    setRiskTolerance,
    goal,
    setGoal,
    email,
    setEmail,
    password,
    setPassword,
  } = useFinancial();

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
  if (
    !email ||
    !password ||
    !name ||
    !age ||
    !income
  ) {
    setError("Please complete all required fields.");
    return;
  }

  localStorage.setItem(
    "user",
    JSON.stringify({
      email,
      password,
      name,
      age,
      income,
      riskTolerance,
      goal,
    })
  );

  navigate("/");
};

  return (
    <div className="profile-page">

      <div className="header">
        Create Your Profile
      </div>

<div className="profile-intro">

  <h2>🚀 Start Your Financial Journey</h2>

  <p>
    Create a profile so NextGen Wealth can
    personalise simulations, strategy tracks
    and recommendations based on your goals.
  </p>

</div>


      <div className="profile-card">

        <div className="card-header">
          Personal Information
        </div>

        <div className="profile-field">
        <label>📧 Email</label>

  <input
    type="email"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
  />
</div>

<div className="profile-field">
  <label>🔒 Password</label>

  <div className="password-wrapper">

    <input
      type={
        showPassword
          ? "text"
          : "password"
      }
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
    />

    <button
      type="button"
      className="eye-button"
      onClick={() =>
        setShowPassword(!showPassword)
      }
    >
      {showPassword ? "🙈" : "👁️"}
    </button>

  </div>
</div>

        <div className="profile-field">
          <label>👤 Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="profile-field">
          <label>🎂 Age</label>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="profile-field">
          <label>💰 Monthly Income</label>
          <input
            value={income === 0 ? "" : income}
            onChange={(e) =>
              setIncome(Number(e.target.value) || 0)
            }
          />
        </div>

        <div className="profile-field">
          <label>🛡️ Risk Tolerance</label>

          <select
            value={riskTolerance}
            onChange={(e) =>
              setRiskTolerance(e.target.value)
            }
          >
            <option>🛡️ Conservative</option>
            <option>⚖️ Moderate</option>
            <option>🚀 Aggressive</option>
          </select>
        </div>

        <div className="profile-field">
          <label>🎯 Primary Goal</label>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option>🏠 Property</option>
            <option>💰 Retirement</option>
            <option>🧰 Emergency Fund</option>
            <option>🌍 Wealth Building</option>
          </select>
        </div>

        {error && (
          <p className="profile-error">
            {error}
          </p>
        )}

        <button
          className="profile-button"
          onClick={handleSubmit}
        >
          Create Account
        </button>

      </div>

    </div>
  );
}