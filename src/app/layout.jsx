import '../styles/globals.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
