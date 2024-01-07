import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  FormHelperText,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import ActiveLoanForm from "../ActiveLoanForm";
import LoanDetails from "../LoanDetails";
import LoanTypes from "../LoanTypes";
import CurrentSalarySlider from "../loansSlider/CurrentSalarySlider";
import MonthsSlider from "../loansSlider/MonthsSlider";
import AmountSlider from "../loansSlider/AmountSlider";
import calculateEMI from "../../utils/utils";
import "../../assets/styles.css";
import { TransitionGroup } from "react-transition-group";

function LoanInformation({
  currentLoan,
  setCurrentLoan,
  loans,
  register,
  errors,
  setValue,
}) {
  const handleSliderChange = (e) => {
    let { name, value } = e.target;
    setValue(name, value);
    name = name.split("_")[0];
    setCurrentLoan((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    setCurrentLoan((prev) => ({ ...prev }));
  }, []);
  const validateGreaterThanSalary = (value, type) => {
    let {
      loanAmount,
      numberOfMonths,
      intrestRates,
      activeLoans,
      currentSalary,
      maxMonths,
    } = currentLoan;
    if (numberOfMonths && loanAmount && currentSalary) {
      loanAmount = Number(loanAmount);
      let { payPerMonth, EMI } = calculateEMI(
        loanAmount,
        intrestRates,
        numberOfMonths,
        currentLoan.title,
        activeLoans
      );
      const halfSalary = currentSalary / 2;
      const isEligible = payPerMonth <= halfSalary;

      if (isEligible) {
        return true;
      } else {
        for (let i = numberOfMonths; i < maxMonths; i++) {
          let { payPerMonth } = calculateEMI(
            loanAmount,
            intrestRates,
            i,
            currentLoan.title,
            activeLoans
          );
          if (payPerMonth <= halfSalary) {
            // console.log(
            //   `found pay per month is ${i} and pay per month ${
            //     EMI / i
            //   } for loan amount of${EMI} and half of your salary is ${
            //     halfSalary
            //   }`
            // );
            return `Minimum Term For your request is ${i}`;
          }
        }
      }
      return "You Arent Eligiable for this Amount";
    }
  };
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Grid container alignItems={"flex-start"} spacing={10}>
      <Grid container alignItems={"center"} item sm={12} md={6} gap={4}>
        <Grid container item md={12} gap={4}>
          <Grid item md={12}>
            <Typography
              textAlign={isMobile ? "center" : "start"}
              variant="h5"
              fontWeight={"600"}
            >
              I want to apply
            </Typography>
          </Grid>
          <Grid container item justifyContent={"space-between"} md={10} lg={12}>
            <LoanTypes
              currentLoan={currentLoan}
              setCurrentLoan={setCurrentLoan}
              loans={loans}
            />
          </Grid>
        </Grid>
        <Grid container item sm={12} md={10} lg={12} spacing={4} gap={4}>
          <Grid container item sm={12}>
            <AmountSlider
              currentLoan={currentLoan}
              handleSliderChange={handleSliderChange}
              validateGreaterThanSalary={validateGreaterThanSalary}
              register={register}
              errors={errors}
            />
          </Grid>
          <Grid container item>
            <MonthsSlider
              currentLoan={currentLoan}
              handleSliderChange={handleSliderChange}
              validateGreaterThanSalary={validateGreaterThanSalary}
              register={register}
              errors={errors}
            />
          </Grid>
          <Grid container item>
            <CurrentSalarySlider
              currentLoan={currentLoan}
              handleSliderChange={handleSliderChange}
              validateGreaterThanSalary={validateGreaterThanSalary}
              register={register}
              errors={errors}
            />
          </Grid>
        </Grid>
        <Grid container item md={10} lg={12}>
          <FormControl
            fullWidth
            disabled={currentLoan.isStaff}
            error={errors.isCurrentLoan?.message ? true : false}
          >
            <FormLabel id="demo-radio-buttons-group-label">
              Do You have an active current Loan from BDC{" "}
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={"no"}
              value={currentLoan.hasPrevLoan ? "yes" : "no"}
              name="currentLoan"
              row
              onChange={(e) => {
                e.target.value == "yes"
                  ? setCurrentLoan({
                      ...currentLoan,
                      hasPrevLoan: true,
                    })
                  : setCurrentLoan((prev) => ({
                      ...prev,
                      activeLoans: [
                        {
                          activeLoanLeftMonths: 0,
                          activeLoanLayer: 0,
                          activeLoanPayPerMonthInput: 0,
                          activeLoanType: 0,
                        },
                      ],
                      hasPrevLoan: false,
                    }));
              }}
            >
              <Grid item md={2}>
                <FormControlLabel
                  value={"yes"}
                  control={
                    <Radio
                      {...register("isCurrentLoan", {
                        required: currentLoan.isStaff
                          ? false
                          : "current Loan amount",
                      })}
                      sx={{
                        color: "#215190",
                        "&.Mui-checked": {
                          color: "#C4B28F",
                          transition: "all 0.3s ease",
                        },
                      }}
                    />
                  }
                  label="Yes"
                />
              </Grid>
              <Grid item md={2}>
                <FormControlLabel
                  value={"no"}
                  control={
                    <Radio
                      size="small"
                      {...register("isCurrentLoan", {
                        required: currentLoan.isStaff
                          ? false
                          : "current Loan amount",
                      })}
                      sx={{
                        color: "#215190",
                        "&.Mui-checked": {
                          color: "#C4B28F",
                        },
                      }}
                    />
                  }
                  label="No"
                />
              </Grid>
            </RadioGroup>
            <FormHelperText>{errors.isCurrentLoan?.message}</FormHelperText>
          </FormControl>
        </Grid>
        {currentLoan.hasPrevLoan && (
          <Grid container item minHeight={"140px"} gap={6} md={12}>
            {currentLoan.activeLoans.map((activeLoan, index) => (
              <ActiveLoanForm
                key={index}
                index={index}
                activeLoan={activeLoan}
                register={register}
                currentLoan={currentLoan}
                setCurrentLoan={setCurrentLoan}
              />
            ))}
          </Grid>
        )}
      </Grid>
      <Grid container alignItems={"center"} item md={6}>
        <LoanDetails currentLoan={currentLoan} />
      </Grid>
    </Grid>
  );
}

export default LoanInformation;
