import { useState, useEffect } from "react";

export const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    error: null,
  });

  const onSuccess = (position) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      error: null,
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      coordinates: { lat: "6.9271", lng: "79.8612" }, // Default: Colombo fallback
      error: error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
      return
    }
// get the Initial possition 
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    //Location changing 
    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, {
      nableHighAccuracy: false,
      maximumAge: 60000, // Cache position for 1 minute
      timeout: 10000, // Wait up to 10 seconds
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return location;
};