
import { useParams } from "react-router";
import { useGetSolarAnalyticsQuery, useGetSolarUnitForUserQuery } from "@/lib/redux/quary";
import { useUser } from "@clerk/clerk-react";
import CapacityGauge from "./components/CapacityGauge";
import FinancialBarChart from "./components/FinancialBarChart";
import UsagePieChart from "./components/UsagePieChart";

/**
 * AnalyticsPage: Main view for performance insights and financial metrics.
 */
const AnalyticsPage = () => {
  const { user } = useUser(); // Clerk hook to get current logged-in user details
  
  // Hook: Fetch the solar unit associated with the current user
  const { data: solarUnit, isLoading: isLoadingUnit } = useGetSolarUnitForUserQuery();
  
  // Hook: Fetch the analytics data (math, financials, charts) using the Unit ID
  // skip: ensuring the ID exists before making the API call
  const { data: analytics, isLoading: isLoadingStats } = useGetSolarAnalyticsQuery(solarUnit?._id, {
    skip: !solarUnit?._id,
  });

  // Display a loading state while either the unit or the stats are being fetched
  if (isLoadingUnit || isLoadingStats) {
    return <div className="p-8 font-medium animate-pulse">Loading analytics...</div>;
  }

  // Destructure the summary (totals) and daily (history) data from the API response
  const { summary, daily } = analytics || {};
  const totals = summary?.totals || {};

  return (
    <main className="mt-4 space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div>
        <h1 className="text-4xl font-bold text-foreground tracking-tight">Analytics Insights</h1>
        <p className="text-gray-600 mt-2 font-medium">
          Track your financial performance and energy distribution in real-time.
        </p>
      </div>

      {/* Row 1: High-Level Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Savings" 
          value={`${summary?.currency} ${totals.savings?.toLocaleString()}`} 
          description="Energy saved by internal household consumption"
        />
        <MetricCard 
          title="Potential Earnings" 
          value={`${summary?.currency} ${totals.earnings?.toLocaleString()}`} 
          description="Revenue from grid-exported energy"
        />
        <MetricCard 
          title="Grid Donation" 
          value={`${totals.gridExport?.toLocaleString()} kWh`} 
          description="Units successfully sent to the national grid"
        />
        <MetricCard 
          title="Gov Contribution" 
          value={`${totals.govtTakeUnits?.toLocaleString()} Units`} 
          description="Mandatory 5% unit contribution for infrastructure"
        />
      </div>

      {/* Row 2: Charts Row (Gauge & Bar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Efficiency Column: Shows a speed-gauge of technical performance */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">System Efficiency</h3>
          <CapacityGauge value={summary?.currentEfficiency || 0} />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400 font-bold uppercase">Health Factor</p>
            <p className="text-4xl font-extrabold text-blue-600 mt-1">{summary?.currentEfficiency}%</p>
          </div>
        </div>

        {/* Financial Column: Shows LKR Savings vs Earnings over 7 days */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Financial Performance ({summary?.currency})</h3>
          <div className="h-[300px]">
             <FinancialBarChart data={daily} />
          </div>
        </div>
      </div>

      {/* Row 3: Usage Distribution & Price Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Pie Chart: Visual breakdown of Home Consumption vs Grid Donation */}
         <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Energy Distribution</h3>
          <div className="h-[300px]">
            <UsagePieChart data={[
              { name: 'Home Usage', value: totals.homeUsage, color: '#f59e0b' }, // Solar Gold
              { name: 'Grid Export', value: totals.gridExport, color: '#3b82f6' }  // SanSolar Blue
            ]} />
          </div>
        </div>

        {/* Pricing Strategy: Contextual info on how rates are applied */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <h3 className="text-lg font-semibold mb-4">Pricing Strategy & Policy</h3>
           <div className="space-y-4">
              <div className="flex justify-between items-center p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                 <span className="font-semibold text-blue-900">Standard Grid Feed-in Rate</span>
                 <span className="text-xl font-black text-blue-600">{summary?.currency} {summary?.pricePerUnit} / Unit</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                * Note: Financial calculations are derived from real-time production stats and estimated household consumption splits (60/40) for precision monitoring.
              </p>
              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-bold text-xs uppercase text-gray-400 mb-3 tracking-widest">Mandatory Government Policy</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Under the Sri Lankan Energy Sustainability Act, a mandatory 5% unit contribution is automatically deducted as a donation to national infrastructure support for all grid-connected solar generators.
                </p>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
};

/**
 * MetricCard: Supporting component for Top-Level Metrics
 */
const MetricCard = ({ title, value, description }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
    <h4 className="text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">{title}</h4>
    <div className="text-2xl font-black text-gray-900">{value}</div>
    <p className="text-[11px] font-medium text-gray-400 mt-2">{description}</p>
  </div>
);

export default AnalyticsPage;
