"use client";

import AuthProvider from "@/providers/AuthProvider";
import {
  Source_Serif_4,
  Merriweather,
  Crimson_Text,
  EB_Garamond,
  Libre_Baskerville,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import TranstackProvider from "@/providers/TranstackProvider";

// Configure Source Serif 4 font
const sourceSerif = Source_Serif_4({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className="dark">
      <body className={`${sourceSerif.className} min-h-[100svh]`}>
        <TranstackProvider>
          <AuthProvider>{children}</AuthProvider>
        </TranstackProvider>
      </body>
    </html>
  );
}
