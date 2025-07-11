import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Script from "next/script";

// Reduce Geist font usage
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "400 700", // Reduced weight range
  display: 'swap',
  preload: true,
});

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const poppins = Poppins({
  weight: ["400", "600"], // Hanya weight yang benar-benar digunakan
  subsets: ["latin"],
  display: 'swap', // Better font loading experience
  preload: true,
  fallback: ['system-ui', 'arial'], // Fallback fonts
});

export const metadata: Metadata = {
  title: "Wedding Bintang & Ayu - Invitation",
  description:
    "The wedding invitation of Bintang and Ayu. Join us in celebrating their love story and witness their romantic journey towards a lifetime of happiness together.",
  keywords:
    "Pernikahan, Bintang Tobing, Ayu Stevani Sinaga, Intimate Wedding, Kisah Cinta, Dokumenter Pernikahan, Gallery Pernikahan",
  openGraph: {
    title: "The wedding invitation of Bintang & Ayu; Before D-Day",
    description:
      "The wedding invitation of Bintang and Ayu. Join us in celebrating their love story and witness their romantic journey towards a lifetime of happiness together.",
    images: [
      "https://res.cloudinary.com/dilb4d364/image/upload/q_auto/f_auto/v1749703630/bintang-ayu-invitationcard_nmpn5s.jpg",
    ],
    url: "https://wedding-bintang-ayu.bintangtobing.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The wedding invitation of Bintang & Ayu; Before D-Day",
    description:
      "The wedding invitation of Bintang and Ayu. Join us in celebrating their love story and witness their romantic journey towards a lifetime of happiness together.",
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

        {/* Preload critical Cloudinary images */}
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dilb4d364/image/upload/w_400,h_400,c_fill,q_auto,f_auto/v1749703630/bintang-ayu-invitationcard_nmpn5s.jpg"
        />

        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//clarity.ms" />
      </head>
      <body
        className={`${geistSans.variable} ${poppins.className} antialiased`}
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
