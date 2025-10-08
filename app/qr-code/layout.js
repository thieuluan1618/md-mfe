export const metadata = {
  title: "Bank & TheKeo",
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
  return children;
}
