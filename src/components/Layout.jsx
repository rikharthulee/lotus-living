import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/app/globals.css"; // or wherever your styles live

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
