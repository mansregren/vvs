import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VVS-sidor",
  description: "Hemsidor för VVS-firmor.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
