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
  const [activeTip, setActiveTip] = useState(null);
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
            <div className="tooltip-wrapper">

  <span>Monthly Rent</span>

  <button
    className="tooltip-icon"
    onClick={() =>
      setActiveTip(
        activeTip === "rent"
          ? null
          : "rent"
      )
    }
  >
    ?
  </button>

  {activeTip === "rent" && (
    <div className="tooltip-box">
      The amount paid each month to
      rent a property.
    </div>
  )}

</div>
            <input
              value={rent || ""}
              onChange={(e) =>
                setRent(Number(e.target.value) || 0)
              }
            />
          </div>

          <div className="input-row">
           <div className="tooltip-wrapper">

  <span>Monthly Bond</span>

  <button
    className="tooltip-icon"
    onClick={() =>
      setActiveTip(
        activeTip === "bond"
          ? null
          : "bond"
      )
    }
  >
    ?
  </button>

  {activeTip === "bond" && (
    <div className="tooltip-box">
      Your monthly home loan payment
      when purchasing a property.
    </div>
  )}

</div>
            <input
              value={bond || ""}
              onChange={(e) =>
                setBond(Number(e.target.value) || 0)
              }
            />
          </div>

          <div className="input-row">
            <div className="tooltip-wrapper">

  <span>Deposit</span>

  <button
    className="tooltip-icon"
    onClick={() =>
      setActiveTip(
        activeTip === "deposit"
          ? null
          : "deposit"
      )
    }
  >
    ?
  </button>

  {activeTip === "deposit" && (
    <div className="tooltip-box">
      The upfront amount paid when
      buying a property. A larger
      deposit usually means a
      smaller loan.
    </div>
  )}

</div>
            <input
              value={deposit || ""}
              onChange={(e) =>
                setDeposit(Number(e.target.value) || 0)
              }
            />
          </div>

          <div className="input-row">
            <div className="tooltip-wrapper">

  <span>Property Growth %</span>

  <button
    className="tooltip-icon"
    onClick={() =>
      setActiveTip(
        activeTip === "growth"
          ? null
          : "growth"
      )
    }
  >
    ?
  </button>

  {activeTip === "growth" && (
    <div className="tooltip-box">
      The estimated yearly increase
      in the value of the property. 
      Most properties grow between
      5% and 10% per year over
      long periods, although this
      is not guaranteed.
    </div>
  )}

</div>
            <input
              value={growth || ""}
              onChange={(e) =>
                setGrowth(Number(e.target.value) || 0)
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
    ?
  </button>

  {activeTip === "years" && (
    <div className="tooltip-box">
      The length of time over which
      you want to compare renting
      and buying.
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