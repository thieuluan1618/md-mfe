import TheKeoApp from "@/components/TheKeoApp";

export default function QRCodePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-purple-900 to-pink-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - QR Code (4 cols on lg, 12 on mobile) */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center border border-white/20 max-w-md mx-auto lg:max-w-none">
              <h1 className="text-2xl font-bold text-white mb-2 font-['Poppins']">
                Bank 🤤
              </h1>
              {/*<p className="text-white/70 mb-8">*/}
              {/*  Quét QR code để chuyển tiền*/}
              {/*</p>*/}
              
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
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 h-[800px]">
              <TheKeoApp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}