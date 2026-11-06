import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SportsAppProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "Caritas Sports Association (CSA) · Digital Headquarters",
  description: "Official digital headquarters of Caritas Sports Association. Follow the 2026 Caritas Football League, basketball, volleyball, badminton, athletics, fixtures, live scores, and transfers.",
  applicationName: "Caritas Sports",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/icon.png" }
    ],
    apple: [
      { url: "/logo.png" }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Caritas Sports"
  }
};

export const viewport: Viewport = {
  themeColor: "#11130F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SportsAppProvider>{children}</SportsAppProvider>
      </body>
    </html>
  );
}
