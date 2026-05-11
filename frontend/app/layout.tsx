import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AasPaas - Your Digital Shopfront",
  description: "AasPaas is a powerful SaaS platform that empowers merchants to create and manage their own digital shops with ease. With AasPaas, you can quickly set up your online storefront, customize it to match your brand, and start selling your products or services in no time. Our user-friendly interface and robust features make it simple for anyone to launch their digital shop and reach customers worldwide.",
};

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}