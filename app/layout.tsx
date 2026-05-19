import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const heading = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"] 
});

const body = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"] 
});

export const metadata: Metadata = {
  title: "Tee Nailed It | Flawless Artistry for the Modern Muse",
  description: "Lagos' premier destination for precision acrylics, BIAB, and bespoke press-on designs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}