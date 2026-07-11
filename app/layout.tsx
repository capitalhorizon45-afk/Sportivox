import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://goalpulse.vercel.app"
  ),
  title: {
    default: "GoalPulse — Live Sports Scores & News",
    template: "%s | GoalPulse",
  },
  description:
    "Your ultimate sports hub. Live scores, fixtures, standings, and breaking news for Football, Cricket, Basketball, and Tennis.",
  keywords: [
    "live scores",
    "sports news",
    "football scores",
    "cricket scores",
    "basketball scores",
    "tennis scores",
    "fixtures",
    "standings",
    "GoalPulse",
  ],
  authors: [{ name: "GoalPulse" }],
  creator: "GoalPulse",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://goalpulse.app",
    title: "GoalPulse — Live Sports Scores & News",
    description:
      "Your ultimate sports hub. Live scores, fixtures, standings, and breaking news.",
    siteName: "GoalPulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoalPulse — Live Sports Scores & News",
    description:
      "Your ultimate sports hub. Live scores, fixtures, standings, and breaking news.",
    creator: "@goalpulse",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-background text-white antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
