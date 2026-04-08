
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";

/**
 * CapacityGauge: The Technical Efficiency Meter
 * Purpose: A Radial Bar chart that acts like a speedometer/gauge 
 * to show current capacity factor performance.
 */
const CapacityGauge = ({ value }) => {
  // Format the raw numerical value into an array format that Recharts expects
  const data = [
    {
      name: "Efficiency",
      value: value,
      fill: "#f59e0b", // Uses Solar Gold
    },
  ];

  return (
    <div className="h-[200px] w-full flex items-center justify-center relative">
      <ResponsiveContainer width="100%" height="100%">
        {/* RadialBarChart creates the circular progress look */}
        <RadialBarChart
          cx="50%" // Center position
          cy="50%"
          innerRadius="70%" // Large hole in the center
          outerRadius="100%" // Outer boundary
          barSize={10} // Thickness of the progress bar
          data={data}
          startAngle={180} // Starts at the left (9 o'clock)
          endAngle={0}     // Ends at the right (3 o'clock) for a half-meter look
        >
          {/* PolarAngleAxis acts as the 0-100 hidden track background */}
          <PolarAngleAxis
            type="number"
            domain={[0, 100]} // Sets the gauge range from 0 to 100%
            angleAxisId={0}
            tick={false} // Hides degree markings
          />
          
          {/* The actual progress bar colored in Solar Gold */}
          <RadialBar
            minAngle={15}
            background // Shows the light-gray track behind the gold progress
            clockWise // Animation direction
            dataKey="value" // Links to the 'value' property in our data object
            cornerRadius={10} // Rounded tips for a modern feel
          />
        </RadialBarChart>
      </ResponsiveContainer>
      
      {/* Centered Label inside the gauge */}
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Performance</span>
      </div>
    </div>
  );
};

export default CapacityGauge;
