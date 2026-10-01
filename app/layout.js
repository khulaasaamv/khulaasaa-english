import "./globals.css";

export const metadata = {
  title: "Khulaasaa English",
  description: "Compact News. Complete Insight.",
  robots: { index: true, follow: true },
};

export default function EnglishLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}


