import "../styles/globals.css";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { Playfair_Display, Inter } from "next/font/google";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-heading",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-body",
});

export const metadata = {
  title: "Lotus Living",
  description: "Your Home in Laos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} font-body flex flex-col min-h-screen`}
      >
        <NavBar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
