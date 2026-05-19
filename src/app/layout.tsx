import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "VVS-sidor — hemsidor för lokala VVS-firmor",
    template: "%s",
  },
  description:
    "En plattform som ger små VVS-firmor en proper hemsida på ett par minuter. Egen domän, eget innehåll, eget admin.",
  metadataBase: new URL("https://vvs-sidor.vercel.app"),
  openGraph: {
    type: "website",
    locale: "sv_SE",
  },
};

export const viewport = {
  themeColor: "#0a4f8f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv" className={`h-full ${inter.variable}`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
