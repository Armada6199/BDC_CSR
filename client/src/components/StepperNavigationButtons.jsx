import { Grid,Button } from '@mui/material'
import React from 'react'

function StepperNavigationButtons({handleRest,handleBack,activeStep}) {
  return (
    <Grid container item  xs={12}   alignItems={'center'}  spacing={2}  >
    <Grid container   item xs={4}  md={4}>
      <Button
        fullWidth
        onClick={handleRest}
        variant="outlined"
      >
        Cancel
      </Button>
    </Grid>
    <Grid container item  xs={8}    justifyContent={'flex-end'}    spacing={1} >
    {activeStep>0&&
      <Grid item xs={6} md={6}>
        <Button
        fullWidth
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>
      </Grid>}
    <Grid item xs={6}  md={6}>
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
    {/* <Grid container item spacing={2} justifyContent={'flex-end'}  md={4}>
  
      <Grid item  md={6}>
        <Button
        fullWidth
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "#215190"}}
        >
          Next
        </Button>
      </Grid>
    </Grid> */}
  </Grid>
  
  )
}

export default StepperNavigationButtons