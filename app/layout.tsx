"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import ConfigureAmplifyClientSide from "@/ConfigureAmplifyClientSide";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchUsername } = useUserStore();

  useEffect(() => {
    fetchUsername();
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigureAmplifyClientSide />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
