import { Box, Grid, Typography, Modal, TextField,Checkbox,FormControlLabel,Button } from "@mui/material";
import React, { useState } from "react";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { glassmorphismStyle } from "../assets/styles";
import HeaderTest from "../layout/HeaderTest";
import FooterTest from "../layout/FooterTest";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import bankLogo from "../assets/Banque_du_caire_Logodark.svg";

import "../assets/styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LoginPage({setCurrentLoan}) {
  const staffOrClientInnerContainerStyles = {
    ...glassmorphismStyle,
    borderRadius: "0px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
  };
  const [loginCredindtials,setLoginCredindtials]=useState({email:'',password:''});
  const [openStaff, setOpenStaff] = React.useState(false);
  const handleOpenStaffLogin = () => setOpenStaff(true);
  const handleCloseStaffLogin = () => setOpenStaff(false);
  const navigate=useNavigate();
  async function handleLogin(){
    try {
        const loginResponse=await axios.post(`${process.env.REACT_APP_API_URL}/login`,loginCredindtials);
        if(loginResponse.status===200){
            const mockData=loginResponse.data;
            setCurrentLoan((prev)=>({...prev,...mockData,isStaff:true}))
            navigate('/loan')
        }else{
            throw new Error('Invalid Login')
        }
    } catch (error) { 
        console.log(error)
    }
  } 
  return (
    <Grid container height={"100vh"} item md={12}>
      <HeaderTest />
      <Grid container md={12} item sx={{ height: "calc(100vh - 200px)" }}>
        <Grid
          container
          item
          md={7}
          position={"relative"}
          justifyContent={"center"}
          p={4}
          alignItems={"center"}
          className="loginBackground"
        >
          <Box
            width={"100%"}
            height={"100%"}
            bgcolor={"rgba(1,1,1,.4)"}
            zIndex={0}
            position={"absolute"}
          />
          <Grid container zIndex={2} gap={4} item md={12}>
            <Grid container alignItems={'center'} item md={12} gap={3}>
             <Grid item md={12}>
             <Typography variant="h4" fontWeight={'400'} color={"white"}>
                WELCOME TO
                </Typography>
             </Grid>
             <Grid item >
             <Typography variant="h3" fontWeight={'600'} color={"#F05030"}>
             BANQUE DU CARIE
              </Typography>
             </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h6" fontWeight={'400'} color={"white"}>
                kindly let us know if you are an esteemed client of our bank or
                a valued member of our dedicated staff. Your selection will help
                us direct you to the right resources and support. Thank you for
                choosing us!
              </Typography>
            </Grid>
          </Grid>

          {/* <Box width={"100%"} component={"img"} src={businessImg}></Box> */}
        </Grid>
        <Grid
          container
          item
          md={5}
          justifyContent={"center"}
          bgcolor={"#f6f6f6"}
          alignItems={"center"}
          gap={4}
        >
          <Grid item md={12}>
            <Typography textAlign={"center"}  variant="h5" fontWeight={"600"}>
           Select one of the following options to continue
            </Typography>
          </Grid>
          <Grid container item justifyContent={'center'} gap={8} md={12}>
          <Grid
            container
            item
            md={8}
            onClick={handleOpenStaffLogin}
            sx={{ cursor: "pointer",...glassmorphismStyle,boxShadow: '-3px 7px 6px -5px rgba(0,0,0,0.37)',border:"none"}}
            minHeight={'120px'}
            maxHeight={"40%"}
          >
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              bgcolor={"#F58232"}
              item
              sx={{borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px'}}
              md={4}
              
            >
              <BusinessCenterOutlinedIcon
                sx={{ fontSize: 75, color: "white" }}
              />
            </Grid>
            <Grid
              justifyContent={"center"}
              alignItems={"center"}
              container
              item
              md={8}
            >
              <Typography variant="h6" fontWeight={"500"}>
                Apply as a Staff
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            md={8}
            minHeight={'120px'}
            maxHeight={"40%"}
            onClick={()=>navigate('loan')}
            sx={{ cursor: "pointer",...glassmorphismStyle,boxShadow: '-3px 7px 6px -5px rgba(0,0,0,0.37)',border:"none"}}
          >
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              bgcolor={"#F58232"}
              item
              md={4}
              sx={{borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px'}}
            >
              <Person2OutlinedIcon sx={{ fontSize: 75, color: "white" }} />
            </Grid>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              item
              md={8}
              sx={staffOrClientInnerContainerStyles}
            >
              <Typography variant="h6" fontWeight={"500"}>
                Apply as a Client
              </Typography>
            </Grid>
          </Grid>
          </Grid>
 
        </Grid>
      </Grid>
      <FooterTest />
      <Modal
        open={openStaff}
        onClose={handleCloseStaffLogin}
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
          container
          item
          md={5}
          p={4}
          justifyContent={"center"}
          gap={4}
          sx={glassmorphismStyle}
          height={'65vh'}
        >
          <Grid item md={12} >
            <Box
              component={"img"}
              width={"100%"}
              height={"80px"}
              src={bankLogo}
            />
          </Grid>
          <Grid item md={12}>
            <Typography textAlign={"center"} variant="h4" fontWeight={"600"}>
              Hi,Welcome Back
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography
              textAlign={"center"}
              variant="h6"
              color={"gray"}
              fontWeight={"600"}
            >
              Enter your credentials to continue
            </Typography>
          </Grid>
          <Grid container item md={8} gap={4}>
            <Grid item md={12}>
              <TextField fullWidth label="Email" onChange={(e)=>setLoginCredindtials(prev=>({...prev,email:e.target.value}))} type="email" variant="outlined" />
            </Grid>
            <Grid item md={12}>
              <TextField fullWidth label="Password" type="password" onChange={(e)=>setLoginCredindtials(prev=>({...prev,password:e.target.value}))} variant="outlined" />
            </Grid>
            <Grid container item md={12} alignItems={'center'}>
            <Grid item md={6}>
            <FormControlLabel control={<Checkbox
            sx={{
                color: "#215190",
                "&.Mui-checked": {  
                  color: "#F58232",
                },
              }}
            defaultChecked />} label="Remember Me" />
            </Grid>
            <Grid item md={6}>
            <Typography fontWeight={'600'} textAlign={'end'}>Forgot Passowrd ?</Typography>
            </Grid>
            </Grid>
            <Grid item md={12}>
                <Button fullWidth onClick={handleLogin} variant="contained" sx={{bgcolor:'#F58232'}}>Login</Button>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
}

export default LoginPage;
