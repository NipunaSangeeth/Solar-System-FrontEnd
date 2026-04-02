
// import React, { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { CloudSun, Wind, Thermometer, Sunrise } from "lucide-react";
// import { useGeoLocation } from "@/hooks/useGeoLocation";

// const SolarWeatherWidget = () => {
//   const location = useGeoLocation();
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     if (location.loaded && location.coordinates.lat) {
//       const { lat, lng } = location.coordinates;

//       const fetchWeather = async () => {
//         try {
//           // Open-Meteo URL (No API Key needed!)
//           // We request: Current Temp, Cloud Cover, Wind Speed + Daily Sunrise/Sunset
//           const response = await fetch(
//             `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,cloud_cover,wind_speed_10m&daily=sunrise,sunset&timezone=auto`
//           );

//           if (!response.ok) {
//             throw new Error("Failed to fetch weather data");
//           }

//           const data = await response.json();
//           setWeather(data);
//         } catch (error) {
//           console.error("Error fetching weather:", error);
//           setErrorMsg(error.message);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchWeather();
//     }
//   }, [location]);

//   // Helper to format full ISO dates (e.g. "2025-12-01T06:00") into simple time "06:00 AM"
//   const formatTime = (isoString) => {
//     if (!isoString) return "--:--";
//     const date = new Date(isoString);
//     return date.toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (loading) return <div className="text-white p-4">Loading Weather...</div>;
//   if (errorMsg) return <div className="text-red-400 p-4">Error: {errorMsg}</div>;
//   if (!weather) return null;

//   // Open-Meteo separates "current" and "daily" data
//   const current = weather.current;
//   const daily = weather.daily;

//   return (
//     <div className="w-full max-w-4xl border border-card-foreground ml-14 mx-auto space-y-4 font-[Inter]">
      
//       {/* Header */}
//       <div className="relative overflow-hidden rounded-xl border border-blue-300 bg-blue-400 p-6 backdrop-blur-md shadow-lg">
//         <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        
//         <div className="relative z-10 flex items-center justify-between text-white">
//           <div>
//             <h2 className="text-2xl font-bold tracking-tight">Weather Conditions</h2>
//             <p className="text-sm text-blue-100/80">
//               {/* Open-Meteo uses timezone strings like "Asia/Colombo" */}
//               Location: {weather.timezone.split("/")[1].replace("_", " ")}
//             </p>
//           </div>
//           <CloudSun className="w-12 h-12 text-yellow-300 drop-shadow-lg" />
//         </div>
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
//         {/* Temperature */}
//         <div className="relative overflow-hidden rounded-xl border border-blue-300 bg-blue-200 p-6 backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02]">
//           <div className="relative z-10 flex items-center gap-4">
//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 shadow-inner">
//               <Thermometer className="h-6 w-6 text-blue-200" />
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold text-white drop-shadow-md">
//                 {Math.round(current.temperature_2m)}°C
//               </h3>
//               <p className="text-xs font-medium text-orange-600">Temperature</p>
//             </div>
//           </div>
//         </div>

//         {/* Wind Speed */}
//         <div className="relative overflow-hidden rounded-xl border border-blue-300 bg-blue-200 p-6 backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02]">
//           <div className="relative z-10 flex items-center gap-4">
//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/20 shadow-inner">
//               <Wind className="h-6 w-6 text-gray-200" />
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold text-white drop-shadow-md">
//                 {current.wind_speed_10m} <span className="text-sm">km/h</span>
//               </h3>
//               <p className="text-xs font-medium text-blue-100/70">Wind Speed</p>
//             </div>
//           </div>
//         </div>

//         {/* Cloud Cover */}
//         <div className="relative overflow-hidden rounded-xl border border-blue-300 bg-blue-200 p-6 backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02]">
//           <div className="relative z-10 flex items-center gap-4">
//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20 shadow-inner">
//               <CloudSun className="h-6 w-6 text-yellow-200" />
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold text-white drop-shadow-md">
//                 {current.cloud_cover}%
//               </h3>
//               <p className="text-xs font-medium text-white">Cloud Cover</p>
//             </div>
//           </div>
//         </div>

//         {/* Sunrise */}
//         <div className="relative overflow-hidden rounded-xl border border-blue-300 bg-blue-200 p-6 backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02]">
//           <div className="relative z-10 flex items-center gap-4">
//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 shadow-inner">
//               <Sunrise className="h-6 w-6 text-orange-200" />
//             </div>
//             <div>
//               <h3 className="text-lg font-bold text-white drop-shadow-md">
//                 {/* [0] gets today's sunrise */}
//                 {formatTime(daily.sunrise[0])}
//               </h3>
//               <p className="text-xs font-medium text-blue-100/70">Sunrise</p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default SolarWeatherWidget;

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CloudSun,
  Wind,
  Thermometer,
  Sunrise,
  Sunset,
  Droplets,
  Sun,
  Gauge,
} from "lucide-react";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { useGetWeatherQuery } from "@/lib/redux/quary";

const SolarWeatherWidget = () => {
  const location = useGeoLocation();

  const {
    data: weather,
    isLoading,
    isError,
    error,
  } = useGetWeatherQuery(
    {
      lat: location.coordinates.lat,
      lng: location.coordinates.lng,
    },
    {
      // Only fetch when geolocation is ready
      skip: !location.loaded || !location.coordinates.lat,
    }
  );

  // Loading skeleton
  if (!location.loaded || isLoading) {
    return (
      <div className="space-y-4 font-[Inter]">
        <Skeleton className="h-56 w-full rounded-2xl" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="p-6 text-destructive font-[Inter]">
        <p className="font-semibold">Weather data unavailable</p>
        <p className="text-sm text-muted-foreground mt-1">
          {error?.data?.message || "Failed to fetch weather data. Please try again."}
        </p>
      </Card>
    );
  }

  if (!weather) return null;

  // Solar efficiency color based on rating
  const getEfficiencyColor = (percent) => {
    if (percent >= 80) return "text-green-400";
    if (percent >= 60) return "text-lime-400";
    if (percent >= 40) return "text-yellow-400";
    if (percent >= 20) return "text-orange-400";
    return "text-red-400";
  };

  const getRatingBadgeColor = (rating) => {
    const colors = {
      Excellent: "bg-green-500/20 text-green-300 border-green-500/30",
      Good: "bg-lime-500/20 text-lime-300 border-lime-500/30",
      Moderate: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      Fair: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      Poor: "bg-red-500/20 text-red-300 border-red-500/30",
    };
    return colors[rating] || colors.Moderate;
  };

  return (
    <div className="space-y-4 font-[Inter]">
      {/* ── Main Weather Card with Solar Panel Background ── */}
      <div className="relative overflow-hidden rounded-2xl min-h-[220px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/images/solar-farm.jpg')`,
          }}
        />
        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

        {/* Content */}
        <div className="relative z-10 p-6 flex flex-col justify-between h-full min-h-[220px]">
          {/* Top Row: Location + Solar Context Badge */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Weather Conditions
              </h2>
              <p className="text-sm text-white/70 mt-1">
                📍 {weather.location}
              </p>
            </div>
            <div
              className={`px-3 py-1.5 rounded-full border text-sm font-semibold ${getRatingBadgeColor(
                weather.solarContext.rating
              )}`}
            >
              {weather.solarContext.emoji} {weather.solarContext.rating}
            </div>
          </div>

          {/* Bottom Row: Weather Metrics Inline */}
          <div className="flex flex-wrap items-end gap-6 mt-8">
            {/* Temperature */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
                <Thermometer className="h-5 w-5 text-orange-300" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {weather.current.temperature}°C
                </p>
                <p className="text-xs text-white/60">Temperature</p>
              </div>
            </div>

            {/* Wind Speed */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                <Wind className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {weather.current.windSpeed}{" "}
                  <span className="text-sm font-normal">km/h</span>
                </p>
                <p className="text-xs text-white/60">Wind Speed</p>
              </div>
            </div>

            {/* Cloud Cover */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-500/20">
                <CloudSun className="h-5 w-5 text-yellow-300" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {weather.current.cloudCover}%
                </p>
                <p className="text-xs text-white/60">Cloud Cover</p>
              </div>
            </div>

            {/* Humidity */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20">
                <Droplets className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {weather.current.humidity}%
                </p>
                <p className="text-xs text-white/60">Humidity</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Solar Production Context Card ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Solar Efficiency Gauge */}
        <Card className="p-5 flex flex-col items-center justify-center gap-3 border-border">
          <div className="relative flex items-center justify-center">
            <div className="h-24 w-24 rounded-full border-4 border-muted flex items-center justify-center">
              <span
                className={`text-3xl font-bold ${getEfficiencyColor(
                  weather.solarContext.efficiencyPercent
                )}`}
              >
                {weather.solarContext.efficiencyPercent}%
              </span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">
              Solar Efficiency
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {weather.solarContext.description}
            </p>
          </div>
        </Card>

        {/* Sunrise & Sunset */}
        <Card className="p-5 border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sun className="h-4 w-4 text-amber-500" />
            Daylight Hours
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sunrise className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-muted-foreground">Sunrise</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {weather.daily.sunrise}
              </span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sunset className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-muted-foreground">Sunset</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {weather.daily.sunset}
              </span>
            </div>
            {weather.daily.uvIndexMax !== null && (
              <>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">
                      UV Index
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {weather.daily.uvIndexMax}
                  </span>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Solar Production Recommendation */}
        <Card className="p-5 border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Gauge className="h-4 w-4 text-primary" />
            Production Forecast
          </h3>
          <div className="space-y-3">
            {/* Visual efficiency bar */}
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>Current Efficiency</span>
                <span className="font-medium">
                  {weather.solarContext.efficiencyPercent}%
                </span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${weather.solarContext.efficiencyPercent}%`,
                    background:
                      weather.solarContext.efficiencyPercent >= 60
                        ? "linear-gradient(90deg, #22c55e, #84cc16)"
                        : weather.solarContext.efficiencyPercent >= 30
                        ? "linear-gradient(90deg, #eab308, #f97316)"
                        : "linear-gradient(90deg, #ef4444, #f97316)",
                  }}
                />
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Rating breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Cloud Impact</span>
                <span className="font-medium text-foreground">
                  {weather.current.cloudCover < 30
                    ? "Minimal"
                    : weather.current.cloudCover < 60
                    ? "Moderate"
                    : "Significant"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Heat Factor</span>
                <span className="font-medium text-foreground">
                  {weather.current.temperature > 35
                    ? "High Loss"
                    : weather.current.temperature > 25
                    ? "Minor Loss"
                    : "Optimal"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall</span>
                <span
                  className={`font-bold ${getEfficiencyColor(
                    weather.solarContext.efficiencyPercent
                  )}`}
                >
                  {weather.solarContext.rating}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SolarWeatherWidget;