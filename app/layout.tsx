import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Script from "next/script";

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

// Importing Poppins font with all weights
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "900"], // Requesting all weights
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wedding Bintang & Ayu - Invitation",
  description:
    "Ikuti perjalanan cinta Bintang dan Ayu menuju pernikahan mereka yang penuh kehangatan dan cinta. Saksikan cerita romantis dan inspiratif melalui kisah mereka.",
  keywords:
    "Pernikahan, Bintang Tobing, Ayu Stevani Sinaga, Intimate Wedding, Kisah Cinta, Dokumenter Pernikahan, Gallery Pernikahan",
  openGraph: {
    title: "Bintang & Ayu: Sebelum Hari H",
    description:
      "Ikuti perjalanan cinta Bintang dan Ayu menuju pernikahan mereka yang penuh kehangatan dan cinta. Saksikan cerita romantis dan inspiratif melalui kisah mereka.",
    images: [
      "https://res.cloudinary.com/dilb4d364/image/upload/q_auto/f_auto/v1749703630/bintang-ayu-invitationcard_nmpn5s.jpg",
    ],
    url: "https://wedding-bintang-ayu.bintangtobing.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bintang & Ayu: Sebelum Hari H",
    description:
      "Ikuti perjalanan cinta Bintang dan Ayu menuju pernikahan mereka yang penuh kehangatan dan cinta. Saksikan cerita romantis dan inspiratif melalui kisah mereka.",
    images: [
      "https://res.cloudinary.com/dilb4d364/image/upload/q_auto/f_auto/v1749703630/bintang-ayu-invitationcard_nmpn5s.jpg",
    ],
  },
  icons: {
    icon: "https://res.cloudinary.com/dflafxsqp/image/upload/v1733939537/3_ipgnt3.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon-32x32.png" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?png"
          type="image/png"
          sizes="any"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased`}
      >
        <LanguageProvider>
          <UserProvider>{children}</UserProvider>
        </LanguageProvider>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q96ECZ1J95"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q96ECZ1J95');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ry6jfvgn0n");
          `}
        </Script>
      </body>
    </html>
  );
}
