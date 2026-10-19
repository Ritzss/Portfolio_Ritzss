import type { Metadata } from "next";
import "./globals.css";
import NetworkStatus from "@/components/errors/NetworkStatus";
import PortfolioCursor from "@/components/ui/PortfolioCursor";
import SiteBackground from "@/components/ui/SiteBackground";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PrivacyConsent from "@/components/feedback/PrivacyConsent";
import AFKCharacter from "@/components/AKF/AFKCharacter";
import { PortfolioRadioProvider } from "@/components/music/PortfolioRadio";

const siteUrl = "https://portfolioritzss.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ritanshu Babuta",
  description:
    "Ritanshu Babuta is an Associate Full Stack Developer building production-ready web applications using React, Next.js, Node.js, and MongoDB.",
  applicationName: "Ritanshu Babuta",

  openGraph: {
    title: "Ritanshu Babuta",
    description:
      "Associate Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB.",
    url: siteUrl,
    siteName: "Ritanshu Babuta",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Ritanshu Babuta",
    description:
      "Associate Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB.",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ritanshu Babuta",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ritanshu Babuta",
  alternateName: "Ritanshu's Portfolio",
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body cz-shortcut-listen="true">
        <PortfolioRadioProvider>
          <SiteBackground />
          <PortfolioCursor />
          <NetworkStatus />
          <AFKCharacter timeout={60000} />
          {children}
          <SpeedInsights />
          <Analytics />
          <PrivacyConsent />
        </PortfolioRadioProvider>
      </body>
    </html>
  );
}