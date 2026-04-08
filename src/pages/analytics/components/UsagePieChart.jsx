
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

/**
 * UsagePieChart: Visualizes the Energy Contribution split
 * Purpose: Shows Home Consumption vs Grid Export (Donation) in a Donut style chart.
 */
const UsagePieChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        {/* The Pie component defines the shape of the donut */}
        <Pie
          data={data}
          cx="50%" // Center X coordinate
          cy="50%" // Center Y coordinate
          innerRadius={60} // Creates the donut hole
          outerRadius={80} // Sets the thickness
          paddingAngle={5} // Gap between segments
          dataKey="value" // Which property in 'data' contains the numbers
        >
          {/* Map through data to apply custom SanSolar colors (Solar Gold & Blue) */}
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        
        {/* Tooltip provides details when hovering over segments */}
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            borderRadius: '12px', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
          }}
          formatter={(value) => [`${value.toLocaleString()} kWh`, 'Total Contribution']}
        />
        
        {/* Legend identifies what the colors represent at the bottom */}
        <Legend 
          verticalAlign="bottom" 
          height={36} 
          iconType="circle" 
          className="text-xs font-medium" 
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default UsagePieChart;
