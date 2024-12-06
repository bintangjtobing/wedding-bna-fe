import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto, Poppins } from 'next/font/google';
import "./globals.css";

// Importing local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Importing Google Font (Roboto)
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

// Importing Poppins font with all weights
const poppins = Poppins({
  weight: ["300","400", "500" ,"600" ,"700", "900"],  // Requesting all weights
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
