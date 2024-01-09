import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);


export default function CustomChart({interestPayable,loanAmount}) {
  // const appliedInterests=totalAppliedLayers.map(ele=>{
  //   return ele.totalInterestApplied;
  // })
  // const titles=totalAppliedLayers.map(ele=>{
  //   return ele.title;
  // })
  console.log(interestPayable,loanAmount)
  const data = {
    labels: ['Original Loan Amount','Intersts'],
    datasets: [
      {
        label: 'EMI Details',
        data: [interestPayable,loanAmount],
        backgroundColor: [
          '#215190',
          '#C4B28F',
         
        ],
        borderColor: [
          '#215190',
          '#C4B28F',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return <Doughnut
  options={{maintainAspectRatio:false}}
  height="300px"
  width="300px" data={data} />;
}
