import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ElibiblityLayerTable from "../ElibiblityLayerTable";
import { Button, Grid, Modal, useMediaQuery } from "@mui/material";
import { glassmorphismStyle } from "../../assets/styles";
import axios from "axios";
import GestureIcon from "@mui/icons-material/Gesture";
import Loader from "../Loader";
import DocumentToolbar from "../../DocumentToolbar";
const InteractiveAttatchments = ({ currentLoan }) => {
  const isMobile=useMediaQuery("(max-width:600px)")
  const [pdfString, setPdfString] = useState("f");
  const [signatureState, setSignatureState] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [zoomState, setZoomState] = useState(isMobile?50:100);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [openModal, setOpenModal] = useState(false);
  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
  // const save=()=>setSignatureState(sigPad.getTrimmedCanvas().toBase64())
  // useEffect(() => {
  //   const postData = async () => {
  //     const documentPost = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/loan`,
  //       currentLoan
  //     );
  //     setPdfString(documentPost.data);
  //   };
  //   postData();
  // }, []);
  async function handleAddSignature(sigPad) {
    // setPdfString("");
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_API_URL}/signature`,
      //   {
      //     ...currentLoan,
      //     signatureBase64: sigPad.getTrimmedCanvas().toDataURL(),
      //   }
      // );
      // if (response.status === 200) {
      //   // console.log(response.data)

      // }\
      setSignatureState(sigPad.getTrimmedCanvas().toDataURL());
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDownloadDocument() {
    // setPdfString("");
    setDownloading(true)
    try {
      const downloadResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/docuDownload`,
        {
          ...currentLoan,
          signatureBase64: signatureState.length > 0 ? signatureState : "",
        },
        { responseType: "blob" }
      );

      const blob = new Blob([downloadResponse.data], {
        type: "application/pdf",
      });
      blobToBase64(blob).then((res) => {
        setPdfString(res);
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
      setDownloading(false)
    } catch (error) {
      console.log(error);
    }
  }
  const increaseZoom=()=>(setZoomState(prev=>prev+25));
  const decreaseZoom=()=>(setZoomState(prev=>prev-25));

  return  (
    <>
      <Grid
        container
        item
        margin={"auto"}
        sx={{glassmorphismStyle}}
        minHeight={'65vh'}
        maxHeight={{md:"65vh"}}
        width={{xs:"100%"}}
        overflow={isMobile?'':'auto'}
        justifyContent="center"
        xs={12}
        >
        <DocumentToolbar
          handleAddSignature={handleAddSignature}
          handleDownloadDocument={handleDownloadDocument}
          zoomState={zoomState}
          increaseZoom={increaseZoom}
          decreaseZoom={decreaseZoom}
          pdfString={pdfString}
          handleOpen={handleOpen}
          handleClose={handleClose}
          openModal={openModal}
          downloading={downloading}
        />

        <Grid
          container
          item
          direction={"row"}
          margin={"auto"}
          padding={4}
          spacing={4}
          sx={{height:'100%',zoom:zoomState/100}}
          xs={12}
          
          // sx={{transform:`scaleX(${zoomState/100})`}}
        >
          <Grid item xs={12}>
            <Typography textAlign={"center"} fontWeight={"700"} variant="h3">
              {currentLoan.title} Loan Agreement
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              fontWeight={"600"}
              color={"primary.bluish"}
              sx={{
                marginBottom: "15px",
                textTransform: "uppercase",
                color: "#215190",
              }}
              textAlign={"center"}
            >
              Parties
            </Typography>
          </Grid>
          {/* Lender Details */}
          <Grid container justifyContent={"space-between"} item xs={12}>
            <Grid item xs={6}>
              <Typography fontWeight={"700"} variant="subtitle1">
                Lender:
              </Typography>
            </Grid>
            <Grid container item xs={6}>
              <Grid item md={6}>
                <Typography
                  variant="subtitle1"
                  fontWeight={500}
                  textAlign={"end"}
                >
                  Banque Du Caire
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  textAlign={"end"}
                  fontWeight={500}
                >
                  Amman
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Borrower Details */}
          <Grid container justifyContent={"space-between"} item xs={12}>
            <Grid item xs={6}>
              <Typography fontWeight={"700"} variant="subtitle1">
                Borrower:
              </Typography>
            </Grid>
            <Grid container item xs={6}>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  fontWeight={"500"}
                  textAlign={"end"}
                >
                  {currentLoan?.formData?.employeeName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  fontWeight={"500"}
                  textAlign={"end"}
                >
                  {currentLoan?.formData?.workPlace}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item spacing={4} xs={12}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                fontWeight={"600"}
                color={"primary.bluish"}
                sx={{
                  textTransform: "uppercase",
                }}
                textAlign={"center"}
              >
                Agreement
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={"500"}>
                I, {currentLoan?.formData?.employeeName}, hereby acknowledge and
                accept the terms outlined in the loan agreement, wherein I
                commit to repaying the loan amount of {currentLoan.EMI} over the
                specified period of {currentLoan.numberOfMonths} months as
                agreed upon, making monthly payments of{" "}
                {currentLoan.payPerMonth.toFixed(3)}. I fully understand and
                agree to abide by these terms and obligations, and I am
                committed to fulfilling this financial agreement within the
                stipulated timeframe.
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4} item xs={12}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  fontWeight={"600"}
                  color={"primary.bluish"}
                  sx={{
                    textTransform: "uppercase",
                  }}
                  textAlign={"center"}
                >
                  Layers Details
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ElibiblityLayerTable currentLoan={currentLoan} />
            </Grid> 
          </Grid>
          <Grid container item xs={12} spacing={4}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                color={"primary.bluish"}
                fontWeight={600}
                sx={{
                  textTransform: "uppercase",
                }}
                textAlign={"center"}
              >
                Signatures
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box display={"flex"} flexDirection={"column"} gap={4}>
                {/* Borrower's Signature */}
                <Typography
                  variant="subtitle1"
                  fontWeight={"600"}
                  textAlign={"center"}
                >
                  Borrower Signature
                </Typography>
                {signatureState.length > 0 ? (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <img
                      src={signatureState}
                      style={{ width: "150px", height: "50px" }}
                      alt="Signature"
                    />
                    <Typography textAlign={"center"}>
                      _____________________{" "}
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Button
                      sx={{ fontWeight: "600" }}
                      onClick={handleOpen}
                      startIcon={<GestureIcon />}
                      fullWidth
                      variant="text"
                    >
                      Add Signature
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display={"flex"} flexDirection={"column"} gap={4}>
                {/* Borrower's Signature */}
                <Typography
                  textAlign={"center"}
                  variant="subtitle1"
                  fontWeight={"600"}
                >
                  Lender Signature
                </Typography>
                {signatureState.length > 0 ? (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <img
                      src={signatureState}
                      style={{ maxWidth: "150px", height: "50px" }}
                      alt="Signature"
                    />
                    <Typography textAlign={"center"}>
                      _____________________{" "}
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Button
                      sx={{ fontWeight: "600" }}
                      startIcon={<GestureIcon />}
                      fullWidth
                      variant="text"
                      onClick={handleOpen}
                    >
                      Add Signature
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
};

export default InteractiveAttatchments;
