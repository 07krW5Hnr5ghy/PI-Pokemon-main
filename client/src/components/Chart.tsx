import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,Tooltip } from 'recharts';
import { Stats } from '../tools/interfaces';

/* component that return the widget showing the 
stat point when we hover in the stats chart */
const StatsTooltip = ({active,payload,label}:any) => {

  if(active && payload && payload.length){

    return(
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value} points`}</p>
      </div>
    );

  }

  return null;

};

/* component that render the chart with the stats on each pokemon */
const Chart = (props:{stats:Stats[]}) => {
  
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