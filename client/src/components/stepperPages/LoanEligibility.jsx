import { Box, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import InfoIcon from "@mui/icons-material/Info";
import CustomChart from "../charts/CustomChart";
import { glassmorphismStyle } from "../../assets/styles";
import ElibiblityLayerTable from "../ElibiblityLayerTable";
import { CustomBarChat } from "../charts/CustomBarChat";

function LoanEligibility({ currentLoan, setCurrentLoan }) {
  const isMobile = useMediaQuery("(max-width:650px)");

  useEffect(() => {
    // const temp = [
    //   {
    //     totalInterestApplied: 30000,
    //     interestRate: 3.0 + "%",
    //     title: "First Layer",
    //     min: 5000,
    //     max: 40000,
    //     deductedAmount: 40000,
    //   },
    //   {
    //     totalInterestApplied: 30000,
    //     interestRate: 3.0 + "%",
    //     title: "First Layer",
    //     min: 5000,
    //     max: 40000,
    //     deductedAmount: 40000,
    //   },
    //   {
    //     totalInterestApplied: 30000,
    //     interestRate: 3.0 + "%",
    //     title: "First Layer",
    //     min: 5000,
    //     max: 40000,
    //     deductedAmount: 40000,
    //   },
    // ];
    // setCurrentLoan((prev) => ({ ...prev ,totalAppliedLayers}));
  }, []);
  return (
    <Grid
      container
      sx={{
        height: "calc(100% + 200px)",
        justifyContent: { xs: "center", md: "flex-start" },
      }}
      alignItems={"flex-start"}
      gap={4}
    >
      <Grid container item gap={4} md={7}>
        <Grid
          container
          item
          gap={1}
          sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
          alignItems={"center"}
        >
          <Typography variant="h4">My loan</Typography>
          <InfoIcon sx={{ width: "31px", height: "41px", color: "#C4B28F" }} />
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={12}
          sx={{
            textAlign: { xs: "center", md: "right" },
            justifyContent: { xs: "center", md: "flex-start" },
          }}
          direction={"column"}
        >
          <Typography variant="h6">EVERY MONTH I PAY</Typography>
          <Typography variant="h4" fontWeight={"600"}>
            {parseFloat(currentLoan.payPerMonth.toFixed(3))} JD
          </Typography>
        </Grid>
        <Grid
          container
          sx={{
            textAlign: { xs: "center", md: "start" },
            borderTop: "1px solid darkgray",
            borderBottom: "1px solid darkgray",
          }}
          alignItems={"center"}
          item
          xs={12}
          md={12}
          gap={2}
        >
          <Grid container item xs={12} md={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Loan Type</Typography>
            </Grid>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
              item
              xs={12}
            >
              {currentLoan.loadIcon({
                width: "25px",
                height: "25px",
                color: "black",
              })}
              <Typography variant="h5" fontWeight={"600"}>
                {currentLoan.title}
              </Typography>
            </Grid>
          </Grid>
          {/* <Divider
            sx={{ backgroundColor: "darkgray", width: "1px", height: "80%" }}
          /> */}
          <Grid container justifyContent={"center"} item xs={12} md={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Loan Amount</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight={"600"}>
                {currentLoan.loanAmount}
              </Typography>
            </Grid>
          </Grid>
          {/* <Divider
            sx={{ backgroundColor: "darkgray", width: "1px", height: "80%" }}
          /> */}
          <Grid container xs={12} justifyContent={"center"} gap={2} item md={4}>
            <Grid item md={12}>
              <Typography variant="h6">Loan term (in months)</Typography>
              <Typography variant="h5" fontWeight={"600"}>
                {currentLoan.numberOfMonths}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          gap={1}
          sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
          alignItems={"center"}
        >
          <Typography variant="h4">Loan Details</Typography>
          <InfoIcon sx={{ width: "31px", height: "41px", color: "#C4B28F" }} />
        </Grid>

        <Grid container item gap={4}>
          <ElibiblityLayerTable currentLoan={currentLoan} />
        </Grid>
      </Grid>
      <Grid p={4} container item justifyContent={"flex-start"} md={4} gap={4}>
        <Grid
          container
          sx={glassmorphismStyle}
          justifyContent={"center"}
          alignItems={"center"}
          gap={4}
          item
          md={12}
          p={4}
        >
          <Grid container item md={12}>
            {console.log(currentLoan.loanAmount, currentLoan.loanAmount)}
            <CustomChart
              interestPayable={currentLoan.interestPayable}
              loanAmount={currentLoan.loanAmount}
            />
          </Grid>
          <Grid container justifyContent={"center"} item gap={1} md={12}>
            <Grid item md={5}>
              <Typography variant="h6">EMI Amount</Typography>
              <Typography variant="body1">Principal + Interest </Typography>
              <Typography variant="h5">{currentLoan.EMI}</Typography>
            </Grid>
            <Grid item md={5}>
              <Typography variant="h6">Interest Payable</Typography>
              <Typography variant="h5">
                {currentLoan.interestPayable}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          sx={glassmorphismStyle}
          justifyContent={"center"}
          alignItems={"center"}
          minHeight={{ xs: "250px", md: "45%" }}
          height={{ xs: "300px" }}
          gap={4}
          item
          md={12}
          p={4}
        >
          <CustomBarChat
            totalAppliedLayers={currentLoan.totalAppliedLayers}
             //change this to calculate the highest layer max plus the total interst applied to the max layer
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoanEligibility;
