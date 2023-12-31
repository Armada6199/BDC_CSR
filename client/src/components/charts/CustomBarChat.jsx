import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const labels = ['First Layer', 'Second Layer', 'Third Layer', 'Forth Layer'];

export function CustomBarChat({totalAppliedLayers,maxAmount}) {
 const options = {
  
    scales: {
      x: {
        stacked: true,
        beginAtZero:true
      },
      y: {
        stacked: true,
        min:0,
        max:maxAmount
      },
    },
  };
   const data = {
    labels,
    datasets: [
      {
        label: 'Total Applied',
        data:totalAppliedLayers.map(ele=>ele.deductedAmount),
        backgroundColor: '#215190',
      },
      {
        label: 'Applied Interests',
        data: totalAppliedLayers.map(ele=>ele.totalInterestApplied),
        backgroundColor: '#C4B28F',
      },
    ],
  };
  return <Bar height={'100%'} width={'100%'} options={options} data={data} />;
}
