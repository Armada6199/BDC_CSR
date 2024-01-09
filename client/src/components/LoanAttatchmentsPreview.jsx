import React, { useEffect } from "react";
import { glassmorphismStyle } from "../assets/styles";
import { Grid, Typography, Button, Collapse, List, ListItem } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ClearIcon from "@mui/icons-material/Clear";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import { TransitionGroup } from "react-transition-group";

function LoanAttatchmentsPreview({
  attatchments,
  hanldeSubmitAttatchments,
  uploadProgress,
  handleDeleteAttatchment,
  setUploadProgress,
}) {
  useEffect(() => {
    setUploadProgress((prev) => ({
      ...prev,
      finished: false,
      started: false,
      pc: 0,
      status: { errs: [] },
    }));
  }, [attatchments.length]);
  async function hanldeRemoveFromServer(name) {
    try {
      const removedFile = await axios.delete(
        `${process.env.REACT_APP_API_URL}/attatchments/${name}`
      );
      if (removedFile.status == 200) handleDeleteAttatchment(name);
      console.log(removedFile);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Grid container justifyContent={{xs:"center",md:"flex-start"}} item p={4} gap={4} sx={glassmorphismStyle}>
      <Grid item md={12}>
        <Typography variant="h6" textAlign={"center"}>
          {attatchments.length > 0
            ? "Selected Files"
            : "Attatchments will appear here once selected"}
        </Typography>
      </Grid>
      <List sx={{ mt: 1,width:'100%' }}>
        <TransitionGroup >
          {attatchments.map((file,index) => {
              let isSuccessful = null;
              if (uploadProgress.finished) {
                isSuccessful = uploadProgress?.status.errs.find(
                  (ele) => ele[file.name] === file.name
                );
              }
              
            return (
              <Collapse key={file.name+[index]} sx={{width:"100%"}} >
                {" "}
                <ListItem>
                <Grid
                  container
                  spacing={2}
                  key={file.name}
                  item
                  p={1}
                  borderRadius={"15px"}
                  justifyContent={{xs:"center",md:"start"}}
                  md={12}
                >
                  {uploadProgress.finished && isSuccessful && (
                    <Grid
                      container
                      justifyContent={"flex-end"}
                      gap={3}
                      item
                      md={12}
                    >
                      <Grid
                        container
                        alignItems={"center"}
                        justifyContent={"center"}
                        p={1}
                        item
                        md={4}
                        bgcolor={"#f6f6f6"}
                        borderRadius={"10px"}
                      >
                        <Typography
                          color={"rgb(255,51,51)"}
                          fontWeight={"600"}
                          textAlign={"center"}
                          variant="body1"
                        >
                          File {isSuccessful.msg}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                  <Grid item md={1}>
                    <InsertDriveFileIcon
                      sx={{ fontSize: 36, color: "secondary.dark" }}
                    />
                  </Grid>
                  <Grid item md={10}>
                    <Typography
                      textAlign={"center"}
                      variant="subtitle1"
                      fontWeight={"500"}
                    >
                      {file.name}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleDeleteAttatchment(file.name)}
                    justifyContent={{xs:'center',md:"flex-end"}}
                    item
                    md={1}
                  >
                    <ClearIcon sx={{ fontSize: 24 }} />
                  </Grid>
                </Grid>
                </ListItem>
              </Collapse>
            );
          })}
        </TransitionGroup>
      </List>
      {/* <TransitionGroup >
        <Collapse in={true} style={{transitionDelay:'500ms'}} >
      <Grid container gap={8} item md={12}>
        {attatchments.map((file) => {
        
          return (

          );
        })}
      </Grid>
      </Collapse>

      </TransitionGroup> */}
      <Grid container item md={12}>
        {uploadProgress.started ? (
          <Grid container alignItems={"center"} spacing={4} item md={12}>
            <Grid item md={8}>
              <ProgressBar progress={uploadProgress.pc} />
            </Grid>
            <Grid item md={2}>
              <Typography
                textAlign={"center"}
                fontWeight={"600"}
                variant="body1"
              >
                Uploading
              </Typography>
            </Grid>
            <Grid item md={2}>
              <Typography fontWeight={"600"} textAlign={"end"}>
                {Math.round(uploadProgress.pc)}
              </Typography>
            </Grid>
          </Grid>
        ) : uploadProgress.finished && uploadProgress.status.errs.length > 0 ? (
          <Grid container item md={12}>
            <Grid item md={12}>
              <Typography variant="h6" textAlign={"center"}>
                Some Files Failed To Upload Please Try Again
              </Typography>
            </Grid>
          </Grid>
        ) : uploadProgress.finished &&
          uploadProgress.status.errs.length === 0 ? (
          <Grid container item md={12}>
            <Grid item md={12}>
              <Typography variant="h6" textAlign={"center"}>
                Files Uploaded Successfully
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Button
            fullWidth
            variant="contained"
            disabled={attatchments.length == 0}
            onClick={() => hanldeSubmitAttatchments()}
            sx={{ bgcolor: "secondary.dark", color: "primary.main" }}
          >
            {" "}
            Upload
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default LoanAttatchmentsPreview;
