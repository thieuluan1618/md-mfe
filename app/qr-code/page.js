export default function QRCodePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <p className="text-gray-600 mb-8">
            Scan the QRcode to send money
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="w-64 h-64 bg-white rounded-lg mx-auto flex items-center justify-center">
              <img 
                src="/QRCode.svg"
                alt="Bank QRcode" 
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Bank:</span>
              <span className="font-medium">Cake</span>
            </div>
            <div className="flex justify-between">
              <span>Account:</span>
              <span className="font-medium">0333649559</span>
            </div>
            <div className="flex justify-between">
              <span>Name:</span>
              <span className="font-medium">Nguyen Thieu Luan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}