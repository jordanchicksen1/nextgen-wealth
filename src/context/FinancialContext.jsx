import {createContext, useContext, useState, useEffect} from "react";

const FinancialContext = createContext();

export function FinancialProvider({ children }) {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(localStorage.getItem("password") || "");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [age, setAge] = useState(localStorage.getItem("age") || "");
  const [income, setIncome] = useState(Number(localStorage.getItem("income")) || 0);
  const [expenses, setExpenses] = useState({
    Discretionary: 0,
    Groceries: 0,
    Utilities: 0,
    Transport: 0,
    Debt: 0,
  });

  const [riskTolerance, setRiskTolerance] = useState(localStorage.getItem("riskTolerance") || "Moderate");
  const [goal, setGoal] = useState(localStorage.getItem("goal") || "Property");

useEffect(() => {
  localStorage.setItem("name", name);
}, [name]);

useEffect(() => {
  localStorage.setItem("age", age);
}, [age]);

useEffect(() => {
  localStorage.setItem("income", income);
}, [income]);

useEffect(() => {
  localStorage.setItem(
    "riskTolerance",
    riskTolerance
  );
}, [riskTolerance]);

useEffect(() => {
  localStorage.setItem("goal", goal);
}, [goal]);

useEffect(() => {
  localStorage.setItem("email", email);
}, [email]);

useEffect(() => {
  localStorage.setItem("password", password);
}, [password]);

  return (
    <FinancialContext.Provider
      value={{
        email,
        setEmail,

        password,
        setPassword,

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