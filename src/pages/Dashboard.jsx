import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./dashboard.css";
import BackToTop from "../components/BackToTop";
import { useFinancial } from "../context/FinancialContext";

import { PieChart, Pie, Cell, Tooltip } from "recharts";


import gsap from "gsap";

export default function Dashboard() {
  const [editingIncome, setEditingIncome] = useState(false);
  const { income, setIncome } = useFinancial();
  const [showExpenses, setShowExpenses] = useState(false);
  const [showSavings, setShowSavings] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [expensesConfirmed, setExpensesConfirmed] = useState(false);
  const { expenses, setExpenses } = useFinancial();
  const [tempExpenses, setTempExpenses] = useState(expenses);
  const formatMoney = (num) => num.toLocaleString("en-ZA");



  const expenseInfo = {
    Discretionary: {
      description: "Non-essential lifestyle spending",
      examples: "Eating out, shopping, subscriptions, entertainment",
    },
    Groceries: {
      description: "Everyday food and household items",
      examples: "Supermarket shopping, toiletries, cleaning supplies",
    },
    Utilities: {
      description: "Fixed monthly living costs",
      examples: "Electricity, water, internet, phone bills",
    },
    Transport: {
      description: "Costs related to getting around",
      examples: "Fuel, Uber, public transport, car payments",
    },
    Debt: {
    description: "Monthly debt repayments",
    examples: "Credit cards, personal loans, store accounts",
},
  };

  const COLORS = ["#3b5bdb", "#22c55e", "#f59e0b", "#ef4444"];

  useEffect(() => {
  setTempExpenses(expenses);
}, [expenses]);

  useEffect(() => {
    gsap.fromTo(
      ".summary-card, .big-card, .bottom-card, .dropdown",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, []);

  const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
  const savings = income - totalExpenses;
  const savingsRate = income ? ((savings / income) * 100).toFixed(0) : 0;
  const disposableIncome = savings;
  const debtToIncome = income > 0 ? (((expenses.Debt || 0) / income) * 100).toFixed(0) : 0;
  const updateExpense = (key, value) => {setTempExpenses({...tempExpenses,[key]: Number(value),
 });
};


  const data = Object.entries(expenses).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  const values = Object.values(expenses);
  const allEqual = values.every((val) => val === values[0]);

  let highestExpense = ["None", 0];

  if (!allEqual) {
    highestExpense = Object.entries(expenses).reduce(
      (max, current) => (current[1] > max[1] ? current : max),
      ["None", 0]
    );
  }

  const getInsight = (category) => {
    switch (category) {
      case "Discretionary":
        return "You prioritise lifestyle and personal spending.";
      case "Groceries":
        return "You focus on consistent day-to-day living and essentials.";
      case "Utilities":
        return "A large portion of your income goes to fixed living costs.";
      case "Transport":
        return "Mobility and commuting are major priorities for you.";
      default:
        return "Your spending is balanced across categories.";
    }
  };

let nudgeTitle = "";
let nudgeText = "";

if (savingsRate < 10) {

  nudgeTitle = "💡 Savings Warning";

  nudgeText =
    "Your savings rate is below 10%. Consider reducing discretionary spending and increasing your savings contributions.";

}

else if (savingsRate >= 20) {

  nudgeTitle = "🎉 Great Job";

  nudgeText =
    "You're saving more than 20% of your income. This is considered a strong savings habit.";

}

else if (highestExpense[0] === "Transport") {

  nudgeTitle = "🚗 Transport Alert";

  nudgeText =
    "Transport is currently your largest expense category. Consider reviewing commuting costs if you want to improve savings.";

}

else {

  nudgeTitle = "💡 Financial Nudge";

  nudgeText =
    "Your finances appear balanced. Continue tracking your spending and look for opportunities to increase your savings rate.";

}

  return (
    <div className="dashboard">
      <Navbar />

      <div className="header">MoneyShot</div>

      <div className="summary-row">
        
        <div className="summary-card" onClick={() => setEditingIncome(true)}>
          <strong>Net Income:</strong>
          {editingIncome ? (
            <input
  className="expense-input"
  type="number"
  placeholder="0"
  value={income === 0 ? "" : income}
  onChange={(e) => setIncome(Number(e.target.value))}
  onBlur={() => setEditingIncome(false)}
  autoFocus
/>
          ) : (
            ` R${formatMoney(income)}`
          )}
        </div>

        <div
          className="summary-card"
          onClick={() => {
            setShowExpenses(!showExpenses);
            setShowSavings(false);
          }}
        >
          <strong>Expenses:</strong> R{formatMoney(totalExpenses)}
        </div>

        <div
          className="summary-card"
          onClick={() => {
            setShowSavings(!showSavings);
            setShowExpenses(false);
          }}
        >
          <strong>Savings:</strong> {savingsRate}%
        </div>

        <div className="summary-card">
  
  <strong>Disposable Income:</strong>
  <br />
  R{formatMoney(disposableIncome)}
</div>

<div className="summary-card">
  <strong>Debt-to-Income:</strong>
  <br />
  {debtToIncome}%
</div>

      </div>
{showNudge && expensesConfirmed && (
  <div className="nudge-card">

    <button
      className="nudge-close"
      onClick={() => setShowNudge(false)}
    >
      ✕
    </button>
<h3>{nudgeTitle}</h3>

<p>{nudgeText}</p>
    
  </div>
)}
      
      {showExpenses && (
        <div className="dropdown">
          {Object.keys(expenses).map((key) => (
            <div key={key} className="expense-row">
              
              <div className="expense-info">
                <label>{key}</label>
                <p className="expense-description">
                  {expenseInfo[key].description}
                </p>
                <p className="expense-examples">
                  e.g. {expenseInfo[key].examples}
                </p>

               
              </div>

              <input
  className="expense-input"
  type="number"
  placeholder="0"
  value={tempExpenses[key] === 0 ? "" : tempExpenses[key]}
  onChange={(e) => updateExpense(key, e.target.value)}
/>
            </div>
          ))}

           <button
  className="confirm-expenses-btn"
  onClick={() => {

  setShowNudge(false);

  setTimeout(() => {

    setExpenses(tempExpenses);

    setExpensesConfirmed(true);

    setShowNudge(true);

    setShowExpenses(false);

  }, 0);


}}
>
  📊 Update Dashboard
</button>
        </div>
      )}

      
      {showSavings && (
        <div className="dropdown">
          <h3>Savings Breakdown</h3>

          <div className="breakdown-row">
            <span>Net Income</span>
            <span>R{formatMoney(income)}</span>
          </div>

          <div className="breakdown-row">
            <span>Total Expenses</span>
            <span>- R{formatMoney(totalExpenses)}</span>
          </div>

          <hr />

          <div className="breakdown-row">
            <strong>Final Savings</strong>
            <strong style={{ color: savings >= 0 ? "green" : "red" }}>
              R{formatMoney(savings)}
            </strong>
          </div>
        </div>
      )}

      <div className="main-row">

        <div className="big-card">
          <div className="card-header">Expenses Pie Chart</div>

          <div className="pie-section">
            
            <PieChart width={200} height={200}>
              <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>

            <div>
              {Object.entries(expenses).map(([key, value], index) => (
                <p key={key}>
                  <span style={{ color: COLORS[index % COLORS.length] }}>●</span>{" "}
                  {key}: R{formatMoney(value)}
                </p>
              ))}



            </div>

          </div>
        </div>

        <div className="big-card">
          <div
            className="card-header"
            style={{
              background:
                savingsRate < 10
                  ? "red"
                  : "linear-gradient(to right, #22c55e, #16a34a)",
            }}
          >
            Feedback
          </div>

          <div className="feedback">
            {savingsRate >= 20 && (
              <p style={{ color: "green" }}>
                Great job! You're saving at a healthy rate.
              </p>
            )}

            {savingsRate >= 10 && savingsRate < 20 && (
              <p style={{ color: "#eab308" }}>
                You're doing okay, but there’s room to improve your savings.
              </p>
            )}

            {savingsRate < 10 && (
              <p style={{ color: "red" }}>
                Warning: You are saving only {savingsRate}% of your income.
              </p>
            )}
          </div>
        </div>

      </div>

      <div className="bottom-card">
        <div className="card-header">Spending Insight</div>

        {allEqual ? (
          <>
            <h3>Balanced Spending</h3>
            <p>Your expenses are evenly distributed across categories.</p>
          </>
        ) : (
          <>
            <h3>{highestExpense[0]}</h3>
            <p>
              This is your highest expense at{" "}
              <strong>R{formatMoney(highestExpense[1])}</strong>.
            </p>
            <p>{getInsight(highestExpense[0])}</p>
          </>
        )}
      </div>

      <BackToTop />
    </div>
  );
}