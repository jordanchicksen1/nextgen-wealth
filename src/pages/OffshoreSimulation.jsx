import { useState } from "react";
import Navbar from "../components/Navbar";
import "./simulation.css";
import BackToTop from "../components/BackToTop";

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
            <span>Monthly Investment</span>
            <input
              value={investment || ""}
              onChange={(e) =>
                setInvestment(Number(e.target.value) || 0)
              }
            />
          </div>

          <div className="input-row">
            <span>Years</span>
            <input
              value={years || ""}
              onChange={(e) =>
                setYears(Number(e.target.value) || 0)
              }
            />
          </div>

          <div className="input-row">
            <span>Local Return %</span>
            <input
              value={localRate || ""}
              onChange={(e) =>
                setLocalRate(Number(e.target.value) || 0)
              }
            />
          </div>

          <div className="input-row">
            <span>Offshore Return %</span>
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