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
import axios from "axios";
const steps = [
  "1. Load information",
  "2. Loan Eligibility ",
  "3. Personal Information",
  "4. Attatchments",
  "5. Loan Agreement",
];
export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(3);
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
      iScoreApproval:false,
    },
  });
  async function hanldeSubmitAttatchments() {
    const formData=new FormData();
    for (let i = 0; i < currentLoan.loan_attatchments.length; i++) {
      console.log(currentLoan.loan_attatchments[i])
      formData.append('loan_attatchments', currentLoan.loan_attatchments[i]); 
    }
    formData.append('employeeName',currentLoan.formData.employeeName);
    formData.append('employeeNumber',currentLoan.formData.employeeNumber);
    formData.append('fileNumber',currentLoan.formData.fileNumber);
    try {
      const postAttatchments = await axios.post(
        `${process.env.REACT_APP_API_URL}/attatchments`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(postAttatchments);
    } catch (error) {
      throw new Error(error);
    }
  }
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
  const handleNext = async (formData) => {
    if (activeStep == 0) {
      handleSetEMI();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 3) {
      try {
        await hanldeSubmitAttatchments();
      } catch (error) {
        console.log(error);
      }
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
        <Grid container minHeight={"20vh"} item md={12} p={4} gap={2}>
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
        <Grid container item p={4} minHeight={"75vh"} gap={4} bgcolor={"#fff"}>
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
