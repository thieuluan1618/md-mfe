"use client";

import { useState, useRef } from "react";

export default function QRCodeUploader() {
  const [qrImage, setQrImage] = useState(null);
  const [bankInfo, setBankInfo] = useState({
    bankName: "Your Bank Name",
    accountNumber: "****1234",
    accountName: "Your Name"
  });
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setQrImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBankInfoChange = (field, value) => {
    setBankInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-xl p-6">
        <div 
          className="w-64 h-64 bg-white rounded-lg mx-auto flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {qrImage ? (
            <img 
              src={qrImage} 
              alt="Bank QR Code" 
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-2">📱</div>
              <p className="text-sm text-gray-500">
                Click to upload QR code
              </p>
              <p className="text-xs text-gray-400 mt-2">
                PNG, JPG, or GIF
              </p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bank Name
          </label>
          <input
            type="text"
            value={bankInfo.bankName}
            onChange={(e) => handleBankInfoChange('bankName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Number (last 4 digits)
          </label>
          <input
            type="text"
            value={bankInfo.accountNumber}
            onChange={(e) => handleBankInfoChange('accountNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Name
          </label>
          <input
            type="text"
            value={bankInfo.accountName}
            onChange={(e) => handleBankInfoChange('accountName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="space-y-3 text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between">
          <span>Bank:</span>
          <span className="font-medium">{bankInfo.bankName}</span>
        </div>
        <div className="flex justify-between">
          <span>Account:</span>
          <span className="font-medium">{bankInfo.accountNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>Name:</span>
          <span className="font-medium">{bankInfo.accountName}</span>
        </div>
      </div>
    </div>
  );
}