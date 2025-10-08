export const metadata = {
  title: "Bank & TheKeo 💩",
  description: "QR Code thanh toán và chia bill cùng bạn bè",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💸</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function QRCodeLayout({ children }) {
  return (
    <>
      {/* DNS prefetch and preconnect for external APIs */}
      <link rel="dns-prefetch" href="https://api.open-meteo.com" />
      <link rel="preconnect" href="https://api.open-meteo.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://go-transaction-api-wqzlk.sevalla.app" />
      <link rel="preconnect" href="https://go-transaction-api-wqzlk.sevalla.app" crossOrigin="anonymous" />

      {/* Preload critical QR code image */}
      <link rel="preload" href="/QRCode.svg" as="image" type="image/svg+xml" fetchPriority="high" />

      {children}
    </>
  );
}
