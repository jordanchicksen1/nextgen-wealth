import { useNavigate } from "react-router-dom";
import { useFinancial } from "../context/FinancialContext";
import { useState, useEffect } from "react";
import gsap from "gsap";

import "./profile.css";

export default function ProfileSetup() {
  const navigate = useNavigate();

  const {
  setName,
  setAge,
  setIncome,
  setRiskTolerance,
  setGoal,
  setEmail,
  setPassword,
} = useFinancial();

const [name, updateName] = useState("");
const [age, updateAge] = useState("");
const [income, updateIncome] = useState("");
const [riskTolerance, updateRiskTolerance] =
  useState("Moderate");

const [goal, updateGoal] =
  useState("Property");

const [email, updateEmail] =
  useState("");

const [password, updatePassword] =
  useState("");

  const [error, setError] = useState("");

  const handleSubmit = () => {
  if (!email || !password || !name || !age || !income) {
    setError("Please complete all required fields.");
    return;
  }

  setEmail(email);
  setPassword(password);

  setName(name);
  setAge(age);

  setIncome(Number(income));

  setRiskTolerance(riskTolerance);
  setGoal(goal);

  navigate("/");
};

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
    ".profile-card",
    { opacity: 0, y: 25 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }
  );
}, []);

  return (
    <div className="profile-page">

      <div className="header">
        Create Your Profile
      </div>

      <div className="profile-card">

        <div className="card-header">
          Personal Information
        </div>

        <div className="profile-field">
        <label>Email</label>

  <input
    type="email"
    style = {{width:"100%"}}
    value={email}
    onChange={(e) =>
      updateEmail(e.target.value)
    }
  />
</div>

<div className="profile-field">
  <label>Password</label>

  <input
    type="password"
    value={password}
    onChange={(e) =>
      updatePassword(e.target.value)
    }
  />
</div>

        <div className="profile-field">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => updateName(e.target.value)}
          />
        </div>

        <div className="profile-field">
          <label>Age</label>
          <input
            value={age}
            onChange={(e) => updateAge(e.target.value)}
          />
        </div>

        <div className="profile-field">
          <label>Monthly Income</label>
          <input
            value={income === 0 ? "" : income}
            onChange={(e) =>
              updateIncome(Number(e.target.value) || 0)
            }
          />
        </div>

        <div className="profile-field">
          <label>Risk Tolerance</label>

          <select
            value={riskTolerance}
            onChange={(e) =>
              updateRiskTolerance(e.target.value)
            }
          >
            <option>Conservative</option>
            <option>Moderate</option>
            <option>Aggressive</option>
          </select>
        </div>

        <div className="profile-field">
          <label>Primary Goal</label>

          <select
            value={goal}
            onChange={(e) => updateGoal(e.target.value)}
          >
            <option>Property</option>
            <option>Retirement</option>
            <option>Emergency Fund</option>
            <option>Wealth Building</option>
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