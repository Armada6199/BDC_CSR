import { Button, Grid, Typography, Modal, Box } from "@mui/material";
import React, { useState } from "react";
import PreviewIcon from "@mui/icons-material/Preview";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { glassmorphismStyle } from "./assets/styles";
import ReactSignatureCanvas from "react-signature-canvas";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import GestureIcon from "@mui/icons-material/Gesture";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Link from "@mui/material/Link";

function DocumentToolbar({
  handleAddSignature,
  handleDownloadDocument,
  zoomState,
  decreaseZoom,
  increaseZoom,
  pdfString,
  handleOpen,
  handleClose,
  openModal
}) {
  
  const clear = () => sigPad.clear();
  let sigPad = {};
  return (
    <Grid
      width={"100%"}
      position={"sticky"}
      top={"0"}
      right={"0"}
      item
      md={12}
      spacing={12}
      sx={{
        ...glassmorphismStyle,
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        borderRadius: "0",
        bgcolor:'#f3f3f3'
      }}
    >
      <Grid container  item md={12} justifyContent={'space-between'}>
        <Grid container justifyContent={'space-around'} alignItems={"center"} item md={2}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              ":hover": { backgroundColor: "secondary.light" },
            }}
            item
            md={2}
            onClick={decreaseZoom}
          >
            <RemoveIcon
              sx={{
                fontWeight: "600",
              }}
            />
          </Box>
          <Grid item md={4}>
            <Typography fontWeight={'600'} textAlign={"center"}>{zoomState}%</Typography>
          </Grid>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              ":hover": { backgroundColor: "secondary.light" },
            }}
            item
            md={2}
            onClick={increaseZoom}
          >
            <AddIcon
              sx={{
                fontWeight: "600",
              }}
            />
          </Box>
        </Grid>
        <Grid container item justifyContent={'flex-end'} md={8}>
        {/* <Grid item md={2}>
          <Button
            sx={{
              fontWeight: "600",
              ":hover": { backgroundColor: "secondary.light" },
            }}
            startIcon={<PreviewIcon />}
            fullWidth
            variant="text"
            onClick={() => {
              var pdf_newTab = window.open("");

              pdf_newTab.document.write(
                `<html><head><title>Loan Agreement</title></head><body><iframe title='Loan Agreement' style="border:none"  width='100%' height='100%' src='data:application/pdf;base64,${pdfString}#toolbar=1&view=Fit'></iframe></body></html>`
              );
            }}
          >
            Preview
          </Button>
        </Grid> */}
        <Grid item md={2}>
          <Button
            sx={{
              fontWeight: "600",
              ":hover": { backgroundColor: "secondary.light" },
            }}
            onClick={handleOpen}
            startIcon={<GestureIcon />}
            fullWidth
            variant="text"
          >
            SIGN
          </Button>
        </Grid>
        <Grid item md={2}>
          <Button
            fullWidth
            sx={{
              fontWeight: "600",
              ":hover": { backgroundColor: "secondary.light" },
            }}
            onClick={() => handleDownloadDocument(sigPad)}
            startIcon={<SaveAltIcon />}
            variant="text"
          >
            DOWNLOAD
          </Button>
        </Grid>
        </Grid>
     
      </Grid>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
        }}
      >
        <Grid
          sx={{ ...glassmorphismStyle}}
          container
          item
          md={6}
 
        >
          <Grid container item md={12} height={'100%'} gap={4} p={4}>
          <Grid item md={12}>
            <Typography variant="h6" textAlign={"center"}>
              Kindly Add Your Signature
            </Typography>
          </Grid>
          <Grid container className="sigContainer" item md={12}>
            <ReactSignatureCanvas
              penColor="#215190"
              ref={(ref) => {
                sigPad = ref;
              }}
              canvasProps={{ className: "sigPad" }}
            />
          </Grid>
          <Grid container item md={12} spacing={4}>
            <Grid item md={6}>
              <Button
                onClick={clear}
                sx={{
                  color: "#215190",
                  fontWeight: "700",
                  borderColor: "#215190",
                }}
                startIcon={<ClearIcon />}
                fullWidth
                variant="outlined"
              >
                Clear
              </Button>
            </Grid>
            <Grid item md={6}>
              <Button
                onClick={() => handleAddSignature(sigPad)}
                sx={{
                  fontWeight: "600",
                  bgcolor: "#C4B28F",
                  color: "primary.main",
                  ":hover": { backgroundColor: "secondary.dark" },
                }}
                startIcon={<SaveIcon />}
                fullWidth
                variant="contained"
              >
                Save
              </Button>
            </Grid>
          </Grid>
          </Grid>
        
        </Grid>
      </Modal>
    </Grid>
  );
}

export default DocumentToolbar;
