import type { Metadata } from "next";
import "./globals.css";
import NetworkStatus from "@/components/errors/NetworkStatus";
import PortfolioCursor from "@/components/ui/PortfolioCursor";
import SiteBackground from "@/components/ui/SiteBackground";

export const metadata: Metadata = {
  title: "Ritanshu Babuta",
  description: "Associate Full Stack Developer",
  applicationName: "Ritanshu Babuta",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ritanshu Babuta",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <SiteBackground />
        <PortfolioCursor />
        <NetworkStatus />
        {children}
      </body>
    </html>
  );
}
