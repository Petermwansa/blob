import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <header>
        <nav>
          <Link className="nav-link" href='/'>Home</Link>
          <div>
            <Link className="nav-link" href='/register'>Register</Link>
            <Link className="nav-link" href='/dashboard'>Dashboard</Link>
          </div>
        </nav>
        </header>

        <main>{children}</main>

        <footer>Footer</footer>
      </body>
    </html>
  );
};
