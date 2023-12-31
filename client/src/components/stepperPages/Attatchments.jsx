import {
    AppBar,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    Modal,
    Paper,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import "../../assets/styles.css";
  import axios from "axios";
  import Template from "../Template";
  import SignatureCanvas from "react-signature-canvas";
  import { documentButtonsStyles } from "../../assets/styles";
  import ClearIcon from "@mui/icons-material/Clear";
  import SaveAltIcon from "@mui/icons-material/SaveAlt";
  import PreviewIcon from "@mui/icons-material/Preview";
  import SaveIcon from "@mui/icons-material/Save";
  import CloseIcon from "@mui/icons-material/Close";
  import Loader from "../Loader";
  
  function Documents({ register, errors, currentLoan }) {
    const [pdfString, setPdfString] = useState("");
    const [openModal, setOpenModal] = React.useState(false);
    const [signatureState, setSignatureState] = useState(null);
    let sigPad = {};
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const clear = () => sigPad.clear();
    // const save=()=>setSignatureState(sigPad.getTrimmedCanvas().toBase64())
    useEffect(() => {
      const postData = async () => {
        const documentPost = await axios.post(
          `${process.env.REACT_APP_API_URL}/loan`,
          currentLoan
        );
        setPdfString(documentPost.data);
      };
      postData();
    }, []);
    async function handleAddSignature() {
      setSignatureState(sigPad.getTrimmedCanvas().toDataURL());
      setPdfString("");
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/signature`,
          {
            ...currentLoan,
            signatureBase64: sigPad.getTrimmedCanvas().toDataURL(),
          }
        );
        if (response.status === 200) {
          // console.log(response.data)
          setPdfString(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function handleDownloadDocument() {
      try {
        const downloadResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/docuDownload`,
          {
            ...currentLoan,
            signatureBase64: sigPad.getTrimmedCanvas().toDataURL(),
          },
          { responseType: "blob" }
        );
        const blob = new Blob([downloadResponse.data], {
          type: "application/pdf",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${currentLoan.formData?.employeeName} Loan Agreenmnt`
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.log(error);
      }
    }
    return pdfString.length > 0 ? (
      <Grid container item minHeight={"75vh"} spacing={12}>
        <Grid item md={6}>
          <Box className="attatchments_sticky">
            <Grid  container spacing={4} item md={12}>
            <Grid item md={12}>
              <Typography variant="h5" fontWeight="700" color={"gray"}>
                Attatchments
              </Typography>
            </Grid>
              <Grid item md={12}>
                <Typography variant="body2" fontWeight={"500"} color={"darkgray"}>
                  Please Sign the template related to each file,or download it via
                  the download template button, then save it .{" "}
                </Typography>
              </Grid>
              <Grid container item md={12} spacing={4}>
                <Grid item md={12}>
                  <Typography fontWeight="600"  variant="h6" >
                    SIGNATURE
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <SignatureCanvas
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
                      onClick={() => handleAddSignature()}
                      sx={{
                        fontWeight: "600",
                        bgcolor: "#C4B28F",
                        color: "primary.main",
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
              <Grid item md={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("iScoreApproval", {
                        required: "Kindly approve this field",
                      })}
                    />
                  }
                  label="I approve and authorize BDC to perform I-Score investigation and all required investigations to proceed the loan request"
                />
                {errors.iScoreApproval?.message && (
                  <Typography variant="body2" color={"error"}>
                    {errors.iScoreApproval?.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid container  item md={6} spacing={4}>
              <Grid container item md={12}>
                <Template pdfString={pdfString}/>
                </Grid>
                <Grid container item md={12} spacing={4}>
      <Grid item md={6}>
        <Button
          sx={{
            color: "#215190",
            fontWeight: "700",
            borderColor: "#215190",
          }}
          fullWidth
          _target='blank'
          href={`data:application/pdf;base64,${pdfString}`}
          startIcon={<PreviewIcon />}
          onClick={handleOpen}
          variant="outlined"
        >
          Preview
        </Button>
      </Grid>
      <Grid item md={6}>
        <Button
          fullWidth
          sx={{ fontWeight: "600",bgcolor:'#C4B28F',color:"primary.main" }}
          onClick={handleDownloadDocument}
          startIcon={<SaveAltIcon />}
          variant="contained"
        >
          Download
        </Button>
      </Grid>
    </Grid>
        </Grid>
      </Grid>
    ) : (
      <Grid
        container
        item
        md={12}
        width={"100vw"}
        minHeight={"70vh"}
        spacing={12}
      >
        <Loader />
      </Grid>
    );
  }
  
  export default Documents;
  {
    <Grid item md={4}>
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
                multiple
                type="file"
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
  }
  
  // {
  //   <Grid container item md={4}>
  // <Grid item md={12}>
  //   <Typography variant="h5" fontWeight="700" color={"gray"}>
  //     Attatchments
  //   </Typography>
  // </Grid>
  // <Grid item md={12}>
  //   <Typography variant="body2" fontWeight={"500"} color={"darkgray"}>
  //     Please Sign the template related to each file,or download it via the
  //     download template button, then save it .{" "}
  //   </Typography>
  // </Grid>
  //   <Template pdfString={pdfString}/>
  // <Grid item md={8}>
  //   <Grid container item md={12} spacing={4}>
  //     <Grid item md={6}>
  //       <Button
  //         sx={{
  //           color: "#215190",
  //           fontWeight: "700",
  //           borderColor: "#215190",
  //         }}
  //         fullWidth
  //         startIcon={<PreviewIcon />}
  //         onClick={handleOpen}
  //         variant="outlined"
  //       >
  //         Preview
  //       </Button>
  //     </Grid>
  //     <Grid item md={6}>
  //       <Button
  //         fullWidth
  //         sx={{ fontWeight: "600",bgcolor:'#C4B28F',color:"primary.main" }}
  //         onClick={handleDownloadDocument}
  //         startIcon={<SaveAltIcon />}
  //         variant="contained"
  //       >
  //         Download
  //       </Button>
  //     </Grid>
  //   </Grid>
  
  //   <Modal
  //     open={openModal}
  //     onClose={handleClose}
  //     aria-labelledby="modal-modal-title"
  //     aria-describedby="modal-modal-description"
  //   >
  //     <Grid
  //       container
  //       borderRadius={"10px"}
  //       item
  //       md={11}
  //       bgcolor={"#f6f6f6"}
  //       height={"100vh"}
  //       margin={"auto"}
  //       justifyContent={"center"}
  //     >
  //       <Grid
  //         container
  //         item
  //         md={12}
  //         padding={1}
  //         height={"40px"}
  //         justifyContent={"flex-end"}
  //       >
  //         <CloseIcon
  //           sx={{ fontSize: "30px", cursor: "pointer" }}
  //           onClick={handleClose}
  //         />
  //       </Grid>
  //       <Grid container justifyContent={"center"} item md={12}>
  //           <Template  pdfString={pdfString} />
  //       </Grid>
  //     </Grid>
  //   </Modal>
  // </Grid>
  // </Grid>
  // <Grid container item md={8} spacing={4}>
  // <Grid item md={12}>
  //   <Typography variant="h6" textAlign={"center"}>
  //     Signature
  //   </Typography>
  // </Grid>
  // <Grid item md={12}>
  //   <SignatureCanvas
  //     penColor="#215190"
  //     ref={(ref) => {
  //       sigPad = ref;
  //     }}
  //     canvasProps={{ className: "sigPad" }}
  //   />
  // </Grid>
  // <Grid container item md={12} spacing={4}>
  //   <Grid item md={6}>
  //     <Button
  //       onClick={clear}
  //       sx={{
  //         color: "#215190",
  //         fontWeight: "700",
  //         borderColor: "#215190",
  //       }}
  //       startIcon={<ClearIcon />}
  //       fullWidth
  //       variant="outlined"
  //     >
  //       Clear
  //     </Button>
  //   </Grid>
  //   <Grid item md={6}>
  //     <Button
  //       onClick={() => handleAddSignature()}
  //       sx={{ fontWeight: "600",bgcolor:'#C4B28F',color:"primary.main" }}
  //       startIcon={<SaveIcon />}
  //       fullWidth
  //       variant="contained"
  //     >
  //       Save
  //     </Button>
  //   </Grid>
  // </Grid>
  // </Grid>
  // <Grid item md={12}>
  // <FormControlLabel
  //   control={
  //     <Checkbox
  //       {...register("iScoreApproval", {
  //         required: "Kindly approve this field",
  //       })}
  //     />
  //   }
  //   label="I approve and authorize BDC to perform I-Score investigation and all required investigations to proceed the loan request"
  // />
  // {errors.iScoreApproval?.message && (
  //   <Typography variant="body2" color={"error"}>
  //     {errors.iScoreApproval?.message}
  //   </Typography>
  // )}
  // </Grid> 
  // }
  
  {
    /* <Grid container item md={6}>
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
  <Grid item md={8}>
  </Grid>
  <Grid container item md={8} spacing={4}>
  <Grid item md={12}>
    <Typography variant="h6" textAlign={"center"}>
      Signature
    </Typography>
  </Grid>
  <Grid item md={12}>
    <SignatureCanvas
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
        onClick={() => handleAddSignature()}
        sx={{ fontWeight: "600",bgcolor:'#C4B28F',color:"primary.main" }}
        startIcon={<SaveIcon />}
        fullWidth
        variant="contained"
      >
        Save
      </Button>
    </Grid>
  </Grid>
  </Grid>
  <Grid item md={12}>
  <FormControlLabel
    control={
      <Checkbox
        {...register("iScoreApproval", {
          required: "Kindly approve this field",
        })}
      />
    }
    label="I approve and authorize BDC to perform I-Score investigation and all required investigations to proceed the loan request"
  />
  {errors.iScoreApproval?.message && (
    <Typography variant="body2" color={"error"}>
      {errors.iScoreApproval?.message}
    </Typography>
  )}
  </Grid>
  </Grid> */
  }
  //   <Grid container item spacing={12} md={6}>
  //     <Grid container spacing={4} item md={12}>
  // <Grid item md={6}>
  //   <Button
  //     sx={{
  //       color: "#215190",
  //       fontWeight: "700",
  //       borderColor: "#215190",
  //     }}
  //     fullWidth
  //     startIcon={<PreviewIcon />}
  //     onClick={handleOpen}
  //     variant="outlined"
  //   >
  //     Preview
  //   </Button>
  // </Grid>
  // <Grid item md={6}>
  //   <Button
  //     fullWidth
  //     sx={{ fontWeight: "600",bgcolor:'#C4B28F',color:"primary.main" }}
  //     onClick={handleDownloadDocument}
  //     startIcon={<SaveAltIcon />}
  //     variant="contained"
  //   >
  //     Download
  //   </Button>
  // </Grid>
  //     </Grid>
  //     <Grid container  minHeight={'100%'} item md={12}>
      // <iframe width={'100%'} src={`data:application/pdf;base64,${pdfString}#toolbar=0&view=fitH&zoom=100%`} frameborder="0"></iframe>
  //     </Grid>
  //     </Grid>
  