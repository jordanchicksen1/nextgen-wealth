import Navbar from "../components/Navbar";
import BackToTop from "../components/BackToTop";
import { useNavigate } from "react-router-dom";
import { useFinancial } from "../context/FinancialContext";
import { useEffect, useState } from "react";
import gsap from "gsap";

import "./profile.css";

export default function Profile() {
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
} = useFinancial();

  const [editing, setEditing] = useState(false);

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
<button
  className="edit-button"
  onClick={() => setEditing(!editing)}
>
  {editing ? "✔️" : "✏️"}
</button>

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

  {editing ? (
    <>
      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="number"
        value={age}
        onChange={(e) =>
          setAge(Number(e.target.value) || 0)
        }
      />
    </>
  ) : (
    <>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Age:</strong> {age}</p>
    </>
  )}
</div>

  <div className="profile-stat-card">
    <h2>💰 Income</h2>

    {editing ? (
  <input
    type="number"
    value={income}
    onChange={(e) =>
      setIncome(
        Number(e.target.value) || 0
      )
    }
  />
) : (
  <p>
    R{income.toLocaleString("en-ZA")}
  </p>
)}
  </div>

  <div className="profile-stat-card">
    <h2>🛡️ Risk Profile</h2>

    {editing ? (
  <select
    value={riskTolerance}
    onChange={(e) =>
      setRiskTolerance(
        e.target.value
      )
    }
  >
    <option value="Low">
      Conservative
    </option>

    <option value="Moderate">
      Moderate
    </option>

    <option value="High">
      Aggressive
    </option>
  </select>
) : (
  <p>{riskTolerance}</p>
)}
  </div>

  <div className="profile-stat-card">
    <h2>🎯 Goal</h2>

   {editing ? (
  <select
    value={goal}
    onChange={(e) =>
      setGoal(
        e.target.value
      )
    }
  >
    <option value="Property">
      Property
    </option>

    <option value="Retirement">
      Retirement
    </option>

    <option value="Emergency Fund">
      Emergency Fund
    </option>

    <option value="Wealth Building">
      Wealth Building
    </option>
  </select>
) : (
  <p>{goal}</p>
)}
  </div>


<div className="profile-recommendation">

  <h2>📊 Personal Recommendation</h2>

  {goal.includes("Property") &&
    riskTolerance === "Low" && (
      <p>
        🏠 Cautious Home Planner

        <br /><br />

        Your goal is property ownership and
        your risk profile suggests a preference
        for stability.

        <br /><br />

        Focus on saving a strong deposit and
        understanding long-term home ownership
        costs through the Property First track.
      </p>
    )}

  {goal.includes("Property") &&
    riskTolerance !== "Low" && (
      <p>
        🏠 Future Homeowner

        <br /><br />

        Your goal is property ownership.

        <br /><br />

        The Property First track can help
        you understand deposits, bond
        repayments and property growth.
      </p>
    )}

  {goal.includes("Retirement") &&
    riskTolerance === "High" && (
      <p>
        🌱 Growth-Oriented Planner

        <br /><br />

        You are planning for retirement and
        appear comfortable taking more risk.

        <br /><br />

        Focus on long-term investing and the
        power of compound growth.
      </p>
    )}

  {goal.includes("Retirement") &&
    riskTolerance !== "High" && (
      <p>
        🌱 Long-Term Planner

        <br /><br />

        Consistent investing and patience
        are often more important than taking
        excessive risk.

        <br /><br />

        Building habits now can have a major
        impact on retirement.
      </p>
    )}

  {goal.includes("Emergency Fund") && (
    <p>
      🛟 Safety First

      <br /><br />

      Your priority should be building an
      emergency fund.

      <br /><br />

      Aim for 3–6 months of essential
      expenses before focusing heavily
      on long-term investing.
    </p>
  )}

  {goal.includes("Wealth Building") &&
    riskTolerance === "High" && (
      <p>
        📈 Growth Investor

        <br /><br />

        Your combination of Wealth Building
        and a High risk profile suggests that
        you are comfortable pursuing higher
        growth opportunities.

        <br /><br />

        The Global Wealth track may be a
        strong place to start.
      </p>
    )}

  {goal.includes("Wealth Building") &&
    riskTolerance === "Moderate" && (
      <p>
        📈 Balanced Wealth Builder

        <br /><br />

        Your profile suggests a balance
        between growth and stability.

        <br /><br />

        Focus on diversification and
        long-term investing through the
        Global Wealth track.
      </p>
    )}

  {goal.includes("Wealth Building") &&
    riskTolerance === "Low" && (
      <p>
        📈 Cautious Wealth Builder

        <br /><br />

        Your goal is long-term wealth,
        but your preference for lower risk
        suggests that consistency and
        diversification should be your
        primary focus.
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