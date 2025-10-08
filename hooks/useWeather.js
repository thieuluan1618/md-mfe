import { useState, useEffect } from "react";

/**
 * Custom hook to fetch and manage weather data with automatic refresh
 * @param {number} refreshInterval - Refresh interval in milliseconds (default: 5 minutes)
 * @returns {Object} { weather, loading, weatherCondition }
 */
export function useWeather(refreshInterval = 5 * 60 * 1000) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch weather data from Open-Meteo API
    const fetchWeather = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const data = await response.json();

        if (data.current_weather) {
          setWeather(data.current_weather);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch weather:', error);
        setLoading(false);
      }
    };

    // Get user location and set up weather fetching
    const getUserLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          // Success callback
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);

            // Set up interval to refresh weather
            const intervalId = setInterval(() => {
              fetchWeather(latitude, longitude);
            }, refreshInterval);

            return () => clearInterval(intervalId);
          },
          // Error callback - fallback to Ho Chi Minh City
          (error) => {
            console.log('Location permission denied or error, using HCM as fallback:', error.message);
            // Coordinates for Ho Chi Minh City: 10.8231° N, 106.6297° E
            const hcmLat = 10.8231;
            const hcmLng = 106.6297;
            fetchWeather(hcmLat, hcmLng);

            // Set up interval for fallback location
            const intervalId = setInterval(() => {
              fetchWeather(hcmLat, hcmLng);
            }, refreshInterval);

            return () => clearInterval(intervalId);
          },
          // Options
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } else {
        // Geolocation not supported, fallback to Ho Chi Minh City
        console.log('Geolocation not supported, using HCM as fallback');
        const hcmLat = 10.8231;
        const hcmLng = 106.6297;
        fetchWeather(hcmLat, hcmLng);

        // Set up interval for fallback location
        const intervalId = setInterval(() => {
          fetchWeather(hcmLat, hcmLng);
        }, refreshInterval);

        return () => clearInterval(intervalId);
      }
    };

    const cleanup = getUserLocation();

    // Return cleanup function
    return cleanup;
  }, [refreshInterval]);

  return { weather, loading };
}

/**
 * Get weather condition theme based on weather data
 * @param {Object} weather - Weather data from API
 * @param {string} override - Manual override for weather theme
 * @returns {string} Weather condition: 'sun', 'rain', 'night', 'night-rain'
 */
export function getWeatherTheme(weather, override = null) {
  // User override takes priority
  if (override) return override;

  if (!weather) return null;

  const code = weather.weathercode;
  const isDay = weather.is_day === 1;

  // Rain codes: drizzle, rain, showers, thunderstorm
  // WMO codes: 51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99
  const rainCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99];

  // If it's raining
  if (rainCodes.includes(code)) {
    return isDay ? 'rain' : 'night-rain';
  }

  // If it's nighttime (sun has set)
  if (!isDay) {
    return 'night';
  }

  // Daytime and clear/cloudy weather
  return 'sun';
}
