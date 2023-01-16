
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  {
    subject: 'Math',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Chinese',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'English',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Geography',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Physics',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'History',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

interface ChartData {stats:number[]}

const Chart :React.FC = () => {
  return(
    <ResponsiveContainer width="100%" height="100%" className="radar">
        <RadarChart 
        cx="50%" 
        cy="50%" 
        outerRadius="60%" 
        data={data}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar 
          name="Mike" 
          dataKey="A" 
          stroke="#29333D" 
          fill="#FAB36B" 
          fillOpacity={0.5} 
          />
        </RadarChart>
    </ResponsiveContainer>
  );
}

export default Chart;