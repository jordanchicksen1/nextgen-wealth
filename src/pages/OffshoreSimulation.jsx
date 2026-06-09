import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./simulation.css";
import BackToTop from "../components/BackToTop";
import gsap from "gsap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function OffshoreSimulation() {

  const [investment, setInvestment] = useState(0);
  const [years, setYears] = useState(0);

  const [localRate, setLocalRate] = useState(9);
  const [offshoreRate, setOffshoreRate] = useState(12);

  const [calculated, setCalculated] = useState(false);
  const [activeTip, setActiveTip] = useState(null);

  const localData = [];
  const offshoreData = [];

  let localTotal = 0;
  let offshoreTotal = 0;

  const chartData = [];

  for (let i = 1; i <= years; i++) {

    localTotal +=
      investment * 12 * (1 + localRate / 100);

    offshoreTotal +=
      investment * 12 * (1 + offshoreRate / 100);

    chartData.push({
      year: `Year ${i}`,
      Local: Math.floor(localTotal),
      Offshore: Math.floor(offshoreTotal)
    });

    

  }

  useEffect(() => {

  gsap.fromTo(
    ".header",
    {
      opacity: 0,
      y: 15,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }
  );

  gsap.fromTo(
    ".sim-layout .big-card",
    {
      opacity: 0,
      y: 25,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.out",
      delay: 0.1,
    }
  );

}, []);

  return (
    <div className="simulation">

      <Navbar />

      <div className="header">
        Simulation: Local vs Offshore
      </div>

      <div className="sim-layout">

        <div className="big-card">

          <div className="card-header">
            Input
          </div>

          <div className="input-row">
            <div className="tooltip-wrapper">

  <span>Monthly Investment</span>

  <button
    className="tooltip-icon"
    onClick={() =>
      setActiveTip(
        activeTip === "investment"
          ? null
          : "investment"
      )
    }
  >
    {activeTip === "investment" ? ">" : "?"}
  </button>

  {activeTip === "investment" && (
    <div className="tooltip-box">
      The amount you plan to invest
      every month into your portfolio.
    </div>
  )}

</div>
            <input
              value={investment || ""}
              onChange={(e) =>
                setInvestment(Number(e.target.value) || 0)
              }
            />
          </div>

          <div className="input-row">
            <div className="tooltip-wrapper">

  <span>Years</span>

  <button
    className="tooltip-icon"
    onClick={() =>
      setActiveTip(
        activeTip === "years"
          ? null
          : "years"
      )
    }
  >
    {activeTip === "years" ? ">" : "?"}
  </button>

  {activeTip === "years" && (
    <div className="tooltip-box">
      The investment period over
      which you want to compare
      local and offshore investing.
    </div>
  )}

</div>
            <input
              value={years || ""}
              onChange={(e) =>
                setYears(Number(e.target.value) || 0)
              }
            />
          </div>

          <div className="input-row">
            <div className="tooltip-wrapper">

  <span>Local Return %</span>

  <button
    className="tooltip-icon"
    onClick={() =>
      setActiveTip(
        activeTip === "local"
          ? null
          : "local"
      )
    }
  >
    {activeTip === "local" ? ">" : "?"}
  </button>

  {activeTip === "local" && (
    <div className="tooltip-box">
      The estimated annual return
      from South African investments.
      Historically, diversified local
      portfolios have often achieved
      around 8–12% per year.
    </div>
  )}

</div>
            <input
              value={localRate || ""}
              onChange={(e) =>
                setLocalRate(Number(e.target.value) || 0)
              }
            />
          </div>

          <div className="input-row">
            <div className="tooltip-wrapper">

  <span>Offshore Return %</span>

  <button
    className="tooltip-icon"
    onClick={() =>
      setActiveTip(
        activeTip === "offshore"
          ? null
          : "offshore"
      )
    }
  >
    {activeTip === "offshore" ? ">" : "?"}
  </button>

  {activeTip === "offshore" && (
    <div className="tooltip-box">
      The estimated annual return
      from international investments.
      Offshore investing may provide
      additional diversification and
      exposure to global markets.
    </div>
  )}

</div>
            <input
              value={offshoreRate || ""}
              onChange={(e) =>
                setOffshoreRate(Number(e.target.value) || 0)
              }
            />
          </div>

          <button
            className="calculate-btn"
            onClick={() => setCalculated(true)}
          >
            Calculate
          </button>

        </div>

        <div className="big-card">

          <div className="card-header">
            Results
          </div>

          {!calculated ? (

            <p>
              Enter values and calculate.
            </p>

          ) : (

            <>
              <div className="graph-container">

                <LineChart
                  width={320}
                  height={220}
                  data={chartData}
                >
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />

                  <Line
                    dataKey="Local"
                    stroke="#ef4444"
                  />

                  <Line
                    dataKey="Offshore"
                    stroke="#22c55e"
                  />

                </LineChart>

              </div>

              <div className="verdict">

                <p>
                  Local Portfolio:
                  <strong>
                    R{Math.floor(localTotal).toLocaleString()}
                  </strong>
                </p>

                <p>
                  Offshore Portfolio:
                  <strong>
                    R{Math.floor(offshoreTotal).toLocaleString()}
                  </strong>
                </p>

                <hr />

                <p>
                  Difference:
                  <strong>
                    R{Math.floor(
                      offshoreTotal - localTotal
                    ).toLocaleString()}
                  </strong>
                </p>

                {offshoreTotal > localTotal ? (
                  <p style={{ color: "green" }}>
                    Offshore investing
                    generated greater returns.
                  </p>
                ) : (
                  <p style={{ color: "red" }}>
                    Local investing
                    performed better.
                  </p>
                )}

              </div>

            </>
          )}

        </div>

      </div>

      <BackToTop />

    </div>
  );
}