import React from "react";
import LoanInformation from "./stepperPages/LoanInformation";
import LoanEligibility from "./stepperPages/LoanEligibility";
import PersonalInformation from "./stepperPages/PersonalInformation";
import Documents from "./stepperPages/Documents";

function StepperComponentsHOC({
  activeStep,
  currentLoan,
  setCurrentLoan,
  loans,
  register,
  errors,
  setValue,
  handleSetEMI
}) {
  switch (activeStep) {
    case 0:
      return (
        <LoanInformation
          currentLoan={currentLoan}
          loans={loans}
          setCurrentLoan={setCurrentLoan}
          register={register}
          errors={errors}
          setValue={setValue}
          handleSetEMI={handleSetEMI}
        />
      );
    case 1:
      return (
        <LoanEligibility
          currentLoan={currentLoan}
          setCurrentLoan={setCurrentLoan}
          register={register}
        />
      );
    case 2:
      return (
        <PersonalInformation
          currentLoan={currentLoan}
          setCurrentLoan={setCurrentLoan}
          register={register}
          errors={errors}
        />
      );
    case 3:
      return (
        <Documents
          currentLoan={currentLoan}
          setCurrentLoan={setCurrentLoan}
          register={register}
          errors={errors}
        />
      );
  }
}

export default StepperComponentsHOC;
