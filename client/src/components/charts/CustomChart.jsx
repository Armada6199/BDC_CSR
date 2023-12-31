import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);


export default function CustomChart({totalAppliedLayers}) {
  const appliedInterests=totalAppliedLayers.map(ele=>{
    return ele.totalInterestApplied;
  })
  const titles=totalAppliedLayers.map(ele=>{
    return ele.title;
  })
  const data = {
    labels: titles,
    datasets: [
      {
        label: 'Interests',
        data: appliedInterests,
        backgroundColor: [
          '#215190',
          '#C4B28F',
          '#637E76',
          '#371E30'
        ],
        borderColor: [
          '#215190',
          '#C4B28F',
          '#637E76',
          '#371E30'
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
