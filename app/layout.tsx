import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import ConfigureAmplifyClientSide from "@/ConfigureAmplifyClientSide";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Auth Using Cognito",
  description: "Learning to Set up using Cognito and Amplify ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
