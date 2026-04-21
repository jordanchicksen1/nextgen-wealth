import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./simulation.css";
import BackToTop from "../components/BackToTop";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";


import gsap from "gsap";

export default function Simulation() {
  const [salary, setSalary] = useState(0);
  const [carPrice, setCarPrice] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [investment, setInvestment] = useState(0);
  const [years, setYears] = useState(0);

  const [calculated, setCalculated] = useState(false);
  const [errors, setErrors] = useState({});

  const rate = 0.1;
  const months = years * 12;

  const formatMoney = (num) => num.toLocaleString("en-ZA");

  
  useEffect(() => {
   
    gsap.fromTo(
      ".header",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );

    
    gsap.fromTo(
      ".sim-layout .big-card",
      { opacity: 0, y: 25 },
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

 
  const validate = () => {
    const newErrors = {};

    if (!salary) newErrors.salary = true;
    if (!carPrice) newErrors.carPrice = true;
    if (!monthlyPayment) newErrors.monthlyPayment = true;
    if (!investment) newErrors.investment = true;
    if (!years) newErrors.years = true;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (validate()) {
      setCalculated(true);
    } else {
      setCalculated(false);
    }
  };

 
  const investmentValue =
    investment > 0 && years > 0
      ? investment *
        ((Math.pow(1 + rate / 12, months) - 1) / (rate / 12))
      : 0;

  const carTotal = monthlyPayment * 12 * years;
  const opportunityCost = investmentValue - carTotal;
  const affordability = salary > 0 ? (monthlyPayment / salary) * 100 : 0;

  
  const data = [];
  let investRunning = 0;
  let carRunning = 0;

  for (let i = 1; i <= years; i++) {
    investRunning += investment * 12 * 1.1;
    carRunning += monthlyPayment * 12;

    data.push({
      year: `Year ${i}`,
      Investment: Math.floor(investRunning),
      Car: Math.floor(carRunning),
    });
  }

  return (
    <div className="simulation">
      <Navbar />

      <div className="header">Simulation: Car vs Investment</div>

      <div className="sim-layout">

       
        <div className="big-card">
          <div className="card-header">Input</div>

          <div className="input-row">
            <span>Salary</span>
            <input
              className={errors.salary ? "input-error" : ""}
              value={salary === 0 ? "" : salary}
              onChange={(e) => setSalary(Number(e.target.value) || 0)}
            />
          </div>

          <div className="input-row">
            <span>Car price</span>
            <input
              className={errors.carPrice ? "input-error" : ""}
              value={carPrice === 0 ? "" : carPrice}
              onChange={(e) => setCarPrice(Number(e.target.value) || 0)}
            />
          </div>

          <div className="input-row">
            <span>Monthly payment</span>
            <input
              className={errors.monthlyPayment ? "input-error" : ""}
              value={monthlyPayment === 0 ? "" : monthlyPayment}
              onChange={(e) =>
                setMonthlyPayment(Number(e.target.value) || 0)
              }
            />
          </div>

          <div className="input-row">
            <span>Investment (pm)</span>
            <input
              className={errors.investment ? "input-error" : ""}
              value={investment === 0 ? "" : investment}
              onChange={(e) => setInvestment(Number(e.target.value) || 0)}
            />
          </div>

          <div className="input-row">
            <span>Time</span>
            <input
              className={errors.years ? "input-error" : ""}
              value={years === 0 ? "" : years}
              onChange={(e) => setYears(Number(e.target.value) || 0)}
            />
          </div>

          <button className="calculate-btn" onClick={handleCalculate}>
            Calculate
          </button>
        </div>

       
        <div className="big-card">
          <div className="card-header">Output</div>

          {!calculated ? (
            <p style={{ textAlign: "center" }}>
              Enter all values and press Calculate
            </p>
          ) : (
            <>
              <div className="graph-container">
                <LineChart width={320} height={220} data={data}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="Investment" stroke="#22c55e" strokeWidth={3} />
                  <Line type="monotone" dataKey="Car" stroke="#ef4444" strokeWidth={3} />
                </LineChart>
              </div>

              <div className="verdict">
                <strong>Verdict:</strong>

                <p>
                  Buying this car will cost you{" "}
                  <strong>R{formatMoney(Math.floor(carTotal))}</strong>.
                </p>

                <p>
                  Investing instead could grow to{" "}
                  <strong>
                    R{formatMoney(Math.floor(investmentValue))}
                  </strong>.
                </p>

                <hr />

                {opportunityCost > 0 ? (
                  <p style={{ color: "green" }}>
                    You lose out on{" "}
                    <strong>
                      R{formatMoney(Math.floor(opportunityCost))}
                    </strong>{" "}
                    in potential wealth.
                  </p>
                ) : (
                  <p style={{ color: "red" }}>
                    This car significantly impacts your financial growth.
                  </p>
                )}

                <hr />

                <p>
                  This car uses{" "}
                  <strong>{affordability.toFixed(0)}%</strong> of your income.
                </p>

                {affordability > 30 && (
                  <p style={{ color: "red" }}>
                    ⚠️ This is financially risky.
                  </p>
                )}

                {affordability <= 30 && affordability > 15 && (
                  <p style={{ color: "#eab308" }}>
                    ⚠️ This is manageable but high.
                  </p>
                )}

                {affordability <= 15 && (
                  <p style={{ color: "green" }}>
                    ✅ This is within a healthy range.
                  </p>
                )}

                <p style={{ fontStyle: "italic", marginTop: "10px" }}>
                  This decision could shape your financial future more than you think.
                </p>
              </div>
            </>
          )}
        </div>

      </div>

      <BackToTop />
    </div>
  );
}