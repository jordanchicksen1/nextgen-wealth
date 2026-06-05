import { createContext, useContext, useState } from "react";

const FinancialContext = createContext();

export function FinancialProvider({ children }) {
  const [income, setIncome] = useState(0);

  const [expenses, setExpenses] = useState({
    Discretionary: 0,
    Groceries: 0,
    Utilities: 0,
    Transport: 0,
  });

  const [riskTolerance, setRiskTolerance] = useState("Moderate");

  const [goal, setGoal] = useState("Property");

  return (
    <FinancialContext.Provider
      value={{
        income,
        setIncome,

        expenses,
        setExpenses,

        riskTolerance,
        setRiskTolerance,

        goal,
        setGoal,
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  return useContext(FinancialContext);
}