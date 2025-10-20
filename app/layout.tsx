import { getTypes } from './lib/actions';
import type { Metadata } from "next";
import { cookies } from 'next/headers';
import { decrypt } from './lib/session';
import { RootContextProvider } from './RootContext';
import LayoutWrapper from './ui/LayoutWrapper';
import './css/scrollbars.css';
import './css/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Zen Stones',
    default: 'Zen Stones',
  },
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

  const productTypes = await getTypes();

  const providedValues = {
    session,
    productTypes
  }

  return (
    <html lang="en">  
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>    
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
