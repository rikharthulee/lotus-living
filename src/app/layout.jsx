import '../styles/globals.css';

import { Playfair_Display, Open_Sans } from 'next/font/google';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '600'] });

export const metadata = {
  title: 'Lotus Living',
  description: 'Your Home in Laos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.className} ${openSans.className}`}>
      <body className="bg-beige text-darkgreen font-body">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
