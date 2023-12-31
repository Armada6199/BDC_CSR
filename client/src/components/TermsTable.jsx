import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";

function TermsTable({ currentLoan }) {
  function createData(minAmount, maxAmount, minMonths, maxMonths, normalDBR,socialSecurityDBR) {
    return { minAmount, maxAmount, minMonths, maxMonths, normalDBR,socialSecurityDBR };
  }
  const rows = [
    createData(
      currentLoan.minAmount,
      currentLoan.maxAmount(currentLoan.intrestRates),
      currentLoan.minMonths,
      currentLoan.maxMonths,
      currentLoan.normalDBR,
      currentLoan.socialSecurityDBR,
    ),
  ];  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'700'}} align="left">Minimum Amount</TableCell>
            <TableCell sx={{fontWeight:'700'}}  align="left">Maximum  Amount</TableCell>
            <TableCell sx={{fontWeight:'700'}} align="left">Minimum Tenor</TableCell>
            <TableCell sx={{fontWeight:'700'}} align="left">Max Tenor</TableCell>
            <TableCell sx={{fontWeight:'700'}} align="left"> DBR</TableCell>
            <TableCell sx={{fontWeight:'700'}} align="left">Social Security DBR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.minAmount}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{fontWeight:'600'}} align="left">{row.minAmount} JD</TableCell>
              <TableCell sx={{fontWeight:'600'}} align="left">{row.maxAmount} JD</TableCell>
              <TableCell sx={{fontWeight:'600'}}  align="left">{row.minMonths} Months</TableCell>
              <TableCell sx={{fontWeight:'600'}} align="left">{row.maxMonths} Months</TableCell>
              <TableCell sx={{fontWeight:'600'}} align="left">{row.normalDBR*100} %</TableCell>
              <TableCell sx={{fontWeight:'600'}} align="left">{row.socialSecurityDBR*100} %</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TermsTable;
