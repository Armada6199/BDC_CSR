import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ElibiblityLayerTable from "../ElibiblityLayerTable";
import { Button, Grid, Modal } from "@mui/material";
import { glassmorphismStyle } from "../../assets/styles";
import axios from "axios";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import GestureIcon from "@mui/icons-material/Gesture";
import ReactSignatureCanvas from "react-signature-canvas";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import Loader from "../Loader";

const InteractiveAttatchments = ({ currentLoan, signatureBase64 }) => {
  const [pdfString, setPdfString] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [signatureState, setSignatureState] = useState("");
  const [downloading,setDownloading ]=useState(false);
  let sigPad = {};
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const clear = () => sigPad.clear();
  const blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
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
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDownloadDocument() {
    setPdfString("")
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
      blobToBase64(blob).then(res => {
    
        setPdfString(res)
       
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
    <>
      <Grid
        container
        item
        direction={"row"}
        margin={"auto"}
        sx={glassmorphismStyle}
        maxWidth={"60%"}
        padding={4}
        spacing={4}
      >
        <Grid container item md={12} spacing={12}>
          <Grid item md={6}>
            <Button
              sx={{
                fontWeight: "600",
                ":hover": { backgroundColor: "secondary.light" },
              }}
              onClick={handleOpen}
              startIcon={<GestureIcon />}
              fullWidth
              variant="outlined"
            >
              SIGN
            </Button>
          </Grid>
          <Grid item md={6}>
            <Button
              fullWidth
              sx={{
                fontWeight: "600",
                ":hover": { backgroundColor: "secondary.light" },
              }}
              onClick={handleDownloadDocument}
              startIcon={<SaveAltIcon />}
              variant="outlined"
            >
              DOWNLOAD
            </Button>
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
          <Grid sx={glassmorphismStyle} container spacing={4} p={4} item md={6}>
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
        </Modal>
        <Grid item md={12}>
          <Typography textAlign={"center"} fontWeight={'700'} variant="h3">
            {currentLoan.title} Loan Agreement
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography
            variant="h5"
            fontWeight={'600'}
            color={'primary.bluish'}
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
        <Grid container justifyContent={'space-between'} item md={12}>
          <Grid item md={6}>
            <Typography
            fontWeight={'700'}
            variant="subtitle1"
            >
              Lender:
            </Typography>
          </Grid>
          <Grid container item md={6}>
           <Grid  item md={12}>
           <Typography variant="subtitle1" fontWeight={500} textAlign={'end'}>Banque Du Caire</Typography>
           </Grid>
           <Grid item md={12}>
           <Typography variant="subtitle1" textAlign={'end'} fontWeight={500}>Amman</Typography>
           </Grid>
        
          </Grid>
        </Grid>
        {/* Borrower Details */}
        <Grid container justifyContent={'space-between'} item md={12}>
          <Grid item md={6}>
            <Typography
            
            fontWeight={'700'}
            variant="subtitle1"
            >
              Borrower:
            </Typography>
          </Grid>
          <Grid container item md={6}>
           <Grid  item md={12}>
           <Typography variant="subtitle1"  fontWeight={'500'} textAlign={'end'}>{currentLoan?.formData?.employeeName}</Typography>
           </Grid>
           <Grid item md={12}>
           <Typography variant="subtitle1" fontWeight={'500'} textAlign={'end'}>{currentLoan?.formData?.workPlace}</Typography>
           </Grid>
        
          </Grid>
        </Grid>
        <Grid container item spacing={4} md={12}>
          <Grid item md={12}>
            <Typography
              variant="h5"
              fontWeight={'600'}
              color={'primary.bluish'}
              sx={{
                textTransform: "uppercase",
              }}
              textAlign={"center"}
            >
              Agreement
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle1" fontWeight={"500"}>
              I, {currentLoan?.formData?.employeeName}, hereby acknowledge and
              accept the terms outlined in the loan agreement, wherein I commit
              to repaying the loan amount of {currentLoan.EMI} over the
              specified period of {currentLoan.numberOfMonths} months as agreed
              upon, making monthly payments of {currentLoan.payPerMonth.toFixed(3)}. I
              fully understand and agree to abide by these terms and
              obligations, and I am committed to fulfilling this financial
              agreement within the stipulated timeframe.
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4}  item md={12}>
          <Grid item md={12}>
            <Grid item md={12}>
              <Typography
                variant="h5"
                fontWeight={'600'}
                color={'primary.bluish'}
                sx={{
                  textTransform: "uppercase",
                }}
                textAlign={"center"}
              >
                Layers Details
              </Typography>
            </Grid>
          </Grid>
          <Grid item md={12}>
            <ElibiblityLayerTable currentLoan={currentLoan} />
          </Grid>
        </Grid>
        <Grid container item md={12} spacing={4}>
          <Grid item md={12}>
            <Typography
              variant="h5"
              color={'primary.bluish'}
              fontWeight={600}
              sx={{
                textTransform: "uppercase",
              }}
              textAlign={"center"}
            >
              Signatures
            </Typography>
          </Grid>
          <Grid item md={6}>
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
                    onClick={() => setOpenModal(true)}
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
          <Grid item md={6}>
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
                    onClick={() => setOpenModal(true)}
                  >
                    Add Signature
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  ) : (
    <Grid container item minHeight={"75vh"}>
      <Loader />
    </Grid>
  );
};

export default InteractiveAttatchments;
