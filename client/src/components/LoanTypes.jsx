import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import {
    loansIconStyle,
    loanIconContStyle,
    loanTypesBoxesStyle,
  } from "../assets/styles";function LoanTypes({loans,currentLoan,setCurrentLoan}) {
    function handleChangeCurrentLoan(title) {
        const targetLoan = loans.find((e) => e.title === title);
        setCurrentLoan(targetLoan);
      }
    return (
        <>
    {loans.map((loan) => (
      <Grid
        container
        sx={{
          ...loanTypesBoxesStyle,
          backgroundColor:
            currentLoan.title === loan.title ? "#E8E8E8" : "#fff",
          cursor: "pointer",
        }}
        item
        md={6}
        lg={2}
        key={loan.title}
        onClick={() => handleChangeCurrentLoan(loan.title)}
      >
        <Grid container justifyContent={'center'} item  md={12}>
          <Box sx={loanIconContStyle}>
            {loan.loadIcon(loansIconStyle)}
          </Box>
        </Grid>
        <Grid container justifyContent={'center'} item md={12}>
          <Typography variant="body1" fontWeight={"bold"}>
            {loan.title}
          </Typography>
        </Grid>
      </Grid>
    ))}
    </>
  )
}

export default LoanTypes