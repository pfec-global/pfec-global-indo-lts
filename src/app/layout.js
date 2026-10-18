import {
  Titan_One,
  Bebas_Neue,
  Plus_Jakarta_Sans,
  Poppins,
  Montserrat,
} from "next/font/google";

import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

// Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Titan One
const titanOne = Titan_One({
  variable: "--font-titan-one",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Bebas Neue
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Poppins
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Montserrat
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "PFEC Global | Study Abroad with Complete Expert Guidance",
  description:
    "Study abroad with free 1-on-1 expert mentorship from shortlisting to visa. Trusted by 22,000+ students across 11 destinations.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`
        ${titanOne.variable}
        ${bebasNeue.variable}
        ${plusJakartaSans.variable}
        ${poppins.variable}
        ${montserrat.variable}
        h-full antialiased
      `}
    >
      <body
        className="flex min-h-full flex-col"
        suppressHydrationWarning
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}