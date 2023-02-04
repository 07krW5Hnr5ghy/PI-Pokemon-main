import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,Tooltip } from 'recharts';
import { Stats } from '../interfaces';

const StatsTooltip = ({active,payload,label}:any) => {
  if(active && payload && payload.length){
    console.log("active",active);
    console.log("payload",payload);
    console.log("label",label);
    return(
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value} points`}</p>
      </div>
    );
  }
  return null;
};

const Chart = (props:{stats:Stats[]}) => {
  console.log(props);
  return(
    <ResponsiveContainer width="100%" height="100%" className="radar">
        <RadarChart 
        cx="50%" 
        cy="50%" 
        outerRadius="60%" 
        data={props.stats}
        >
          <PolarGrid stroke="#3D3329"/>
          <PolarAngleAxis dataKey="subject" stroke="#3D3329"/>
          <PolarRadiusAxis stroke="#3D3329" />
          <Tooltip content={<StatsTooltip />} cursor={{ stroke: '#C66606', strokeWidth: 2 }} />
          <Radar 
          name="stats" 
          dataKey="points" 
          stroke="#0C66C0" 
          fill="#0F81F0" 
          fillOpacity={0.5} 
          />
        </RadarChart>
    </ResponsiveContainer>
  );
}

export default Chart;