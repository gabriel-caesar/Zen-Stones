import type { Metadata } from "next";
import { cookies } from 'next/headers';
import { decrypt } from './lib/session';
import Footer from './ui/footer/Footer';
import Navbar from './ui/navbar/Navbar';
import './css/globals.css';

export const metadata: Metadata = {
  title: "Zen Stones",
  description: `
    Your local place to buy ${<strong>metaphysical jewelry and accessories</strong>}, save more by browsing in Zen Stones.
  `,
};

const getAdminFlag = async () => {
  // getting the cookie and decrypting it
  const cookie = (await cookies()).get('session')?.value; // cookie is a cryptic long key
  const session = await decrypt(cookie); // decrypt the long cookie key into actual data
  return session?.isAdmin;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const isAdmin = await getAdminFlag();

  return (
    <html lang="en">      
      <body
        className={`antialiased overflow-x-hidden overflow-y-auto`}
      >
        <Navbar isAdmin={isAdmin} />
        {/* padding === navbar.height to make content under navbar be pushed downwards */}
        <main className='pt-[112px]'>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
