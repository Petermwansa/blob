
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={poppins.className}>
        <header>
        <Navigation />
        </header>

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
