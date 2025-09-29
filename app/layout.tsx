import { getSubcategories } from './lib/actions';
import type { Metadata } from "next";
import { cookies } from 'next/headers';
import { decrypt } from './lib/session';
import { RootContextProvider } from './RootContext';
import LayoutWrapper from './ui/LayoutWrapper';
import './css/scrollbars.css';
import './css/globals.css';
import { fetchFilteredProducts } from './lib/data';

export const metadata: Metadata = {
  title: "Zen Stones",
  description: `
    Your local place to buy metaphysical jewelry and accessories, save more by browsing in Zen Stones.
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

  const providedValues = {
    session,
    subcategories
  }

  return (
    <html lang="en">      
      <body
        className={`antialiased overflow-x-hidden overflow-y-auto`}
      >
        <RootContextProvider value={providedValues}>
          {/* Client component to manage search focus state */}
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </RootContextProvider>
      </body>
    </html>
  );
}
