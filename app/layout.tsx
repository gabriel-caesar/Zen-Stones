import { getSubcategories } from './lib/actions';
import type { Metadata } from "next";
import { cookies } from 'next/headers';
import { decrypt } from './lib/session';
import Footer from './ui/footer/Footer';
import Navbar from './ui/navbar/Navbar';
import './css/globals.css';
import './css/scrollbars.css';

export const metadata: Metadata = {
  title: "Zen Stones",
  description: `
    Your local place to buy ${<strong>metaphysical jewelry and accessories</strong>}, save more by browsing in Zen Stones.
  `,
};

const getSession = async () => {
  // getting the cookie and decrypting it
  const cookie = (await cookies()).get('session')?.value; // cookie is a cryptic long key
  const session = await decrypt(cookie); // decrypt the long cookie key into actual data
  return session;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession();

  const subcategories = await getSubcategories();

  return (
    <html lang="en">      
      <body
        className={`antialiased overflow-x-hidden overflow-y-auto`}
      >
        <Navbar session={session} subcategories={subcategories} />
        {/* padding === navbar.height to make content under navbar be pushed downwards */}
        <main className='pt-[112px]'>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
