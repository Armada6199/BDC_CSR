import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function ElibiblityLayerTable({ currentLoan }) {
  const {totalAppliedLayers,activeLoansDeductions}=currentLoan;
  const layerDeductionSum={};
  activeLoansDeductions.forEach(e=>{
   layerDeductionSum[e.activeDeductedLayer]=+ e.activeDeductedAmount;
  });
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650,}} aria-label="simple table">
      <TableHead>
<TableRow sx={{bgcolor:'#fff'}} >
<TableCell sx={{fontWeight:'700',}} align="left" >Layer</TableCell>
<TableCell sx={{fontWeight:'700'}} align="left" >Loan Type</TableCell>
<TableCell sx={{fontWeight:'700',}} align="left" >Loan Status</TableCell>
<TableCell sx={{fontWeight:'700'}} align="left"> Applied Amount</TableCell>
<TableCell sx={{fontWeight:'700'}} align="left"> Applied Interest</TableCell>
<TableCell sx={{fontWeight:'700'}} rowSpan={2} align="left">Layer Interest Rate</TableCell>
<TableCell sx={{fontWeight:'700'}} align="left">Range</TableCell>
<TableCell sx={{fontWeight:'700'}} align="left">Previous Loans Deductions</TableCell>
</TableRow>
</TableHead>
      {totalAppliedLayers.map((layer,index)=>(
        <>
          {/* <TableHead >
  <TableRow >
    <TableCell sx={{fontWeight:'700',borderBottom:"none",fontSize:16,color:'secondary.dark'}}   colSpan={12} align="left">{layer.title}</TableCell>
  </TableRow>
</TableHead> */}
<TableBody>
<TableRow sx={{bgcolor:'#fff'}}>
  <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} rowSpan={2}>{layer.title}</TableCell>
  <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} align="center" rowSpan={2}>{currentLoan.title}</TableCell>
  <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} >Requested</TableCell>
  <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} >{layer.deductedAmount}</TableCell>
  <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} align="center" rowSpan={2}>{layer.totalInterestApplied}</TableCell>
  <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} align="center" rowSpan={2}>{layer.interestRate*100} %</TableCell>
  <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} align="center" rowSpan={2}>{`${layer.min} - ${layer.max}`}</TableCell>
  <TableCell sx={{fontWeight:'600',border:'1px solid lightgray',color:layerDeductionSum[layer.title]?'red':''}} rowSpan={2} align="center">{layerDeductionSum[layer.title]?layerDeductionSum[layer.title]:'0'} JD</TableCell>
</TableRow>
{activeLoansDeductions.map(activeLoan=>(
  activeLoan.activeDeductedLayer==layer.title&&
  <TableRow >
  <TableCell sx={{fontWeight:'600',}}>Active</TableCell>
  <TableCell sx={{fontWeight:'600'}}>{activeLoan.activeDeductedAmount}</TableCell>
</TableRow>
))}
</TableBody>
        </>
      ))}
    </Table>
  </TableContainer>
  );
}

export default ElibiblityLayerTable;

// {/* <TableBody>
// <TableRow
//   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
// >
//   <TableCell sx={{fontWeight:'600'}} component="th" scope="row">
//     Requested 
//   </TableCell>
//   <TableCell sx={{fontWeight:'600',}} align="left">{currentLoan.title}</TableCell>
//   <TableCell sx={{fontWeight:'600'}} align="left">{layer.deductedAmount}</TableCell>
//   <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} rowSpan={2} align="center">{layer.totalInterestApplied.toFixed(3)}</TableCell>
//   <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} rowSpan={2} align="center"> {layer.interestRate*100} %</TableCell>
//   <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} rowSpan={2} align="center">{layer.min+" "} - {" "+layer.max}</TableCell>
//   <TableCell sx={{fontWeight:'600',color:'red'}} rowSpan={2} align="center" >{activeLoansDeductions[index]?.activeDeductedAmount||'0'} JD</TableCell>
//   {/* <TableCell sx={{fontWeight:'600'}} align="left">{activeLoansDeductions[title]&&activeLoansDeductions[layer.title]===layer.title?`${activeLoansDeductions[title]} JD`:'0 JD'}</TableCell> */}
// </TableRow>
// {activeLoansDeductions.map(activeDeduction=>(
// activeDeduction.activeDeductedLayer===layer.title?  
// <TableRow
//   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
// >
//   <TableCell sx={{fontWeight:'600'}} component="th" scope="row">
//     Active
//   </TableCell>
//   <TableCell sx={{fontWeight:'600'}} align="left">{activeLoansDeductions[index]?.activeDeductedType}</TableCell>
//  <TableCell sx={{fontWeight:'600'}} align="left">{activeLoansDeductions[index]?.activeDeductedAmount}</TableCell>
// </TableRow>
// :null))}
// </TableBody> */}