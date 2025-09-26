import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './app/lib/session';

// defining route permissions
const protectedRoutes = ['/admin-space', '/admin-space/manage-subcategories', '/admin-space/manage-products'];
const publicRoutes = ['/login'];

export default async function middleware(req: NextRequest) {

  // figuring out if the current url is included in one of the two route arrays
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // getting the cookie and decrypting it
  const cookie = (await cookies()).get('session')?.value; // cookie is a cryptic long key
  const session = await decrypt(cookie); // decrypt the long cookie key into actual data

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  
  return NextResponse.next();
}