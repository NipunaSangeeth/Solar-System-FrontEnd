// import { Card } from "@/components/ui/card";
// import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/quary";
// import { format, toDate } from "date-fns";
// import React from "react";

// const DashboardPage = () => {
//   const { data, isLoading, isError, error } =
//     useGetEnergyGenerationRecordsBySolarUnitQuery({
//       id: "69499cc6f78943209105caf0",
//       groupBy: "date",
//     });

//   // Early return Gurd clouse
//   if (isLoading) return null;
//   if (isError || !data) return null;

//   console.log(data);

//   return (
//     <main className="mt-4">
//       <h1 className="text-4xl font-bold text-foreground">Alice's House</h1>
//       <div className="mt-8">
//         <Card className="rounded-md p-4">
//           <h2 className="text-xl font-medium text-foreground">
//             Last 7 Days Energy Production
//           </h2>
//           <div className="grid grid-cols-7 gap-4 mt-4">
//             {data.slice(0,7).map((el, index) => {
//                return(
//               <div
//                 key={el._id.date}
//                 className="col-span-1 px-2 py-1 hover:bg-gray-100"
//               >
//                 <div className="flex flex-col items-center justify-center">
//                   <h3 className="text-xs text-gray-500 font-medium">{format(toDate(el._id.date), "MMM d")}</h3>
//                   <p className="text-lg font-semibold text-foreground">
//                     {el.totalEnergy}
//                   </p>
//                 </div>
//               </div> 
//               )
//             })}
//           </div>
//         </Card>
//       </div>
//     </main>
//   );
// };

// export default DashboardPage;



import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/quary";
import DataCard from "./components/DataCard";
import DataChart from "./components/DataChart";
import SolarWeatherWidget from "./components/SolarWeatherWidget";

const DashboardPage = () => {
  const { data, isLoading, isError, error } =
    useGetEnergyGenerationRecordsBySolarUnitQuery({
      id: "68f4f2cef076449e2049b9c1",
      groupBy: "date",
    });

  if (isError || !data) return null;

  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">Alice's House</h1>
      <p className="text-gray-600 mt-2">Welcome back to your Solar Energy Production Dashboard</p>
      <div className="mt-8">
        <DataCard
          data={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          title="Last 7 Days Energy Production"
        />
      </div>
      <div className="mt-4">
      <SolarWeatherWidget />

      </div>
      <div className="mt-8">
        <DataChart
          data={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      </div>
    </main>
  );
};

export default DashboardPage;
