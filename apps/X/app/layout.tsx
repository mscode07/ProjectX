import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "./provider";
import { RouteGard } from "@/components/RouteGuard";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "ProjectX",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Provider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} m-0 bg-black`}
        >
          <RouteGard>{children}</RouteGard>
        </body>
      </Provider>
    </html>
  );
}
