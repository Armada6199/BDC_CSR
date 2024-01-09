import React from 'react'
import bankLogo from "../assets/Banque_du_caire_Logodark.svg";
import { Box, Grid, Typography, Modal, TextField,Checkbox,FormControlLabel,Button, useMediaQuery } from "@mui/material";
import { glassmorphismStyle } from "../assets/styles";
import ClearIcon from "@mui/icons-material/Clear";

function LoginModal({setLoginCredindtials,handleLogin,handleCloseStaffLogin}) {
  return (
    <Grid
    container
    item
    md={12}
    p={4}
    justifyContent={"center"}
    gap={4}
    sx={{...glassmorphismStyle,borderRadius:'30px'}}
    height={{xs:'90vh',md:'95vh',xl:'80vh'}}
  >
      <ClearIcon
          onClick={handleCloseStaffLogin}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: 32,
          }}
        />
    <Grid item  md={12} >
      <Box
        component={"img"}
        width={"100%"}
        height={"60px"}
        src={bankLogo}
      />
    </Grid>
    <Grid item xs={12} >
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
    <Grid container item justifyContent={'center'} xs={12} md={8} gap={4}>
      <Grid item xs={12} md={12}>
        <TextField fullWidth label="Email" onChange={(e)=>setLoginCredindtials(prev=>({...prev,email:e.target.value}))} type="email" variant="outlined" />
      </Grid>
      <Grid item xs={12}  md={12}>
        <TextField fullWidth label="Password" type="password" onChange={(e)=>setLoginCredindtials(prev=>({...prev,password:e.target.value}))} variant="outlined" />
      </Grid>
      <Grid container item xs={12}  alignItems={'center'}>
      <Grid item xs={6} md={6}>
      <FormControlLabel control={<Checkbox
      sx={{
          color: "#215190",
          "&.Mui-checked": {  
            color: "#F58232",
          },
        }}
      defaultChecked />} label="Remember Me" />
      </Grid>
      <Grid item xs={6} md={6}>
      <Typography fontWeight={'600'} textAlign={'end'}>Forgot Passowrd ?</Typography>
      </Grid>
      </Grid>
      <Grid item xs={10} md={12}>
          <Button fullWidth onClick={handleLogin} variant="contained" sx={{bgcolor:'#F58232'}}>Login</Button>
      </Grid>
    </Grid>
  </Grid>
  )
}

export default LoginModal