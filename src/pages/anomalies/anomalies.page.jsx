import { useGetSolarUnitForUserQuery } from "@/lib/redux/quary";
import DataCard from "./components/DataCard";
import SolarWeatherWidget from "./components/SolarWeatherWidget";
import { useUser } from "@clerk/clerk-react";

const AnomaliesPage = () => {
  const { user } = useUser();

  const {
    data: solarUnit,
    isLoading: isLoadingSolarUnit,
    isError: isErrorSolarUnit,
    error: errorSolarUnit,
  } = useGetSolarUnitForUserQuery();

  if (isLoadingSolarUnit) {
    return <div>Loading...</div>;
  }

  if (isErrorSolarUnit) {
    return <div>Error: {errorSolarUnit.message}</div>;
  }

  console.log(solarUnit);

  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">{user?.firstName}</h1>
      <p className="text-gray-600 mt-2">
        Monitor anomalies in your solar unit 
      </p>{" "}
      {/* <div className="mt-4">
        <SolarWeatherWidget />
      </div> */}
      <div className="mt-8">
        <DataCard
          solarUnitId={solarUnit._id}
          title="Last 7 Days Energy Production"
        />
      </div>

    </main>
  );
};

export default AnomaliesPage;
