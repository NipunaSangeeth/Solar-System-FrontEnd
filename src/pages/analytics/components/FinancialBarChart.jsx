
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

/**
 * FinancialBarChart: Visualizes monetary savings vs earnings
 * Purpose: A Stacked Bar Chart showing income generated in LKR.
 */
const FinancialBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        {/* Adds horizontal grid lines for scaling, purely stylistic */}
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
        
        {/* X-Axis: Represents Time (Dates) */}
        <XAxis 
          dataKey="date" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 500 }}
          tickFormatter={(str) => {
            const date = new Date(str);
            // Formats date string to 'Mon', 'Tue', etc.
            return date.toLocaleDateString('en-US', { weekday: 'short' });
          }}
        />
        
        {/* Y-Axis: Represents Money in LKR */}
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 500 }}
          tickFormatter={(value) => `LKR ${value}`}
        />
        
        {/* Tooltip: Shows details on bar hover */}
        <Tooltip 
          cursor={{ fill: '#f9fafb' }}
          contentStyle={{ 
            backgroundColor: '#fff', 
            borderRadius: '12px', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
          }}
        />
        
        {/* Legend: Displays color identifiers at the top right */}
        <Legend verticalAlign="top" align="right" height={40} iconType="circle" />
        
        {/* Bar 1: Savings (Solar Gold) */}
        <Bar dataKey="savings" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Home Savings" />
        
        {/* Bar 2: Earnings (SanSolar Blue) */}
        <Bar dataKey="earnings" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Grid Revenue" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FinancialBarChart;
