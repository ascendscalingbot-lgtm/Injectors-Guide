import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Injectors Guide Command Center",
  description:
    "COS-IG Next.js chief-of-staff dashboard for Injectors Guide growth operations.",
  openGraph: {
    title: "Injectors Guide Command Center",
    description:
      "A shadcn-styled operating dashboard for attribution, content, approvals, blockers, and admin growth controls.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
