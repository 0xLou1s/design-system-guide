import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import "./global.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: { default: "Handbook", template: "%s | Handbook" },
  description: "Notes on building and shipping interfaces, collected as one handbook.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`overscroll-y-none ${geist.variable} ${geistMono.variable} font-sans`} suppressHydrationWarning>
      <body>
        <RootProvider search={{ options: { type: "static" } }} theme={{ enableSystem: true, defaultTheme: "system" }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
