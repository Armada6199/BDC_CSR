import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import "../../assets/styles.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function Documents({ register, errors, currentLoan }) {
 
  return  (
    <Grid container item minHeight={"75vh"} >
      <Grid container item md={6} spacing={4}>
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
            <Grid item md={12}>
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
      </Grid>
    </Grid>
  )
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
