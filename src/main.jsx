import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { FinancialProvider } from "./context/FinancialContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <FinancialProvider>
        <App />
      </FinancialProvider>
    </StrictMode>
  </BrowserRouter>
);