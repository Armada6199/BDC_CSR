import React from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  Slider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { loanInfoInputStyle } from "../../assets/styles";
import { useDebounce } from "../../hooks/debounce";

function MonthsSlider({
  register,
  errors,
  currentLoan,
  handleSliderChange,
  validateGreaterThanSalary
}) {
  const isMobile=useMediaQuery('(max-width:600px)');
  const debouncedMonths=useDebounce(currentLoan.numberOfMonths_Input||currentLoan.numberOfMonths_Slider);
  return (
    <FormControl
      fullWidth
      error={
        errors.numberOfMonths_Input?.message &&
        errors.numberOfMonths_Slider?.message
          ? true
          : false
      }
    >
      <Grid container item md={12}>
        <Grid container flexDirection={isMobile?'column':"row"} gap={2} justifyContent={"space-between"} item md={12}>
          <Grid item md={6}>
            <Typography fontWeight={"600"} variant="h5">
              For so long:
            </Typography>
          </Grid>
          <Grid item md={4}>
            <TextField
              sx={loanInfoInputStyle}
              id="numberOfMonthsInput"
              {...register("numberOfMonths_Input", {
                required: currentLoan.numberOfMonthst
                  ? false
                  : "Kindly Choose Number of Months",
                min: {
                  value: currentLoan.minMonths,
                  message: "Minimum Month Term is 12",
                },
                max: {
                  value: currentLoan.maxMonths,
                  message: `Maximum Month Term is ${currentLoan.maxMonths}`,
                },
                validate:(value)=>validateGreaterThanSalary(value,'months')
              })}
              onChange={(e) => handleSliderChange(e)}
              type="number"
              inputProps={{
                min: currentLoan.minAmount,
                max: currentLoan.maxMonths,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon sx={{ color: "#C4B28F" }} />
                  </InputAdornment>
                ),
                sx:{fontWeight:700}
              }}
              value={currentLoan.numberOfMonths}
              variant="outlined"
            />
          </Grid>
          <Grid item md={12}>
            <Slider
                min={currentLoan.minMonths}
                max={currentLoan.maxMonths}
                valueLabelDisplay="auto"
                color="secondary"
                size="medium"
                name="numberOfMonths"
                step={6}
                {...register("numberOfMonths_Slider", {
                  required: currentLoan.loanAmount
                    ?false 
                    : "Kindly Choose Number of Months",
                  onChange: (e) => handleSliderChange(e),
                  validate:(value)=>validateGreaterThanSalary(value,'months')
                })}
                value={
                  currentLoan.numberOfMonths ? currentLoan.numberOfMonths : currentLoan.maxMonths / 2
                }
            />
          </Grid>
          <Grid container item justifyContent={"space-between"}>
      <Grid item>
        <Typography variant="body1" fontWeight={"bold"} color={"darkgray"}>
          {currentLoan.minMonths}
        </Typography>
      </Grid>

      <Grid item md={5}>
        <FormHelperText sx={{color:'red'}}>
          {" "}
          {errors.numberOfMonths_Input?.message}
        </FormHelperText>
      </Grid>
      <Grid item>
        <Typography variant="body1" fontWeight={"bold"} color={"darkgray"}>
          {currentLoan.maxMonths}
        </Typography>
      </Grid>
    </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default MonthsSlider;
