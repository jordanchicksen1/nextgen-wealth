import { useNavigate } from "react-router-dom";

import "./profile.css";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="profile-page">

      <div className="header">
        NextGen Wealth
      </div>

      <div className="profile-card">

        <div className="card-header">
          Welcome
        </div>

        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Begin your financial journey.
        </p>

        <button
          className="profile-button"
          onClick={() =>
            navigate("/setup-profile")
          }
        >
          Create Profile
        </button>

      </div>

    </div>
  );
}