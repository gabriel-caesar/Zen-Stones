'use client';

import { logout } from '@/app/lib/actions';
import { Box, FileBadge, FileBox, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function CardOption({
  href,
  Icon,
  text,
  logOut,
}: {
  href?: string;
  Icon: string;
  text: string;
  logOut?: boolean;
}) {
  return !logOut ? (
    <Link
      href={href ? href : '#'}
      className='w-2/3 md:w-1/2 lg:w-3/4 lg:py-15 py-10 px-4 flex border-1 border-neutral-800 rounded-lg bg-neutral-200 shadow-lg hover:cursor-pointer hover:text-yellow-600 hover:bg-yellow-100 hover:shadow-yellow-100 active:bg-yellow-300 transition-all'
    >
      {Icon === 'box' ? (
        <Box className='mr-2' />
      ) : Icon === 'filebox' ? (
        <FileBox className='mr-2' />
      ) : (
        Icon === 'filebadge' && <FileBadge className='mr-2' />
      )}

      {text}
    </Link>
  ) : (
    <button
      id='logout-button'
      aria-label='logout-button'
      className='w-2/3 md:w-1/2 lg:w-3/4 lg:py-15 py-10 px-4 flex border-1 border-neutral-800 rounded-lg bg-neutral-200 shadow-lg hover:cursor-pointer hover:text-yellow-600 hover:bg-yellow-100 hover:shadow-yellow-100 active:bg-yellow-300 transition-all'
      onClick={() => logout()}
    >
      {Icon === 'logout' ? <LogOut className='mr-2' /> : ''}
      {text}
    </button>
  );
}
