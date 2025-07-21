import type { Metadata } from "next";
import { Orbitron, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";

// Use Orbitron (or swap with Press_Start_2P if you want pixel font)
const orbitron = Orbitron({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vinay's Glitched Reality",
  description: "Cyber visuals & shredded pixels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.className}`}>
      <body className="bg-black text-white ]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
