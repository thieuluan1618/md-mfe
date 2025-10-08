"use client";

import { useState, lazy, Suspense } from "react";
import { PanelRightOpen, PanelRightClose, Copy, Check, UserPlus, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useWeather, getWeatherTheme } from "@/hooks/useWeather";
import { useDeviceOrientation } from '@/hooks/useDeviceOrientation';
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
  const [currentFriendIndex, setCurrentFriendIndex] = useState(0);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { orientation, requestPermission, permissionState } = useDeviceOrientation();

  // Friends data - can be extended to add more friends
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "Luân",
      bankName: "Cake",
      accountNumber: "0333649559",
      accountName: "Nguyen Thieu Luan",
      qrCodeUrl: "/QRCode.svg",
    },
    // Add more friends here
  ]);

  // Use custom weather hook
  const { weather, loading } = useWeather();

  const currentFriend = friends[currentFriendIndex];

  const nextFriend = () => {
    setCurrentFriendIndex((prev) => (prev + 1) % friends.length);
  };

  const prevFriend = () => {
    setCurrentFriendIndex((prev) => (prev - 1 + friends.length) % friends.length);
  };

  const addFriend = (newFriend) => {
    const friend = {
      ...newFriend,
      id: Date.now(), // Simple ID generation
    };
    setFriends([...friends, friend]);
    setCurrentFriendIndex(friends.length); // Switch to newly added friend
    setShowAddFriend(false);
  };

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

  if (permissionState === 'prompt') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-purple-900 to-pink-900 py-8 px-4 relative overflow-hidden flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-4">Device Orientation Access</h1>
        <p className="text-white/80 mb-8 text-center">This feature requires access to your device's orientation sensors.</p>
        <button
          onClick={requestPermission}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-lg transition-all border border-white/20 shadow-lg"
        >
          Enable Orientation
        </button>
      </div>
    );
  }

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

              {/* Header with friend navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevFriend}
                  disabled={friends.length <= 1}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Bạn trước"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <div className="flex flex-col items-center">
                  <h1 className="text-2xl font-bold text-white font-['Poppins']">
                    {currentFriend.name}
                  </h1>
                  {friends.length > 1 && (
                    <span className="text-xs text-white/50 mt-1">
                      {currentFriendIndex + 1} / {friends.length}
                    </span>
                  )}
                </div>

                <button
                  onClick={nextFriend}
                  disabled={friends.length <= 1}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Bạn tiếp"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* QR Code */}
              <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/20">
                <div className="w-64 h-64 bg-white rounded-lg mx-auto flex items-center justify-center">
                  <img
                    src={currentFriend.qrCodeUrl}
                    alt={`${currentFriend.name} QR code`}
                    className="w-full h-full object-contain rounded-lg"
                    loading="eager"
                    fetchPriority="high"
                    width="256"
                    height="256"
                  />
                </div>
              </div>

              {/* Bank Details */}
              <div className="space-y-3 text-sm text-white/90 bg-white/5 rounded-lg p-4 border border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Ngân hàng:</span>
                  <button
                    onClick={() => copyToClipboard(currentFriend.bankName, 'bank')}
                    className="flex items-center gap-2 font-medium text-[#8b5cf6] hover:text-[#7c3aed] transition-colors cursor-pointer group"
                  >
                    <span>{currentFriend.bankName}</span>
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
                    onClick={() => copyToClipboard(currentFriend.accountNumber, 'account')}
                    className="flex items-center gap-2 font-medium text-[#ec4899] hover:text-[#db2777] transition-colors cursor-pointer group"
                  >
                    <span>{currentFriend.accountNumber}</span>
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
                    onClick={() => copyToClipboard(currentFriend.accountName, 'name')}
                    className="flex items-center gap-2 font-medium text-white hover:text-white/80 transition-colors cursor-pointer group"
                  >
                    <span>{currentFriend.accountName}</span>
                    {copiedField === 'name' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
              </div>

              {/* Add QR Code Button */}
              <button
                onClick={() => setShowAddFriend(true)}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-medium transition-all shadow-lg"
              >
                <UserPlus className="w-5 h-5" />
                <span>Thêm QR Code</span>
              </button>

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

      {/* Add Friend Modal */}
      {showAddFriend && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 w-full max-w-md p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Thêm bạn mới</h2>
              <button
                onClick={() => setShowAddFriend(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                addFriend({
                  name: formData.get('name'),
                  bankName: formData.get('bankName'),
                  accountNumber: formData.get('accountNumber'),
                  accountName: formData.get('accountName'),
                  qrCodeUrl: formData.get('qrCodeUrl') || '/QRCode.svg',
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Tên hiển thị
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="VD: Thanh"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Ngân hàng
                </label>
                <input
                  type="text"
                  name="bankName"
                  required
                  placeholder="VD: VCB, ACB, MBBank..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Số tài khoản
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  required
                  placeholder="VD: 0123456789"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Tên chủ tài khoản
                </label>
                <input
                  type="text"
                  name="accountName"
                  required
                  placeholder="VD: NGUYEN VAN A"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  URL QR Code (tùy chọn)
                </label>
                <input
                  type="text"
                  name="qrCodeUrl"
                  placeholder="VD: /qr-thanh.svg"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <p className="text-xs text-white/50 mt-1">
                  Để trống sẽ dùng QR mặc định
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddFriend(false)}
                  className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all shadow-lg"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {orientation && (
        <div className="fixed bottom-20 left-4 z-50 bg-white/10 backdrop-blur-lg rounded-lg p-2 border border-white/20 shadow-lg text-white text-xs">
          <p>Alpha: {orientation.alpha?.toFixed(2)}</p>
          <p>Beta: {orientation.beta?.toFixed(2)}</p>
          <p>Gamma: {orientation.gamma?.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}