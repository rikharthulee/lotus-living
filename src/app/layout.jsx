import "../styles/globals.css";

import { Playfair_Display, Open_Sans } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600"] });

export const metadata = {
  title: "Lotus Living",
  description: "Your Home in Laos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.className} ${openSans.className}`}>
      <body>
        <header className="bg-softgreen text-white p-4 font-heading text-xl">
          Lotus Living
        </header>
        <main>{children}</main>
        <footer className="bg-softgreen text-white p-4 text-center font-body">
          © {new Date().getFullYear()} Lotus Living
        </footer>
      </body>
    </html>
  );
}
