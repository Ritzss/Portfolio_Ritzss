import type { Metadata } from "next";
import "./globals.css";
import NetworkStatus from "@/components/errors/NetworkStatus";
import PortfolioCursor from "@/components/ui/PortfolioCursor";
import SiteBackground from "@/components/ui/SiteBackground";
import { Analytics } from "@vercel/analytics/next";
import PrivacyConsent from "@/components/feedback/PrivacyConsent";
import AFKCharacter from "@/components/AKF/AFKCharacter";

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
        <AFKCharacter timeout={5000} />
        {children}
        <Analytics />
        <PrivacyConsent />
      </body>
    </html>
  );
}
