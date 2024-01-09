import { Grid, TextField, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import CustomDatePicker from "../CustomDatePicker";

function PersonalInformation({ register, errors, currentLoan }) {
  const isMobile = useMediaQuery("(max-width:650px)");

  return (
    <Grid
      container
      spacing={4}
      justifyContent={{ xs: "center", md: "flex-start" }}
      item
      xs={12}
    >
      <Grid item md={12}>
        <Typography variant="h5" fontWeight={"600"}>
          Personal Information
        </Typography>
      </Grid>
      <Grid container  spacing={4} item md={12}>
        <Grid
          container
          item
          xs={12}
          md={12}
          justifyContent={isMobile ? "center" : ""}
          spacing={4}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={"600"}>
              Employee Name
            </Typography>
            <TextField
              fullWidth
              disabled={currentLoan.isStaff}
              error={!!errors.employeeName}
              helperText={errors.employeeName?.message}
              {...register("employeeName", {
                required: "This field is required",
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={"600"}>
              File Number
            </Typography>
            <TextField
              fullWidth
              type="number"
              disabled={currentLoan.isStaff}
              error={!!errors.fileNumber}
              helperText={errors.fileNumber?.message}
              {...register("fileNumber", {
                required: "This field is required",
              })}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          md={12}
          justifyContent={isMobile ? "center" : ""}
          spacing={4}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={"600"}>
              Job Title
            </Typography>
            <TextField
              fullWidth
              disabled={currentLoan.isStaff}
              error={!!errors.jobTitle}
              helperText={errors.jobTitle?.message}
              {...register("jobTitle", {
                required: "This field is required",
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={"600"}>
              Joining Date
            </Typography>
            <CustomDatePicker
              value={currentLoan.joiningDate}
              disabled={currentLoan.isStaff}
            />
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          md={12}
          justifyContent={isMobile ? "center" : ""}
          spacing={4}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={"600"}>
              Employee Level
            </Typography>
            <TextField
              fullWidth
              disabled={currentLoan.isStaff}
              error={!!errors.employeeLevel}
              helperText={errors.employeeLevel?.message}
              {...register("employeeLevel", {
                required: "This field is required",
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={"600"}>
              Job Level
            </Typography>
            <TextField
              fullWidth
              disabled={currentLoan.isStaff}
              error={!!errors.jobLevel}
              helperText={errors.jobLevel?.message}
              {...register("jobLevel", {
                required: "This field is required",
              })}
            />
          </Grid>
        </Grid>
        <Grid
          container
          xs={12}
          item
          md={12}
          spacing={4}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={"600"}>
              Employee Number
            </Typography>
            <TextField
              fullWidth
              type="number"
              disabled={currentLoan.isStaff}
              error={!!errors.employeeNumber}
              helperText={errors.employeeNumber?.message}
              {...register("employeeNumber", {
                required: "This field is required",
              })}
            />
          </Grid>
          <Grid    item xs={12} md={6}>
            <Grid item xs={12}>
              <Typography variant="body1" fontWeight={"600"}>
                Work Place
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled={currentLoan.isStaff}
                error={!!errors.workPlace}
                helperText={errors.workPlace?.message}
                {...register("workPlace", {
                  required: "This field is required",
                })}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PersonalInformation;
