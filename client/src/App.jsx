import * as React from "react";
import LoginPage from "./pages/LoginPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoanStepperPage from "./pages/LoanStepperPage.jsx";
import { loanDetailsData } from "./assets/loans.jsx";

export default function HorizontalLinearStepper() {
  const [loans, setLoans] = React.useState(loanDetailsData);
  const [currentLoan, setCurrentLoan] = React.useState(loans[1]);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage setCurrentLoan={setCurrentLoan}/>}/>
      <Route path="/loan"  element={<LoanStepperPage currentLoan={currentLoan} setCurrentLoan={setCurrentLoan}/>}/>
    </Routes>
    </BrowserRouter>
  );
}
