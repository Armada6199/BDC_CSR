import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "../../assets/styles.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoanAttatchmentsPreview from "../LoanAttatchmentsPreview";
function Documents({
  register,
  errors,
  setCurrentLoan,
  setValue,
  currentLoan,
  hanldeSubmitAttatchments,
  uploadProgress,
  setUploadProgress,
}) {
  async function handleAddAttatchments(e) {
    const file = e.target.files[0];
    // setUploadProgress((prev) => ({ ...prev,pc:0, finished: false }));
    try {
      // setAttatchments(prev=>[...prev,file]);
      const newAttatchments = currentLoan.loan_attatchments;
      newAttatchments.push(file);
      setCurrentLoan((prev) => ({
        ...prev,
        loan_attatchments: newAttatchments,
      }));
      setValue("loan_attatchments", [...currentLoan.loan_attatchments, file]);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDeleteAttatchment(name) {
    try {
      const newAttatchments = currentLoan.loan_attatchments.filter(
        (e) => e.name !== name
      );
      console.log(newAttatchments,name)
      setCurrentLoan((prev) => ({
        ...prev,
        loan_attatchments: newAttatchments,
      }));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Grid container alignItems={"flex-start"} spacing={12}>
      <Grid container item md={6} spacing={12}>
        <Grid item md={12}>
          <Typography variant="h5" fontWeight="700" color={"gray"}>
            Attatchments
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="body2" fontWeight={"500"} color={"darkgray"}>
            Please Sign the template related to each file,or download it via the
            download template button, then save it .{" "}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Paper
            variant="outlined"
            style={{
              border: true ? "2px dashed #C4B28F" : "2px dashed #C4B28F",
              padding: 20,
              textAlign: "center",
              cursor: "pointer",
              background: true ? "#fff" : "#fafafa",
              borderRadius: "20px",
            }}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              {...register("loan_attatchments")}
              multiple
              onChange={handleAddAttatchments}
            />
            <label htmlFor="raised-button-file">
              <Box display="flex" flexDirection="column" alignItems="center">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <CloudUploadIcon style={{ fontSize: 60, color: "#BE9952" }} />
                </IconButton>
                <Typography>Upload Bulk of Beneficiaries</Typography>
                <Typography>Use a csv file</Typography>
              </Box>
            </label>
          </Paper>
        </Grid>
      </Grid>
      <Grid container alignItems={"center"} item md={6}>
        <LoanAttatchmentsPreview
          handleDeleteAttatchment={handleDeleteAttatchment}
          uploadProgress={uploadProgress}
          hanldeSubmitAttatchments={hanldeSubmitAttatchments}
          attatchments={currentLoan.loan_attatchments}
          setUploadProgress={setUploadProgress}
        />
      </Grid>
    </Grid>
  );
}

export default Documents;
