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

export default function PropertySimulation() {

  const [rent, setRent] = useState(0);
  const [bond, setBond] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [growth, setGrowth] = useState(8);
  const [years, setYears] = useState(0);

  const [calculated, setCalculated] = useState(false);

  const propertyValue =
    deposit * Math.pow(1 + growth / 100, years);

  const totalRent = rent * 12 * years;
  const totalBond = bond * 12 * years;

  const equity = propertyValue + totalBond;

  const data = [];

  for (let i = 1; i <= years; i++) {

    data.push({
      year: `Year ${i}`,
      Rent: rent * 12 * i,
      Property:
        deposit * Math.pow(1 + growth / 100, i)
    });

  }

  return (
    <div className="simulation">

      <Navbar />

      <div className="header">
        Simulation: Property vs Rent
      </div>

      <div className="sim-layout">

        <div className="big-card">

          <div className="card-header">
            Input
          </div>

          <div className="input-row">
            <span>Monthly Rent</span>
            <input
              value={rent || ""}
              onChange={(e) =>
                setRent(Number(e.target.value) || 0)
              }
            />
          </div>

          <div className="input-row">
            <span>Monthly Bond</span>
            <input
              value={bond || ""}
              onChange={(e) =>
                setBond(Number(e.target.value) || 0)
              }
            />
          </div>

          <div className="input-row">
            <span>Deposit</span>
            <input
              value={deposit || ""}
              onChange={(e) =>
                setDeposit(Number(e.target.value) || 0)
              }
            />
          </div>

          <div className="input-row">
            <span>Property Growth %</span>
            <input
              value={growth || ""}
              onChange={(e) =>
                setGrowth(Number(e.target.value) || 0)
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
                  data={data}
                >
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />

                  <Line
                    dataKey="Property"
                    stroke="#22c55e"
                  />

                  <Line
                    dataKey="Rent"
                    stroke="#ef4444"
                  />

                </LineChart>

              </div>

              <div className="verdict">

                <p>
                  Total Rent Paid:
                  <strong>
                    R{Math.floor(totalRent).toLocaleString()}
                  </strong>
                </p>

                <p>
                  Property Value:
                  <strong>
                    R{Math.floor(propertyValue).toLocaleString()}
                  </strong>
                </p>

                <p>
                  Estimated Equity:
                  <strong>
                    R{Math.floor(equity).toLocaleString()}
                  </strong>
                </p>

                <hr />

                {equity > totalRent ? (
                  <p style={{ color: "green" }}>
                    Buying appears to build
                    more long-term wealth.
                  </p>
                ) : (
                  <p style={{ color: "red" }}>
                    Renting may currently be
                    more affordable.
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