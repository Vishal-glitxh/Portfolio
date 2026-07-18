import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vishal Suhas | AI Engineer & Full-Stack Developer",
  description: "Personal portfolio of Vishal Suhas, a future AI & ML Engineer, Full-Stack Developer, and Cybersecurity enthusiast specialized in building intelligent, real-world software solutions.",
  keywords: [
    "Vishal Suhas",
    "AI Engineer Portfolio",
    "Machine Learning Student",
    "Full-Stack Developer",
    "Python Developer Bangalore",
    "Cybersecurity Student",
    "Data Analytics Portfolio"
  ],
  authors: [{ name: "Vishal Suhas" }],
  openGraph: {
    title: "Vishal Suhas | AI Engineer & Full-Stack Developer",
    description: "AI & ML Engineering student building intelligent software solutions, data analytics dashboards, and secure web applications.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0B1120] text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
