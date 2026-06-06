import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";

import "./profile.css";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const savedEmail =
      localStorage.getItem("email");

    const savedPassword =
      localStorage.getItem("password");

    if (
      email === savedEmail &&
      password === savedPassword
    ) {
      navigate("/home");
    } else {
      setError(
        "Invalid email or password."
      );
    }
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

  gsap.fromTo(
  ".feature-card",
  {
    opacity: 0,
    y: 10,
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.1,
    delay: 0.3,
    ease: "power2.out",
  }
);

}, []);

  return (
    <div className="profile-page">

      <div className="header">
        NextGen Wealth
      </div>

      <div className="profile-card">


 <div className="signin-features">

  <div className="feature-card">
    <h3>📊 Track Progress</h3>

    <p>
      Monitor your financial growth and
      spending habits.
    </p>
  </div>

  <div className="feature-card">
    <h3>🎯 Reach Goals</h3>

    <p>
      Follow strategy tracks tailored
      to your objectives.
    </p>
  </div>

  <div className="feature-card">
    <h3>💰 Build Wealth</h3>

    <p>
      Explore simulations and learn
      long-term investing principles.
    </p>
  </div>
</div>
<div>
  
</div>

        <div className="profile-field">
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className="profile-field">
  <label>Password</label>

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

        {error && (
          <p className="profile-error">
            {error}
          </p>
        )}

        <button
          className="profile-button"
          onClick={handleLogin}
        >
          Sign In
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Don't have an account?
        </p>

        <button
          className="profile-button"
          onClick={() =>
            navigate("/setup-profile")
          }
        >
          Sign Up
        </button>

      </div>

    </div>
  );
}