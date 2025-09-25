import type { Metadata } from "next";
import Footer from './ui/footer/Footer';
import Navbar from './ui/navbar/Navbar';
import './css/globals.css';

export const metadata: Metadata = {
  title: "Zen Stones",
  description: `
    Your local place to buy ${<strong>metaphysical jewelry and accessories</strong>}, save more by browsing in Zen Stones.
  `,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">      
      <body
        className={`antialiased overflow-x-hidden overflow-y-auto`}
      >
        <Navbar />
        {/* padding === navbar.height to make content under navbar be pushed downwards */}
        <main className='pt-[112px]'>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
