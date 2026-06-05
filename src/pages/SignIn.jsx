import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./profile.css";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
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

  return (
    <div className="profile-page">

      <div className="header">
        NextGen Wealth
      </div>

      <div className="profile-card">

        <div className="card-header">
          Sign In
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

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
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