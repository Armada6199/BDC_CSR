import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box, Grid, Typography, Modal } from "@mui/material";
import {
  loansIconStyle,
  loanIconContStyle,
  loanTypesBoxesStyle,
} from "../../assets/styles";
import { InfoRounded } from "@mui/icons-material";
import LoanDetails from "../LoanDetails";

export default function LoanTypesSlider({ loans, handleChangeCurrentLoan }) {
const indecatorIcons=loans.map(loan=>(
  loan.loadIcon()
))
  return (
    <Carousel
      navButtonsAlwaysInvisible={true}
      height={"230px"}
      onChange={(e) => handleChangeCurrentLoan(loans[e].title)}
      autoPlay={false}
      sx={{ width: "100%" }}
      IndicatorIcon={indecatorIcons}
      indicatorIconButtonProps={{
        style: {
            padding: '10px',
            marginRight:'10px',
            color:'white',
            backgroundColor:'#C4B28F'
        }
    }}
    activeIndicatorIconButtonProps={{
      style: {
          backgroundColor: '#215190', 
          color:"#C4B28F"
      }
  }}
    >
      {loans.map((loan, index) => (
        <Item key={index} loan={loan} />
      ))}
    </Carousel>
  );
}

function Item({ loan }) {
  const [detailsMobileModal, setDetailsMobileModal] = useState(false);
  const handleOpen = () => {
    setDetailsMobileModal(true)
  };
  const clientHeight=window.outerHeight;
  console.log(clientHeight)
  const handleClose = () => setDetailsMobileModal(false);
  return (
    <React.Fragment key={loan}>
      <Grid
        container
        sx={{
          ...loanTypesBoxesStyle,
          cursor: "pointer",
        }}
        item
        md={6}
        lg={2}
        gap={4}
        key={loan.title}
        minHeight={"200px"}
        justifyContent={"center"}
      >
        <Grid container justifyContent={"center"} item md={12}>
          <Box sx={loanIconContStyle}>{loan.loadIcon(loansIconStyle)}</Box>
        </Grid>
        <Grid container justifyContent={"center"} item md={12}>
          <Typography variant="body1" fontWeight={"bold"}>
            {loan.title}
          </Typography>
        </Grid>
        <Grid container   justifyContent={"center"} item xs={8}>
          <Button
            fullWidth
            onClick={()=>handleOpen()}
            variant="contained"
            sx={{ bgcolor: "secondary.dark" }}
            startIcon={
              <InfoRounded
                sx={{
                  bgcolor: "defualt.main",
                  color: "white",
                  fontSize: 32,
                  fontWeight: "600",
                }}
              />
            }
          >
            View Details
          </Button>
        </Grid>
      </Grid>
      <Modal open={detailsMobileModal} onClose={handleClose}>
        <Grid container height={'100%'}  item xs={12} >
          <LoanDetails handleClose={handleClose}  currentLoan={loan} />
        </Grid>
      </Modal>
    </React.Fragment>
  );
}
