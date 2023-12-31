import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import StepperComponentsHOC from "./components/StepperComponentsHOC.jsx";
import { loanDetailsData } from "./assets/loans.jsx";
import { useForm } from "react-hook-form";
import calculateEMI from "./utils/utils.js";
import StepperNavigationButtons from "./components/StepperNavigationButtons.jsx";
const steps = [
  "1. Load information",
  "2. Loan Eligibility ",
  "3. Personal Information",
  "4. Attatchments",
  "5. Loan Agreement"
];
export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(4);
  const [loans, setLoans] = React.useState(loanDetailsData);
  const [currentLoan, setCurrentLoan] = React.useState(loans[1]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      loanAmount: currentLoan.loanAmount,
      numberOfMonths: currentLoan.numberOfMonths,
      currentSalary: currentLoan.currentSalary,
      activeLoanAmount: currentLoan.activeLoanAmount,
      loanAmount_Input: currentLoan.loanAmount,
      loanAmount_Slider: currentLoan.loanAmount,
      currentSalary_Slider: currentLoan.currentSalary,
      currentSalary_Input: currentLoan.currentSalary,
      numberOfMonths_Input: currentLoan.numberOfMonths,
      numberOfMonths_Slider: currentLoan.numberOfMonths,
    },
  });
  function handleSetEMI() {
    let {
      loanAmount,
      activeLoanAmount = 0,
      numberOfMonths,
      intrestRates,
      activeLoans,
    } = currentLoan;
    loanAmount = Number(loanAmount);
    activeLoanAmount = Number(activeLoanAmount);
    const {
      totalAmount,
      totalInterests,
      totalInterestLayers,
      activeLoansDeductions,
    } = calculateEMI(
      loanAmount + activeLoanAmount,
      intrestRates,
      numberOfMonths,
      currentLoan.title,
      activeLoans
    );
    setCurrentLoan((prev) => ({
      ...prev,
      loanAmount: loanAmount,
      numberOfMonths: numberOfMonths,
      EMI: totalAmount,
      interestPayable: totalInterests,
      payPerMonth: totalAmount / Number(numberOfMonths),
      totalAppliedLayers: totalInterestLayers,
      activeLoansDeductions: activeLoansDeductions,
    }));
  }
  const handleNext = (formData) => {
    if (activeStep == 0) {
      handleSetEMI();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (activeStep !== steps.length - 1 && activeStep !== 0) {
      setCurrentLoan((prev) => ({ ...prev, formData }));
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      ///submit data  here
      console.log(currentLoan);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else return;
  };

  const handleReset = () => {
    setCurrentLoan(loans[0]);
    setActiveStep(0);
  };
  return (
    <form noValidate onSubmit={handleSubmit(handleNext)}>
      <Grid container minHeight={"100vh"} bgcolor={"background.default"}>
        <Grid container minHeight={"20vh"}  item md={12} p={4} gap={2}>
          <Typography variant="h4">Apply Loan</Typography>
          <Grid item md={12} sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                return (
                  <Box
                    width={"100%"}
                    mr={"2px"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={2}
                    key={label}
                  >
                    <Typography
                      variant="body1"
                      color={
                        activeStep == index
                          ? "#C4B28F"
                          : activeStep > index
                          ? "#215190"
                          : "darkgray"
                      }
                    >
                      {label}
                    </Typography>
                    <Box
                      width={"100%"}
                      height={"5px"}
                      backgroundColor={
                        activeStep == index
                          ? "#C4B28F"
                          : activeStep > index
                          ? "#215190"
                          : "darkgray"
                      }
                    ></Box>
                  </Box>
                );
              })}
            </Stepper>
          </Grid>
        </Grid>
        <Grid container item p={4} minHeight={"75vh"}  gap={4} bgcolor={"#fff"}>
          <Grid container item md={12}>
            <StepperComponentsHOC
              currentLoan={currentLoan}
              loans={loans}
              setCurrentLoan={setCurrentLoan}
              activeStep={activeStep}
              register={register}
              errors={errors}
              setValue={setValue}
              handleSetEMI={handleSetEMI}
            />
          </Grid>
        </Grid>
   
        <Box
          sx={{ backgroundColor: "#fff", transition: "all ease-in-out 1s" }}
          width={"100%"}
          p={4}
          height={"65px"}
          position={"sticky"}
          bottom={"0px"}
        >
          
          <StepperNavigationButtons
            handleBack={handleBack}
            activeStep={activeStep}
            handleRest={handleReset}
          />
        </Box>
      </Grid>
    </form>
  );
}
