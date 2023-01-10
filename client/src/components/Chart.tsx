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
import {Bolt} from '@mui/icons-material';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ChartData {stats:number[]}

const Chart : React.FC<ChartData>= (props:ChartData) => {
  const labels = ["attack","defense","health","speed","special attack","special defense"];
  const data = {
    labels,
    datasets: [
      {
        label: 'points',
        data: props.stats,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth:1,
      },
    ],
  };
    return <Radar data={data} />
}

export default Chart;