import {
  InputAdornment,
  InputLabel,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid/Grid";
import React, { useEffect } from "react";
import { loanInfoInputStyle } from "../assets/styles";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Slide from "@mui/material/Slide";
function ActiveLoanForm({
  register,
  currentLoan,
  setCurrentLoan,
  index,
  activeLoan,
}) {
  function handleAddNewLoan() {
    const newActiveLoans = currentLoan.activeLoans;
    newActiveLoans.push({
      activeLoanAmount: 0,
      activeLoanLayer: 0,
      activeLoanType: 0,
    });
    setCurrentLoan((prev) => ({ ...prev, activeLoans: newActiveLoans }));
  }
  useEffect(() => {
    handleChangeMaxLoanAmount();
  }, [currentLoan.activeLoans[index]]);
  function handleChangeMaxLoanAmount(e) {
    if (activeLoan.activeLoanType === currentLoan.title) {
      let deductionValue = e?.target.value || activeLoan.activeLoanAmount;
      const maxAmountAfterDeduction =
        currentLoan.maxAmount(currentLoan.intrestRates) - deductionValue;
      setCurrentLoan((prev) => ({ ...prev, maxAmountAfterDeduction }));
    } else {
      setCurrentLoan((prev) => ({
        ...prev,
        maxAmountAfterDeduction: currentLoan.maxAmount(
          currentLoan.intrestRates
        ),
      }));
    }
  }
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [currentLoan.activeLoans]);
  function handleLoanInputChange(e) {
    let { name, value } = e.target;
    name = name.slice(0, name.length - 1);
    const newActiveLoans = currentLoan.activeLoans;
    newActiveLoans[index] = { ...newActiveLoans[index], [name]: value };
    setCurrentLoan((prev) => ({ ...prev, activeLoans: newActiveLoans }));
  }
  function handleDeleteActiveLoan() {
    if (index > 0) {
      const newActiveLoans = currentLoan.activeLoans;
      newActiveLoans.splice(index, 1);
      setCurrentLoan((prev) => ({ ...prev, activeLoans: newActiveLoans }));
    }
  }
  return (
    <Slide in={true} direction="right" mountOnEnter unmountOnExit>
      <Grid container item md={12} spacing={2}>
        <Grid item xs={12} md={6} xl={3}>
          <FormControl fullWidth>
            <InputLabel>Loan Type</InputLabel>
            <Select
              labelId="activeLoanType"
              label="Loan Type"
              {...register(`activeLoanType${index}`)}
              onChange={(e) => handleLoanInputChange(e)}
              value={currentLoan.activeLoans[index].activeLoanType}
              disabled={currentLoan.isStaff}
            >
              <MenuItem value={"Home Loan"}>Home Loan</MenuItem>
              <MenuItem value={"Land Loan"}>Land Loan</MenuItem>
              <MenuItem value={"Car Loan"}>Car Loan</MenuItem>
              <MenuItem value={"Personal Loan"}>Personal</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <FormControl fullWidth>
            <InputLabel>Loan Layer</InputLabel>
            <Select
              labelId="activeLoanLayer"
              label="Loan Layer"
              {...register(`activeLoanLayer${index}`)}
              onChange={(e) => handleLoanInputChange(e)}
              value={currentLoan.activeLoans[index].activeLoanLayer}
              disabled={
                currentLoan.isStaff
                  ? true
                  : activeLoan.activeLoanType
                  ? false
                  : true
              }
            >
              <MenuItem value={"First Layer"}>First Layer</MenuItem>
              <MenuItem value={"Second Layer"}>Second Layer</MenuItem>
              <MenuItem value={"Third Layer"}>Third Layer</MenuItem>
              <MenuItem value={"Forth Layer"}>Forth Layer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} xl={2}>
          <TextField
            // sx={loanInfoInputStyle}
            fullWidth
            id="activeLoanPayPerMonthInput"
            label={"Pay Per Month"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EditIcon sx={{ color: "#C4B28F" }} />
                </InputAdornment>
              ),
            }}
            {...register(`activeLoanPayPerMonthInput${index}`)}
            onChange={(e) => {
              handleChangeMaxLoanAmount(e);
              handleLoanInputChange(e);
            }}
            type="number"
            // inputProps={{
            //   min: ,
            //   max: currentLoan.maxMonths,
            //   defaultValue: currentLoan.maxMonths / 2,
            // }}
            value={currentLoan.activeLoans[index].activeLoanPayPerMonthInput}
            variant="outlined"
            disabled={
              currentLoan.isStaff
                ? true
                : activeLoan.activeLoanLayer
                ? false
                : true
            }
          />
        </Grid>
        <Grid item xs={12} md={4} xl={2}>
          <TextField
            // sx={loanInfoInputStyle}
            fullWidth
            id="activeLoanLeftMonths"
            label={"Left Months"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EditIcon sx={{ color: "#C4B28F" }} />
                </InputAdornment>
              ),
            }}
            {...register(`activeLoanLeftMonths${index}`)}
            onChange={(e) => {
              handleChangeMaxLoanAmount(e);
              handleLoanInputChange(e);
            }}
            type="number"
            // inputProps={{
            //   min: ,
            //   max: currentLoan.maxMonths,
            //   defaultValue: currentLoan.maxMonths / 2,
            // }}
            value={currentLoan.activeLoans[index].activeLoanLeftMonths}
            variant="outlined"
            disabled={
              currentLoan.isStaff
                ? true
                : activeLoan.activeLoanLayer
                ? false
                : true
            }
          />
        </Grid>
        <Grid container item sx={{justifyContent:{xs:'center',md:'flex-end'}}} xs={12}  md={4} xl={2}>
          <Grid item  md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                width: 52,
                height: 54,
                backgroundColor: "#EAEAEA",
                cursor: "pointer",
              }}
              onClick={() =>
                // activeLoan.activeLoanLeftMonths &&
                // activeLoan.activeLoanLayer&&
                // activeLoan.activeLoanPayPerMonthInput &&
                // activeLoan.activeLoanType&&
                // !currentLoan.isStaff&&
                handleAddNewLoan()
              }
            >
              <AddIcon sx={{ fontSize: 42, color: "#C4B28F" }} />
            </Box>
          </Grid>
          {index !== 0 && (
            <Grid
              item
              sx={{ cursor: "pointer" }}
              onClick={() =>
                currentLoan.isStaff ? null : handleDeleteActiveLoan()
              }
              md={6}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "5px",
                  width: 52,
                  height: 54,
                  backgroundColor: "#EAEAEA",
                  cursor: "pointer",
                }}
              >
                <DeleteIcon sx={{ fontSize: 42, color: "#C4B28F" }} />
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Slide>
  );
}

export default ActiveLoanForm;
