"use client";

import { useState } from "react";
import TheKeoApp from "@/components/TheKeoApp";
import { PanelRightOpen, PanelRightClose } from "lucide-react";

export default function QRCodePage() {
  const [showTheKeoApp, setShowTheKeoApp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-purple-900 to-pink-900 py-8 px-4">
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
                <div className="flex justify-between">
                  <span className="text-white/70">Ngân hàng:</span>
                  <span className="font-medium text-[#8b5cf6]">Cake</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Số tài khoản:</span>
                  <span className="font-medium text-[#ec4899]">0333649559</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Tên:</span>
                  <span className="font-medium text-white">Nguyen Thieu Luan</span>
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
    </div>
  );
}