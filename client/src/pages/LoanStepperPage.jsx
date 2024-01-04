import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import StepperComponentsHOC from "../components/StepperComponentsHOC.jsx";
import { useForm } from "react-hook-form";
import calculateEMI from "../utils/utils.js";
import StepperNavigationButtons from "../components/StepperNavigationButtons.jsx";
import axios from "axios";
import { loanDetailsData } from "../assets/loans.jsx";
const steps = [
  "1. Load information",
  "2. Loan Eligibility ",
  "3. Personal Information",
  "4. Attatchments",
  "5. Loan Agreement",
];
function LoanStepperPage({ currentLoan, setCurrentLoan }) {
  const [activeStep, setActiveStep] = React.useState(2);
  const [loans, setLoans] = React.useState(loanDetailsData);
  const [uploadProgress, setUploadProgress] = useState({
    started: false,
    pc: 0,
    finished: false,
    status: {errs:[]},
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      ...currentLoan,
      currentSalary_Slider: currentLoan.currentSalary,
      currentSalary_Input: currentLoan.currentSalary,
    },
  });
  async function hanldeSubmitAttatchments() {
    const formData = new FormData();
    for (let i = 0; i < currentLoan.loan_attatchments.length; i++) {
      formData.append("loan_attatchments", currentLoan.loan_attatchments[i]);
    }
    formData.append("employeeName", currentLoan.formData.employeeName);
    formData.append("employeeNumber", currentLoan.formData.employeeNumber);
    formData.append("fileNumber", currentLoan.formData.fileNumber);
    try {
      setUploadProgress((prev) => ({ ...prev, started: true }));
      const postAttatchments = await axios.post(
        `${process.env.REACT_APP_API_URL}/attatchments`,
        formData,
        {
          onUploadProgress: (progressEvent) =>
            setUploadProgress((prev) => ({
              ...prev,
              pc: progressEvent.progress * 100,
            })),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (postAttatchments.status === 200) {
        setUploadProgress((prev) => ({ ...prev, started:false,finished: true,status:postAttatchments.data }));
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  function handleSetEMI() {
    let { loanAmount, numberOfMonths, intrestRates, activeLoans } = currentLoan;
    loanAmount = Number(loanAmount);
    const {
      totalAmount,
      totalInterests,
      totalInterestLayers,
      activeLoansDeductions,
    } = calculateEMI(
      loanAmount,
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
      <Grid
        container
        maxWidth={"100vw"}
        minHeight={"100vh"}
        bgcolor={"background.default"}
        item
      >
        <Grid container minHeight={"20vh"} item md={12} p={4} gap={2}>
          <Typography variant="h4">Apply Loan</Typography>
          <Grid item md={12}>
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
        <Grid
          container
          item
          p={4}
          md={12}
          minHeight={"75vh"}
          gap={4}
          bgcolor={"#fff"}
        >
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
              hanldeSubmitAttatchments={hanldeSubmitAttatchments}
              uploadProgress={uploadProgress}
              setUploadProgress={setUploadProgress}
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

export default LoanStepperPage;
