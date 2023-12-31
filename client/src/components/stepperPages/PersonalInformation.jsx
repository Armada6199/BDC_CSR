import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

function PersonalInformation({  register, errors }) {

  return (
    <Grid maxHeight={'50vh'} container spacing={4}  item   md={12}>
      <Grid  item md={12}>
      <Typography  variant="h5" fontWeight={'600'}>Personal Information</Typography>
      </Grid>
      <Grid container spacing={4} item md={12}>
      <Grid container item md={12} spacing={4}>
          <Grid item md={6}>
          <Typography variant="body1" fontWeight={"600"}>
            Employee Name
          </Typography>
          <TextField
          fullWidth
            error={!!errors.employeeName}
            helperText={errors.employeeName?.message}
            {...register("employeeName", {
              required: "This field is required",
            })}
          />
        </Grid>
        <Grid item md={6}>
          <Typography variant="body1" fontWeight={"600"}>
            File Number
          </Typography>
          <TextField
          fullWidth
            error={!!errors.fileNumber}
            helperText={errors.fileNumber?.message}
            {...register("fileNumber", {
              required: "This field is required",
            })}
          />
        </Grid>
          </Grid>
            <Grid container item md={12} spacing={4}>
            <Grid item md={6}>
          <Typography variant="body1" fontWeight={"600"}>
            Job Title
          </Typography>
          <TextField
          fullWidth
          error={!!errors.jobTitle}
            helperText={errors.jobTitle?.message}
            {...register("jobTitle", {
              required: "This field is required",
            })}
          />
        </Grid>
        <Grid item md={6}>
          <Typography variant="body1" fontWeight={"600"}>
            Joining Date
          </Typography>
          <TextField
            fullWidth
            error={!!errors.joiningDate}
            joiningDate={errors.joiningDate?.message}
            {...register("joiningDate", {
              required: "This field is required",
            })}
          />
        </Grid>
            </Grid>
        
      <Grid container item md={12} spacing={4}>
      <Grid item md={6}>
          <Typography variant="body1" fontWeight={"600"}>
            Employee Level
          </Typography>
          <TextField
          fullWidth
          error={!!errors.employeeLevel}
            helperText={errors.employeeLevel?.message}
            {...register("employeeLevel", {
              required: "This field is required",
            })}
          />
        </Grid>
        <Grid item md={6}>
          <Typography variant="body1" fontWeight={"600"}>
            Job Level
          </Typography>
          <TextField
          fullWidth
          error={!!errors.jobLevel}
            helperText={errors.jobLevel?.message}
            {...register("jobLevel", {
              required: "This field is required",
            })}
          />
        </Grid>
      </Grid>
       <Grid container item md={12} spacing={4}>
       <Grid item md={6}>
          <Typography variant="body1" fontWeight={"600"}>
            Employee Number
          </Typography>
          <TextField
          fullWidth
          error={!!errors.employeeNumber}
            helperText={errors.employeeNumber?.message}
            {...register("employeeNumber", {
              required: "This field is required",
            })}
          />
        </Grid>
        <Grid item md={6}>
          <Typography variant="body1" fontWeight={"600"}>
            Work Place
          </Typography>
          <TextField
          fullWidth
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
  );
}

export default PersonalInformation;
