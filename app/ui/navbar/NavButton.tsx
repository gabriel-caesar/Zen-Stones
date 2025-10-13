import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';

export default function NavButton({
  children,
  className,
  onClick,
  isLink,
  href,
  openSidebarMenu,
  setOpenSidebarMenu,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLink?: boolean;
  href?: Url;
  openSidebarMenu?: boolean;
  setOpenSidebarMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
   isLink ? (
     <Link
      id={`${children}-nav-button`}
      aria-label={`${children}-nav-button`}
      className={`
        ${className}
        text-md hover:cursor-pointer transition-all border-transparent border-4 py-1 px-2  
      `}
      href={`${href}`}
      onClick={() => setOpenSidebarMenu?.(!openSidebarMenu)}
    >
      {children}
    </Link>
   ) : (
     <button
      id={`${children}-nav-button`}
      aria-label={`${children}-nav-button`}
      className={`
        ${className}
        text-md hover:cursor-pointer transition-all border-transparent border-4 py-1 px-2  
      `}
      onClick={onClick}
    >
      {children}
    </button>
   )
  );
}
