import { Grid,Button } from '@mui/material'
import React from 'react'

function StepperNavigationButtons({handleRest,handleBack,activeStep}) {
  return (
    <Grid container sx={{zIndex:'99'}} height={'60px'}  justifyContent={'space-between'} spacing={2} item >
    <Grid item  md={2}>
      <Button
        fullWidth
        onClick={handleRest}
        variant="outlined"
      >
        Cancel
      </Button>
    </Grid>
    <Grid container spacing={2} justifyContent={'flex-end'} item md={4}>
      {activeStep>0&&
      <Grid item md={6}>
        <Button
        fullWidth
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>
      </Grid>}
      <Grid item md={6}>
        <Button
        fullWidth
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "#215190"}}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  </Grid>
  
  )
}

export default StepperNavigationButtons