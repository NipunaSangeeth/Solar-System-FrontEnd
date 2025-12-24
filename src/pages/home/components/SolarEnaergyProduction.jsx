import { useSelector } from "react-redux";
import EnergyProductionCards from "./EnergyProductionCards";
import Tab from "./Tab";
import { Button } from "@/components/ui/button";
import { getEnergyGenerationRecordsBySolarUnit } from "@/lib/api/energy-generation-record.js";
import { useEffect, useState } from "react";
import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/quary";
import { isAllOf } from "@reduxjs/toolkit";
import { ReceiptEuroIcon } from "lucide-react";
import { format, subDays, toDate } from "date-fns";

const SolarEnergyProduction = () => {
  const energyProductionData = [
    { day: "Mon", date: "Aug 18", production: 34.1, hasAnomaly: false },
    { day: "Tue", date: "Aug 19", production: 3.2, hasAnomaly: true },
    { day: "Wed", date: "Aug 20", production: 44.7, hasAnomaly: false },
    { day: "Thu", date: "Aug 21", production: 21.9, hasAnomaly: false },
    { day: "Fri", date: "Aug 22", production: 0, hasAnomaly: true },
    { day: "Sat", date: "Aug 23", production: 43, hasAnomaly: false },
    { day: "Sun", date: "Aug 24", production: 26.8, hasAnomaly: false },
  ];

  const tabs = [
    { label: "All", value: "all" },
    { label: "Anomaly", value: "anomaly" },
  ];

  const selectedTab = useSelector((state) => state.ui.selectedHomeTab);

  const { data, isLoading, isError, error } =
    useGetEnergyGenerationRecordsBySolarUnitQuery({
      id: "69499cc6f78943209105caf0",
      groupBy: "date",
    });

  if (isLoading) {
    return <div>Loading......</div>;
  }
  if (!data || isError) {
    return <div>Error: {error.message}</div>;
  }
  console.log(data)

  const newEnergyProductionData = data.slice(0, 7).map((el) => {
    return {
      day: format(toDate(el._id.date), "EEE"),
      date: format(toDate(el._id.date), "MMM d"),
      production: el.totalEnergy,
      hasAnomaly: false,
    };
  });

  const filteredEnergyProductionData = newEnergyProductionData.filter((el) => {
    if (selectedTab === "all") {
      return true;
    } else if (selectedTab === "anomaly") {
      return el.hasAnomaly;
    }
  });

  console.log(filteredEnergyProductionData);


  // const formattedData = data.map((el) => {
  //   return {
  //     ...el,
  //     timeStamp: toDate(el.timeStamp),
  //   };
  // });



  // // 2. SORT THE DATA (Newest First)
  // formattedData.sort((a, b) => b.timeStamp - a.timeStamp);

  // const latesGenerationRecord = formattedData[0];
  // const sevenDaysAgo = subDays(latesGenerationRecord.timeStamp, 6);

  // const filteredData = formattedData.filter((el) => {
  //   return el.timeStamp >= sevenDaysAgo;
  // });

  // const mappedData = filteredData.map((el) => {
  //   return {
  //     ...el,
  //     date: format(el.timeStamp, "yyyy-MM-dd"),
  //   };
  // });
  // console.log(mappedData);

  // const groupedData = {};

  // mappedData.forEach((el) => {
  //   if (groupedData[el.date]) {
  //     groupedData[el.date].push(el);
  //   } else {
  //     groupedData[el.date] = [];
  //     groupedData[el.date].push(el);
  //   }
  // });

  // const groupedDateArray = Object.entries(groupedData);
  // //console.log("Grouped date:->", groupedDateArray)

  // const calculateTotalProduction = (data) => {
  //   let total = 0;
  //   data.forEach((el) => {
  //     total += el.energyGenerated;
  //   });
  //   return total;
  // };

  // const newEnergyProductionData = groupedDateArray.map(([date, data]) => {
  //   return {
  //     day: format(toDate(date), "EEE"),
  //     date: format(toDate(date), "MMM d"),
  //     hasAnomaly: false,
  //     production: calculateTotalProduction(data),
  //   };
  // });
  // const filteredEnergyProductionData = newEnergyProductionData.filter((el) => {
  //   if (selectedTab === "all") {
  //     return true;
  //   } else if (selectedTab === "anomaly") {
  //     return el.hasAnomaly;
  //   }
  // });
  // console.log(newEnergyProductionData);

  return (
    <section className="px-12 font-[Inter] py-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Solar Energy Production</h2>
        <p className="text-gray-600">Daily energy output for the past 7 days</p>
      </div>
      <div className="mt-4 flex items-center gap-x-4">
        {tabs.map((tab) => {
          return <Tab key={tab.value} tab={tab} />;
        })}
      </div>

      <EnergyProductionCards
        energyProductionData={filteredEnergyProductionData}
      />
    </section>
  );
};

export default SolarEnergyProduction;
