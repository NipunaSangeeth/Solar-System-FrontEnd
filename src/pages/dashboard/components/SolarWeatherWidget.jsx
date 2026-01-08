
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CloudSun, Wind, Thermometer, Sunrise } from "lucide-react";
import { useGeoLocation } from "@/hooks/useGeoLocation";

const SolarWeatherWidget = () => {
  const location = useGeoLocation();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (location.loaded && location.coordinates.lat) {
      const { lat, lng } = location.coordinates;

      const fetchWeather = async () => {
        try {
          // Open-Meteo URL (No API Key needed!)
          // We request: Current Temp, Cloud Cover, Wind Speed + Daily Sunrise/Sunset
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,cloud_cover,wind_speed_10m&daily=sunrise,sunset&timezone=auto`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }

          const data = await response.json();
          setWeather(data);
        } catch (error) {
          console.error("Error fetching weather:", error);
          setErrorMsg(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchWeather();
    }
  }, [location]);

  // Helper to format full ISO dates (e.g. "2025-12-01T06:00") into simple time "06:00 AM"
  const formatTime = (isoString) => {
    if (!isoString) return "--:--";
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="text-white p-4">Loading Weather...</div>;
  if (errorMsg) return <div className="text-red-400 p-4">Error: {errorMsg}</div>;
  if (!weather) return null;

  // Open-Meteo separates "current" and "daily" data
  const current = weather.current;
  const daily = weather.daily;

  return (
    <div className="w-full max-w-4xl border border-card-foreground ml-14 mx-auto space-y-4 font-[Inter]">
      
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl border border-blue-300 bg-blue-400 p-6 backdrop-blur-md shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex items-center justify-between text-white">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Weather Conditions</h2>
            <p className="text-sm text-blue-100/80">
              {/* Open-Meteo uses timezone strings like "Asia/Colombo" */}
              Location: {weather.timezone.split("/")[1].replace("_", " ")}
            </p>
          </div>
          <CloudSun className="w-12 h-12 text-yellow-300 drop-shadow-lg" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Temperature */}
        <div className="relative overflow-hidden rounded-xl border border-blue-300 bg-blue-200 p-6 backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02]">
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 shadow-inner">
              <Thermometer className="h-6 w-6 text-blue-200" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white drop-shadow-md">
                {Math.round(current.temperature_2m)}°C
              </h3>
              <p className="text-xs font-medium text-orange-600">Temperature</p>
            </div>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="relative overflow-hidden rounded-xl border border-blue-300 bg-blue-200 p-6 backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02]">
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/20 shadow-inner">
              <Wind className="h-6 w-6 text-gray-200" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white drop-shadow-md">
                {current.wind_speed_10m} <span className="text-sm">km/h</span>
              </h3>
              <p className="text-xs font-medium text-blue-100/70">Wind Speed</p>
            </div>
          </div>
        </div>

        {/* Cloud Cover */}
        <div className="relative overflow-hidden rounded-xl border border-blue-300 bg-blue-200 p-6 backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02]">
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20 shadow-inner">
              <CloudSun className="h-6 w-6 text-yellow-200" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white drop-shadow-md">
                {current.cloud_cover}%
              </h3>
              <p className="text-xs font-medium text-white">Cloud Cover</p>
            </div>
          </div>
        </div>

        {/* Sunrise */}
        <div className="relative overflow-hidden rounded-xl border border-blue-300 bg-blue-200 p-6 backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02]">
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 shadow-inner">
              <Sunrise className="h-6 w-6 text-orange-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white drop-shadow-md">
                {/* [0] gets today's sunrise */}
                {formatTime(daily.sunrise[0])}
              </h3>
              <p className="text-xs font-medium text-blue-100/70">Sunrise</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SolarWeatherWidget;