"use client";

import { useState, lazy, Suspense } from "react";
import { PanelRightOpen, PanelRightClose, Copy, Check } from "lucide-react";
import { useWeather, getWeatherTheme } from "@/hooks/useWeather";
import "react-rain-animation/lib/style.css";

// Lazy load heavy components
const TheKeoApp = lazy(() => import("@/components/TheKeoApp"));
const Rain = lazy(() => import("react-rain-animation"));
const Sunbeam = lazy(() => import("@/components/Sunbeam"));
const MoonNight = lazy(() => import("@/components/MoonNight"));
const NightRain = lazy(() => import("@/components/NightRain"));

export default function QRCodePage() {
  const [showTheKeoApp, setShowTheKeoApp] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [weatherOverride, setWeatherOverride] = useState(null);

  // Use custom weather hook
  const { weather, loading } = useWeather();

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Get current weather theme condition
  const weatherCondition = getWeatherTheme(weather, weatherOverride);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-purple-900 to-pink-900 py-8 px-4 relative overflow-hidden">
      {/* Weather Effects */}
      {!loading && (
        <Suspense fallback={null}>
          {weatherCondition === 'rain' && <Rain numDrops={100} />}
          {weatherCondition === 'sun' && <Sunbeam />}
          {weatherCondition === 'night' && <MoonNight />}
          {weatherCondition === 'night-rain' && <NightRain />}
        </Suspense>
      )}

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
                    loading="eager"
                    fetchPriority="high"
                    width="256"
                    height="256"
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
                <Suspense fallback={
                  <div className="flex items-center justify-center h-64">
                    <div className="text-white/70">Loading...</div>
                  </div>
                }>
                  <TheKeoApp />
                </Suspense>
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