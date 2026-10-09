
import {
  Titan_One,
  Bebas_Neue,
  Poppins,
  Montserrat,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Neue Reman GT local font
const neueReman = localFont({
  src: "../../public/fonts/NeueRemanGT-Heavy.otf",
  variable: "--font-neue-reman",
  weight: "400 900",
  style: "normal",
  display: "swap",
});

// Existing fonts
const titanOne = Titan_One({
  variable: "--font-titan-one",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

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
      className={`${neueReman.variable} ${titanOne.variable} ${bebasNeue.variable} ${poppins.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-full flex-col"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
