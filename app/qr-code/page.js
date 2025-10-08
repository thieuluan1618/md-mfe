"use client";

import { useState, useEffect } from "react";
import TheKeoApp from "@/components/TheKeoApp";
import { PanelRightOpen, PanelRightClose, Copy, Check } from "lucide-react";
import Rain from "react-rain-animation";
import Sunbeam from "@/components/Sunbeam";
import MoonNight from "@/components/MoonNight";
import NightRain from "@/components/NightRain";
import "react-rain-animation/lib/style.css";

export default function QRCodePage() {
  const [showTheKeoApp, setShowTheKeoApp] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherOverride, setWeatherOverride] = useState(null);

  useEffect(() => {
    // Get user location and fetch weather
    const fetchWeather = async (latitude, longitude) => {
      try {
        // Using Open-Meteo API (free, no API key needed)
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

    // Request user location
    const getUserLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          // Success callback
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);

            // Set up 5-minute interval to refresh weather
            const intervalId = setInterval(() => {
              fetchWeather(latitude, longitude);
            }, 5 * 60 * 1000); // 5 minutes in milliseconds

            // Store interval ID for cleanup
            return () => clearInterval(intervalId);
          },
          // Error callback - fallback to Ho Chi Minh City
          (error) => {
            console.log('Location permission denied or error, using HCM as fallback:', error.message);
            // Coordinates for Ho Chi Minh City: 10.8231° N, 106.6297° E
            fetchWeather(10.8231, 106.6297);

            // Set up 5-minute interval to refresh weather for fallback location
            const intervalId = setInterval(() => {
              fetchWeather(10.8231, 106.6297);
            }, 5 * 60 * 1000);

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
        fetchWeather(10.8231, 106.6297);

        // Set up 5-minute interval to refresh weather for fallback location
        const intervalId = setInterval(() => {
          fetchWeather(10.8231, 106.6297);
        }, 5 * 60 * 1000);

        return () => clearInterval(intervalId);
      }
    };

    const cleanup = getUserLocation();

    // Return cleanup function
    return cleanup;
  }, []);

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Determine weather conditions based on weather code and time of day
  // Weather codes from Open-Meteo: https://open-meteo.com/en/docs
  const getWeatherCondition = () => {
    // User override takes priority
    if (weatherOverride) return weatherOverride;

    if (!weather) return null;
    const code = weather.weathercode;
    const isDay = weather.is_day === 1;

    // Rain codes: 51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-purple-900 to-pink-900 py-8 px-4 relative overflow-hidden">
      {/* Weather Effects */}
      {!loading && getWeatherCondition() === 'rain' && <Rain numDrops={100} />}
      {!loading && getWeatherCondition() === 'sun' && <Sunbeam />}
      {!loading && getWeatherCondition() === 'night' && <MoonNight />}
      {!loading && getWeatherCondition() === 'night-rain' && <NightRain />}

      {/* Toggle Button */}
      <button
        onClick={() => setShowTheKeoApp(!showTheKeoApp)}
        className="fixed top-4 right-4 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-lg transition-all border border-white/20 shadow-lg"
        title={showTheKeoApp ? "Ẩn TheKeo App" : "Hiện TheKeo App"}
      >
        {showTheKeoApp ? (
          <PanelRightClose className="w-5 h-5" />
        ) : (
          <PanelRightOpen className="w-5 h-5" />
        )}
      </button>

      <div className="max-w-7xl mx-auto">
        <div className={` ${showTheKeoApp ? 'grid grid-cols-12 gap-8':''}`}>
          {/* Left Column - QR Code (4 cols on lg, 12 on mobile) */}
          <div className={`${showTheKeoApp ? 'col-span-12 lg:col-span-4' : ''} transition-all duration-300`}>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center border border-white/20 mx-auto lg:max-w-xl sm:max-w-none">
              <h1 className="text-2xl font-bold text-white mb-2 font-['Poppins']">
                Bank 🤤
              </h1>
              
              <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/20">
                <div className="w-64 h-64 bg-white rounded-lg mx-auto flex items-center justify-center">
                  <img 
                    src="/QRCode.svg"
                    alt="Bank QRcode" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-3 text-sm text-white/90 bg-white/5 rounded-lg p-4 border border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Ngân hàng:</span>
                  <button
                    onClick={() => copyToClipboard('Cake', 'bank')}
                    className="flex items-center gap-2 font-medium text-[#8b5cf6] hover:text-[#7c3aed] transition-colors cursor-pointer group"
                  >
                    <span>Cake</span>
                    {copiedField === 'bank' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Số tài khoản:</span>
                  <button
                    onClick={() => copyToClipboard('0333649559', 'account')}
                    className="flex items-center gap-2 font-medium text-[#ec4899] hover:text-[#db2777] transition-colors cursor-pointer group"
                  >
                    <span>0333649559</span>
                    {copiedField === 'account' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Tên:</span>
                  <button
                    onClick={() => copyToClipboard('Nguyen Thieu Luan', 'name')}
                    className="flex items-center gap-2 font-medium text-white hover:text-white/80 transition-colors cursor-pointer group"
                  >
                    <span>Nguyen Thieu Luan</span>
                    {copiedField === 'name' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - TheKeo App (8 cols on lg, 12 on mobile) */}
          {showTheKeoApp && (
            <div className="col-span-12 lg:col-span-8 animate-in fade-in slide-in-from-right duration-300">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 h-full">
                <TheKeoApp />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Weather Theme Toggle */}
      <div className="fixed bottom-4 right-4 z-50 bg-white/10 backdrop-blur-lg rounded-lg p-2 border border-white/20 shadow-lg">
        <div className="flex gap-2">
          {/* <button
            onClick={() => setWeatherOverride(null)}
            className={`p-2 rounded-lg text-xl transition-all ${
              !weatherOverride
                ? 'bg-white/30 shadow-lg scale-110'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            🌍
          </button> */}
          <button
            onClick={() => setWeatherOverride('sun')}
            className={`p-2 rounded-lg text-xl transition-all ${
              weatherOverride === 'sun'
                ? 'bg-yellow-500/80 shadow-lg scale-110'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            ☀️
          </button>
          <button
            onClick={() => setWeatherOverride('rain')}
            className={`p-2 rounded-lg text-xl transition-all ${
              weatherOverride === 'rain'
                ? 'bg-blue-500/80 shadow-lg scale-110'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            🌧️
          </button>
          <button
            onClick={() => setWeatherOverride('night')}
            className={`p-2 rounded-lg text-xl transition-all ${
              weatherOverride === 'night'
                ? 'bg-purple-500/80 shadow-lg scale-110'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            🌙
          </button>
        </div>
      </div>
    </div>
  );
}