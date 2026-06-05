import { createContext, useContext, useState } from "react";

const FinancialContext = createContext();

export function FinancialProvider({ children }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

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
        name,
        setName,

        age,
        setAge,

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