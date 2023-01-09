import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Chart = () => {

  
  const labels = ["height","speed","weight","attack","defense","hp"];
  const info1 = [103,45,230,87,300,98];
  const info2 = [0,45];
  const info3 = [0,230];
  const info4 = [0,87];
  const info5 = [0,150];
  const info6 = [0,300];
   
  const data = {
    labels,
    datasets: [
      {
        label: 'points',
        data: info1,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth:1,
      },
      /*{
        label:'weight',
        data: [45],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label:'speed',
        data:[230],
        borderColor:"rgba(255, 206, 86, 1)",
        backgroundColor:"rgba(255, 206, 86, 0.2)",
      },
      {
        label:'attack',
        data:[87],
        borderColor:"rgba(75, 192, 192, 1)",
        backgroundColor:"rgba(75, 192, 192, 0.2)",
      },
      {
        label:'defense',
        data:[150],
        borderColor:"rgba(153, 102, 255, 1)",
        backgroundColor:"rgba(153, 102, 255, 0.2)",
      },
      {
        label:'health',
        data:[300],
        borderColor:"rgba(255, 159, 64, 1)",
        backgroundColor:"rgba(255, 159, 64, 0.2)",
      }*/
    ],
  };
    return <Radar data={data} />
}

export default Chart;