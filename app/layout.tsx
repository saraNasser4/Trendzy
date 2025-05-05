import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import ClientProvider from "./components/ClientProvider";
import getUser from "./lib/getUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trenzy",
  description: "Grab all you need!",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const userProfile = await getUser()
  console.log(userProfile,'hi')
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}>
        <ClientProvider>
          <NavBar />
          {children}
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
