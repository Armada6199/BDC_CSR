import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import bankLogo from '../assets/Banque_du_caire_Logowhite.svg'

function HeaderTest() {
  return (
    <Grid container bgcolor={'#424242'} height={'100px'} borderBottom={'4px solid #F05030'} p={0} justifyContent={'space-between'} px={4} alignItems={'center'}  item md={12}>
    <Grid item md={6} >
    <Box component={'img'} height={'60px'}  sx={{fill:"white"}} src={bankLogo}/>
    </Grid>
    <Grid item md={6}>
        <Typography variant='h6' textAlign={'end'} color={'white'}>EN</Typography>
    </Grid>
    </Grid>
  )
}

export default HeaderTest