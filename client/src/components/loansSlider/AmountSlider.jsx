import React from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { loanInfoInputStyle } from "../../assets/styles";
function AmountSlider({
  register,
  currentLoan,
  handleSliderChange,
  errors,
  validateGreaterThanSalary
}) {
  const maxAmount=currentLoan.maxAmountAfterDeduction||currentLoan.maxAmount(currentLoan.intrestRates)
  return (  
    <FormControl fullWidth error={errors.loanAmount_Slider?.message &&
      errors.loanAmount_Input?.message ?true:false}>
      <Grid container item md={12}>
        <Grid container justifyContent={"space-between"} item md={12}>
          <Grid item md={6}>
            <Typography fontWeight={"600"} variant="h5">
              I want to borrow:
            </Typography>
          </Grid>
          <Grid item md={4}>
            <TextField
              sx={loanInfoInputStyle}
              id="loanAmountInput"
              {...register("loanAmount_Input", {
                required: currentLoan.loanAmount
                  ?false 
                  : "Kindly Choose loan amount",
                  min: {
                    value: currentLoan.minAmount,
                    message: 'Minimum Loan Amount is 5000', 
                  },
                  max: {
                    value: maxAmount,
                    message: `Maximum Loan Amount is ${maxAmount}`, 
                  },
              })}
              onChange={(e) => handleSliderChange(e)}
              type="number"
              inputProps={{
                min: currentLoan.minAmount,
                max: maxAmount,
            }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon sx={{ color: "#C4B28F" }} />
                  </InputAdornment>
                ),
                value: currentLoan.loanAmount,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item md={12}>
            <Slider
              min={currentLoan.min}
              max={maxAmount}
              valueLabelDisplay="auto"
              color="secondary"
              size="medium"
              name="loanAmount"
              step={1000}
              {...register("loanAmount_Slider", {
                required: currentLoan.loanAmount
                  ?false 
                  : "Kindly Choose loan amount",
                onChange: (e) => handleSliderChange(e),
              })}
              value={
                currentLoan.loanAmount ? currentLoan.loanAmount : maxAmount / 2
              }
            />
          </Grid>
          <Grid container item justifyContent={"space-between"}>
            <Grid item>
              <Typography
                variant="body1"
                fontWeight={"bold"}
                color={"darkgray"}
              >
                {currentLoan.minAmount} JD
              </Typography>
            </Grid>
                <Grid item md={5}>
                  <FormHelperText sx={{color:'red'}}> {errors.loanAmount_Input?.message}</FormHelperText>
                </Grid>
            <Grid item>
              <Typography
                variant="body1"
                fontWeight={"bold"}
                color={"darkgray"}
              >
                {maxAmount} JD
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </FormControl>
  );
}

export default AmountSlider;
